"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";

export interface BandProject {
  title: string;
  href: string;
  /** Card texture source, 1280px wide (desktop). */
  image: string;
  /** The same screenshot at 768px, for phones and low-end devices (their card textures are 768px). */
  imageSmall?: string;
  /** Shown in the card's address bar. */
  url: string;
}

interface TwistBandProps {
  projects: BandProject[];
  cardCount?: number;
  radius?: number;
  tilt?: number;
  twist?: number;
  autoSpeed?: number;
  borderWidth?: number;
  /** Called once the band is drawn with its covers and fading in, so a static preview can step aside. */
  onReady?: () => void;
}

/**
 * The home hero, ported from the Agenciex Framer template's "Twist Band": a
 * WebGL ring of curved cards (one per project) that leans and waves as it
 * turns. It spins by itself, follows a drag and coasts back to its own pace;
 * hovering a front card pauses it and shows the project's name, and a click
 * (not a drag) opens the case study. The cards are drawn in a canvas, so the
 * same projects are also listed as real links for keyboard and screen readers.
 */
/*
 * Each card is a macOS browser window, matching `.mac-window` in globals.css:
 * a grey tab strip with the traffic lights and a tab, a white toolbar with the
 * address, then a 16:9 viewport. The screenshots are 16:9 (one is 16:10), so
 * they are fitted whole (contain), never cropped.
 */
const TEX_W = 1280;
const TAB_H = 52;
const TOOL_H = 52;
const CHROME_H = TAB_H + TOOL_H;
const VIEW_H = Math.round((TEX_W * 9) / 16);
const TEX_H = CHROME_H + VIEW_H;
const CARD_RADIUS = 26;
const UI_FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif';

const imageCache = new Map<string, HTMLImageElement>();
// The band picks up where it was when visitors come back to the page.
let savedRot: number | null = null;

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function ellipsize(ctx: CanvasRenderingContext2D, text: string, max: number) {
  if (ctx.measureText(text).width <= max) return text;
  let t = text;
  while (t.length > 1 && ctx.measureText(`${t}…`).width > max) t = t.slice(0, -1);
  return `${t.trimEnd()}…`;
}

/**
 * Draws one card into `target` (reused when the cover arrives, so no second canvas is allocated)
 * at `quality` × the design size: 1 on desktop, lower on phones to save GPU memory.
 */
function drawCover(
  img: HTMLImageElement | null,
  project: BandProject | null,
  fallback: string,
  border: { w: number; color: string },
  quality: number,
  target?: HTMLCanvasElement,
) {
  const c = target ?? document.createElement("canvas");
  c.width = Math.round(TEX_W * quality); // (re)setting the size also clears the canvas
  c.height = Math.round(TEX_H * quality);
  const ctx = c.getContext("2d")!;
  ctx.scale(quality, quality);
  roundRect(ctx, 0, 0, TEX_W, TEX_H, CARD_RADIUS);
  ctx.save();
  ctx.clip();

  // Tab strip: traffic lights, then the active tab (white, joined to the toolbar).
  ctx.fillStyle = "#DFE3EA";
  ctx.fillRect(0, 0, TEX_W, TAB_H);
  const lights = ["#FF5F57", "#FEBC2E", "#28C840"];
  lights.forEach((color, i) => {
    ctx.beginPath();
    ctx.arc(32 + i * 26, TAB_H / 2 + 2, 8.5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  });
  const tabX = 124;
  const tabW = 400;
  ctx.fillStyle = "#FFFFFF";
  roundRect(ctx, tabX, 10, tabW, TAB_H, 12);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(tabX + 26, 10 + (TAB_H - 10) / 2, 8, 0, Math.PI * 2);
  ctx.fillStyle = "#1B5FD1";
  ctx.fill();
  ctx.font = `500 19px ${UI_FONT}`;
  ctx.fillStyle = "#1F2937";
  ctx.textBaseline = "middle";
  ctx.fillText(ellipsize(ctx, project?.title ?? "", tabW - 66), tabX + 46, 10 + (TAB_H - 10) / 2 + 1);

  // Toolbar: back / forward / reload, then the address pill.
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, TAB_H, TEX_W, TOOL_H);
  ctx.strokeStyle = "#5F6368";
  ctx.lineWidth = 2.6;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const my = TAB_H + TOOL_H / 2;
  ctx.beginPath(); // back
  ctx.moveTo(40, my - 7); ctx.lineTo(33, my); ctx.lineTo(40, my + 7);
  ctx.moveTo(33, my); ctx.lineTo(48, my);
  ctx.moveTo(68, my - 7); ctx.lineTo(75, my); ctx.lineTo(68, my + 7); // forward
  ctx.moveTo(75, my); ctx.lineTo(60, my);
  ctx.stroke();
  ctx.beginPath(); // reload
  ctx.arc(102, my, 7.5, -Math.PI * 0.35, Math.PI * 1.45);
  ctx.stroke();
  const urlX = 132;
  const urlH = 34;
  ctx.fillStyle = "#F1F3F4";
  roundRect(ctx, urlX, my - urlH / 2, TEX_W - urlX - 24, urlH, urlH / 2);
  ctx.fill();
  // padlock
  ctx.fillStyle = "#5F6368";
  roundRect(ctx, urlX + 18, my - 2, 12, 9, 2);
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(urlX + 24, my - 2, 4, Math.PI, 0);
  ctx.stroke();
  ctx.font = `400 18px ${UI_FONT}`;
  ctx.fillStyle = "#3C4043";
  ctx.fillText(ellipsize(ctx, project?.url ?? "", TEX_W - urlX - 90), urlX + 42, my + 1);
  ctx.fillStyle = "#E3E6EB";
  ctx.fillRect(0, CHROME_H - 1, TEX_W, 1);

  // Viewport: the whole screenshot, fitted (contain) and centred.
  ctx.fillStyle = fallback;
  ctx.fillRect(0, CHROME_H, TEX_W, VIEW_H);
  if (img && img.naturalWidth) {
    const s = Math.min(TEX_W / img.naturalWidth, VIEW_H / img.naturalHeight);
    const w = img.naturalWidth * s;
    const h = img.naturalHeight * s;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, (TEX_W - w) / 2, CHROME_H + (VIEW_H - h) / 2, w, h);
  }
  ctx.restore();
  if (border.w > 0) {
    const b = border.w;
    roundRect(ctx, b / 2, b / 2, TEX_W - b, TEX_H - b, Math.max(0, CARD_RADIUS - b / 2));
    ctx.lineWidth = b;
    ctx.strokeStyle = border.color;
    ctx.stroke();
  }
  return c;
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const cached = imageCache.get(src);
    if (cached) return resolve(cached);
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export default function TwistBand({
  projects,
  cardCount = 10,
  radius = 4.2,
  tilt = 15,
  twist = 34,
  autoSpeed = 6,
  borderWidth = 1,
  onReady,
}: TwistBandProps) {
  const router = useRouter();
  const mountRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  // Latest projects, read inside the 3D loop without restarting the scene.
  const projectsRef = useRef(projects);
  useEffect(() => {
    projectsRef.current = projects;
  }, [projects]);
  const imageKey = projects.map((p) => p.image).join("|");
  const readyRef = useRef(onReady);
  useEffect(() => {
    readyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let raf = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const border = { w: Math.max(0, borderWidth) * (TEX_W / 340), color: "#D3D9E2" };
    const placeholder = "#E8EDF5";

    /*
     * Device profile. Phones and low-end machines get a lower pixel-ratio cap,
     * smaller card textures and fewer bend segments; the band looks the same,
     * it just costs less fill rate and GPU memory.
     */
    const nav = navigator as Navigator & { deviceMemory?: number };
    const mobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 810;
    const lowEnd = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
    // Same cap as R3F's dpr={[1, 1.5]}: past 1.5 the band looks the same but costs up to 78% more pixels.
    const maxDpr = 1.5;
    let dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const quality = mobile || lowEnd ? 0.6 : 1; // card texture: 1280×824 on desktop, 768×494 on phones
    const SEG = mobile ? 16 : 24;

    const renderer = new THREE.WebGLRenderer({
      // MSAA is wasted work on high-density screens (the pixels are already tiny) and costly on phones.
      antialias: dpr < 1.5,
      alpha: true,
      stencil: false,
      powerPreference: mobile ? "default" : "high-performance",
    });
    renderer.setPixelRatio(dpr);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // Unlit MeshBasicMaterial and a CSS floor shadow: no lights, so no shadow maps at all.
    renderer.shadowMap.enabled = false;
    // Every card is opaque (corners cut by alphaTest), so draw order does not matter: skip the per-frame sort.
    renderer.sortObjects = false;
    const anisotropy = Math.min(mobile ? 2 : 4, renderer.capabilities.getMaxAnisotropy());
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.opacity = "0";
    canvas.style.transition = "opacity 0.45s ease";
    canvas.setAttribute("aria-hidden", "true");
    mount.appendChild(canvas);

    let revealed = false;
    let pendingCovers = 0;
    let lastResize = performance.now();
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      canvas.style.opacity = "1";
      readyRef.current?.();
    };
    // The static preview covers the band while the covers load, so there is no hurry: reveal early only as a
    // last resort (a very slow connection), and then with whatever covers have arrived.
    const revealTimer = window.setTimeout(reveal, 8000);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    const ring = new THREE.Group();
    scene.add(ring);

    const list = projectsRef.current;
    const N = Math.max(6, Math.round(cardCount));
    const cardProject = (i: number) => (list.length ? list[i % list.length] : null);
    const covers = Array.from({ length: N }, (_, i) => {
      const p = cardProject(i);
      return (quality < 1 ? p?.imageSmall : undefined) ?? p?.image ?? "";
    });
    const step = (Math.PI * 2) / N;
    const span = step * 0.965; // cards almost touching
    // Landscape cards: the arc each card covers, at the browser window's proportions.
    const cardH = radius * span * (TEX_H / TEX_W);

    const textures: THREE.CanvasTexture[] = [];
    const materials: THREE.Material[] = [];
    const geoms: THREE.BufferGeometry[] = [];
    const cards: { mesh: THREE.Mesh; base: number; uv0: Float32Array }[] = [];
    // Set whenever something visible changed; frames with nothing to show are skipped.
    let dirty = true;

    /*
     * One double-sided mesh per card (10 draw calls, was 20: a front mesh plus a
     * mirrored back mesh). Seen from inside the ring the back face would read
     * mirrored, so the fragment shader flips u on back faces instead. All cards
     * share one compiled program (same cache key).
     */
    const flipBackFaces = (shader: { fragmentShader: string }) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <map_fragment>",
        `#ifdef USE_MAP
          vec2 cardUv = gl_FrontFacing ? vMapUv : vec2(1.0 - vMapUv.x, vMapUv.y);
          diffuseColor *= texture2D(map, cardUv);
        #endif`,
      );
    };
    // Fixed bounds that contain a card wherever it is on the ring: no per-frame computeBoundingSphere.
    const bounds = new THREE.Sphere(new THREE.Vector3(), radius + cardH);

    for (let i = 0; i < N; i++) {
      const g = new THREE.PlaneGeometry(1, 1, SEG, 1);
      g.boundingSphere = bounds.clone();
      (g.attributes.position as THREE.BufferAttribute).setUsage(THREE.DynamicDrawUsage);
      geoms.push(g);
      const src = covers[i];
      const cached = src ? imageCache.get(src) : undefined;
      /*
       * The canvas stays hidden (behind the static preview) until every cover has
       * arrived, so a full placeholder card would be drawn and uploaded for nothing.
       * Until its photo loads a card gets a 2×2 stand-in; the full card (browser
       * chrome + screenshot) is drawn once, when the photo is there, in its own task.
       */
      const makeTexture = (canvas: HTMLCanvasElement) => {
        const t = new THREE.CanvasTexture(canvas);
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = anisotropy;
        return t;
      };
      const standIn = () => {
        const c = document.createElement("canvas");
        c.width = c.height = 2;
        const ctx = c.getContext("2d")!;
        ctx.fillStyle = placeholder;
        ctx.fillRect(0, 0, 2, 2);
        return c;
      };
      const tex = makeTexture(cached || !src ? drawCover(cached ?? null, cardProject(i), placeholder, border, quality) : standIn());
      textures.push(tex);
      const material = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide, alphaTest: 0.5 });
      if (src && !cached) {
        pendingCovers++;
        loadImage(src).then((img) => {
          pendingCovers--;
          if (disposed) return;
          // A new texture, not a resize of the 2×2 one (WebGL texture storage is fixed once allocated).
          const full = makeTexture(drawCover(img, cardProject(i), placeholder, border, quality));
          const old = material.map;
          material.map = full;
          textures[textures.indexOf(old as THREE.CanvasTexture)] = full;
          old?.dispose();
          dirty = true;
        });
      }
      material.onBeforeCompile = flipBackFaces;
      material.customProgramCacheKey = () => "twist-band-card";
      materials.push(material);
      const mesh = new THREE.Mesh(g, material);
      mesh.userData.card = i;
      mesh.frustumCulled = false;
      ring.add(mesh);
      // Each vertex's original (u, v), kept once: positions are rewritten every frame.
      const p0 = g.attributes.position as THREE.BufferAttribute;
      const uv0 = new Float32Array(p0.count * 2);
      for (let j = 0; j < p0.count; j++) {
        uv0[j * 2] = p0.getX(j) + 0.5;
        uv0[j * 2 + 1] = p0.getY(j);
      }
      cards.push({ mesh, base: i * step, uv0 });
    }
    // The auto-fit only needs the outline: every 4th column of the top and bottom rows (+ the last).
    const fitSamples: number[] = [];
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col <= SEG; col++) if (col % 4 === 0 || col === SEG) fitSamples.push(row * (SEG + 1) + col);
    }

    // Bend every card around the ring and give the band a smooth ribbon twist and wave.
    const tw = (twist * Math.PI) / 180;
    const layout = (rot: number) => {
      for (const { mesh, base, uv0 } of cards) {
        const pos = (mesh.geometry as THREE.BufferGeometry).attributes.position as THREE.BufferAttribute;
        for (let j = 0; j < pos.count; j++) {
          const u = uv0[j * 2];
          const v = uv0[j * 2 + 1];
          const phi = base + rot + (u - 0.5) * span;
          const sx = Math.sin(phi);
          const cz = Math.cos(phi);
          const alpha = tw * sx * sx;
          const wave = radius * 0.09 * Math.sin(2 * phi + 0.6);
          const h = v * cardH;
          pos.setXYZ(j, radius * sx + h * Math.sin(alpha) * sx, wave + h * Math.cos(alpha), radius * cz + h * Math.sin(alpha) * cz);
        }
        pos.needsUpdate = true;
      }
    };

    const resize = () => {
      lastResize = performance.now();
      dirty = true;
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const dist = radius * 3;
      const halfW = radius / 0.6;
      const halfH = Math.max(halfW / camera.aspect, radius * 1.05);
      camera.fov = (2 * Math.atan(halfH / dist) * 180) / Math.PI;
      camera.position.set(0, 0, dist);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const baseTilt = (tilt * Math.PI) / 180;
    const idleSpeed = reduced ? 0 : (autoSpeed / 100) * 0.06;
    let rot = savedRot ?? 0;
    let vel = -idleSpeed;
    let idle = -idleSpeed; // starts right → left, then follows the last drag
    let dragDx = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let tiltOffset = 0;
    let hoverIdx = -1;
    let pointerIn = false;
    let px = 0;
    let py = 0;
    let downX = 0;
    let downY = 0;
    let moved = 0;
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const projectFor = (i: number) => {
      const all = projectsRef.current;
      return all.length ? all[i % all.length] : null;
    };
    const pickCard = () => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return -1;
      ndc.set(((px - r.left) / r.width) * 2 - 1, -((py - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObjects(ring.children, false)[0];
      if (!hit) return -1;
      const i = hit.object.userData.card as number;
      // Only the three cards facing the viewer are linked.
      const front = cards
        .map((c, k) => ({ k, z: Math.cos(c.base + rot) }))
        .sort((p, q) => q.z - p.z)
        .slice(0, 3)
        .map((p) => p.k);
      return front.includes(i) ? i : -1;
    };
    const showPill = (i: number) => {
      const pill = pillRef.current;
      if (!pill) return;
      const p = i >= 0 ? projectFor(i) : null;
      if (!p) {
        pill.style.opacity = "0";
        return;
      }
      if (pill.textContent !== p.title) pill.textContent = p.title;
      const r = mount.getBoundingClientRect();
      const pw = pill.offsetWidth;
      const ph = pill.offsetHeight;
      const mx = px - r.left;
      const my = py - r.top;
      const pad = 12;
      let x = mx + 22;
      if (x + pw > r.width - pad) x = mx - pw - 22;
      let y = my + 22;
      if (y + ph > r.height - pad) y = my - ph - 22;
      x = Math.min(Math.max(pad, x), Math.max(pad, r.width - pw - pad));
      y = Math.min(Math.max(pad, y), Math.max(pad, r.height - ph - pad));
      pill.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      pill.style.opacity = "1";
    };
    const updateHover = () => {
      const i = pointerIn && !dragging ? pickCard() : -1;
      hoverIdx = i >= 0 && projectFor(i) ? i : -1;
      showPill(hoverIdx);
      canvas.style.cursor = dragging ? "grabbing" : hoverIdx >= 0 ? "pointer" : "grab";
    };

    // Keep the ring centred and sized to ~82% of the width (never more than ~86% of the height).
    const tmp = new THREE.Vector3();
    let fitW = 0;
    let fitH = 0;
    const recenter = (snap: boolean) => {
      ring.updateMatrixWorld(true);
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const { mesh } of cards) {
        const pos = (mesh.geometry as THREE.BufferGeometry).attributes.position as THREE.BufferAttribute;
        for (const j of fitSamples) {
          tmp.fromBufferAttribute(pos, j).applyMatrix4(mesh.matrixWorld).project(camera);
          if (tmp.x < minX) minX = tmp.x;
          if (tmp.x > maxX) maxX = tmp.x;
          if (tmp.y < minY) minY = tmp.y;
          if (tmp.y > maxY) maxY = tmp.y;
        }
      }
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const k = snap ? 1 : 0.08;
      ring.position.x -= cx * halfH * camera.aspect * k;
      ring.position.y -= cy * halfH * k;
      const w = (maxX - minX) / 2;
      const h = (maxY - minY) / 2;
      if (w > 0 && h > 0) {
        fitW = Math.max(w, fitW * 0.995);
        fitH = Math.max(h, fitH * 0.995);
        const width = mount.clientWidth || 1;
        const targetW = Math.min(0.82, 1 - (2 * 40) / width);
        const scale = Math.min(targetW / fitW, 0.86 / fitH);
        const s2 = 1 + (scale - 1) * (snap ? 1 : 0.08);
        const tanHalf = Math.tan((camera.fov * Math.PI) / 360) / s2;
        camera.fov = Math.min(100, Math.max(5, (2 * Math.atan(tanHalf) * 180) / Math.PI));
        camera.updateProjectionMatrix();
      }
    };
    const apply = (t: number, snap = false) => {
      const sway = reduced ? 0 : 1;
      ring.rotation.x = baseTilt + tiltOffset + Math.sin(t * 0.0004) * 0.03 * sway;
      ring.rotation.z = Math.sin(t * 0.0003) * 0.03 * sway;
      layout(rot);
      recenter(snap);
      renderer.render(scene, camera);
    };

    canvas.style.cursor = "grab";
    canvas.style.touchAction = "pan-y";
    const down = (e: PointerEvent) => {
      dragging = true;
      dragDx = 0;
      downX = lastX = e.clientX;
      downY = lastY = e.clientY;
      moved = 0;
      showPill(-1);
      canvas.style.cursor = "grabbing";
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      pointerIn = true;
      if (!dragging) return;
      moved = Math.max(moved, Math.abs(e.clientX - downX) + Math.abs(e.clientY - downY));
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      vel = dx * 0.006;
      rot += vel;
      dragDx += dx;
      tiltOffset = Math.max(-0.25, Math.min(0.25, tiltOffset + dy * 0.0015));
    };
    const up = (e: PointerEvent) => {
      if (dragging && Math.abs(dragDx) > 8 && idleSpeed) idle = Math.sign(dragDx) * idleSpeed;
      const wasDrag = moved > 6;
      dragging = false;
      canvas.style.cursor = "grab";
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
      if (!wasDrag && e.type === "pointerup") {
        px = e.clientX;
        py = e.clientY;
        const p = projectFor(pickCard());
        if (p) router.push(p.href);
      }
    };
    const leave = () => {
      pointerIn = false;
      if (!dragging) updateHover();
    };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    canvas.addEventListener("pointerleave", leave);

    // Paused while off screen, while the tab is hidden, and while the GPU context is lost.
    let visible = true;
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      dirty = true;
    });
    io.observe(mount);
    let pageHidden = document.hidden;
    const onVisibility = () => {
      pageHidden = document.hidden;
      dirty = true;
    };
    document.addEventListener("visibilitychange", onVisibility);
    let contextLost = false;
    const onContextLost = (e: Event) => {
      e.preventDefault(); // lets the browser restore it
      contextLost = true;
    };
    const onContextRestored = () => {
      contextLost = false;
      textures.forEach((t) => (t.needsUpdate = true));
      dirty = true;
    };
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    // Adaptive resolution: if frames stay slow (< ~40 fps for ~1.5s), lower the pixel ratio a step, down to 1.
    let lastT = 0;
    let frameAvg = 16.7;
    let slowFrames = 0;
    const adapt = (t: number) => {
      const dt = lastT ? t - lastT : 16.7;
      lastT = t;
      if (dt > 250) return; // a stall from a hidden tab or navigation, not render cost
      frameAvg += (dt - frameAvg) * 0.05;
      slowFrames = frameAvg > 25 ? slowFrames + 1 : 0;
      if (slowFrames > 90 && dpr > 1) {
        dpr = Math.max(1, dpr - 0.25);
        renderer.setPixelRatio(dpr);
        resize();
        slowFrames = 0;
        frameAvg = 16.7;
      }
    };

    const loop = (t: number) => {
      if (disposed) return;
      raf = requestAnimationFrame(loop);
      // Also nothing to draw while the canvas is still hidden waiting for its covers (the preview shows instead).
      if (!visible || pageHidden || contextLost || (!revealed && pendingCovers > 0)) {
        lastT = 0;
        return;
      }
      if (!dragging) {
        updateHover();
        // Momentum eases back to the idle spin, or to a stop while a card is hovered.
        vel += ((hoverIdx >= 0 ? 0 : idle) - vel) * (hoverIdx >= 0 ? 0.12 : 0.03);
        rot += vel;
        tiltOffset *= 0.96;
      }
      // Render on demand: with the spin and sway stopped (reduced motion, or a card held under the
      // pointer) and nothing else changing, the last frame is still correct, so skip the GPU work.
      const moving = dragging || Math.abs(vel) > 1e-5 || Math.abs(tiltOffset) > 1e-4 || !reduced;
      if (moving || dirty) {
        apply(t);
        dirty = false;
        adapt(t);
      }
      if (!revealed && pendingCovers <= 0 && performance.now() - lastResize > 150) reveal();
    };
    for (let i = 0; i < 6; i++) apply(0, true);
    raf = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      savedRot = rot;
      window.clearTimeout(revealTimer);
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      canvas.removeEventListener("pointerleave", leave);
      ring.clear();
      geoms.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => {
        // free the 2D canvases' pixel memory now rather than waiting for GC
        const c = t.image as HTMLCanvasElement | undefined;
        t.dispose();
        if (c) c.width = c.height = 0;
      });
      renderer.renderLists.dispose();
      renderer.dispose();
      // Release the WebGL context immediately: browsers cap live contexts (~16), and client-side
      // navigation back to the home page would otherwise stack them up until GC.
      renderer.forceContextLoss();
      if (canvas.parentNode === mount) mount.removeChild(canvas);
    };
    // imageKey stands in for `projects`: the scene only rebuilds when the covers change.
  }, [imageKey, cardCount, radius, tilt, twist, autoSpeed, borderWidth, router]);

  // The frame around it (`.agx-twist`: size, dot grid, floor shadow, static preview) is drawn by
  // TwistBandLazy, which loads this module only when the 3D is wanted.
  return (
    <>
      <div ref={mountRef} className="agx-twist-mount" />
      <div ref={pillRef} className="agx-twist-pill" aria-hidden="true" />
    </>
  );
}
