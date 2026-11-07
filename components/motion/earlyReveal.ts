/*
 * Plain module (not "use client") so the server layout can inline the string.
 * See components/motion/Reveal.tsx for the reveals it serves.
 */
/**
 * Runs inline at the end of <body>, once, on a full page load. Every reveal is
 * server-rendered in its hidden state and waits for hydration to enter, so on
 * a slow phone the first heading or intro on screen stayed invisible for
 * seconds (it was the page's LCP element). This plays the same entrance on the
 * reveals already on screen without waiting for JavaScript to hydrate, with
 * each item's stagger and delay read from the data attributes Reveal.tsx
 * renders. Motion still runs underneath after hydration; the animation's end
 * state holds, so nothing flickers. Everything below the fold, and every page
 * reached by client-side navigation, reveals with Motion exactly as before.
 *
 * The entrance is a Web Animations API animation, not a CSS class or attribute:
 * it must not change any attribute or inline style, because React compares the
 * server HTML with the client render while hydrating and reports every
 * difference as a hydration mismatch (the previous `data-reveal-early` marker
 * and `animation-delay` did exactly that). The single keyframe animates from
 * the hidden state Motion rendered inline to rest, on the same curve and
 * duration as Motion's reveal. `fill: forwards` keeps the element at rest while
 * Motion replays the entrance; once Motion has written the rest state inline,
 * the animation is cancelled so it no longer pins opacity and transform.
 * Reduced motion shows the element at once instead of gliding it in.
 *
 * It reads positions in the first animation frame rather than while the HTML
 * is still parsing: the hidden state is the starting point either way, so
 * nothing needs to happen before first paint, and the frame's own layout is
 * reused instead of forcing an extra one.
 */
export const EARLY_REVEAL_SCRIPT = `requestAnimationFrame(function(){try{if(!Element.prototype.animate)return;var vh=window.innerHeight,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,ease=getComputedStyle(document.documentElement).getPropertyValue('--ease-expo').trim()||'cubic-bezier(0.16, 1, 0.3, 1)',els=document.querySelectorAll('[data-reveal]');for(var i=0;i<els.length;i++){var el=els[i],r=el.getBoundingClientRect();if(r.top>=vh||r.bottom<=0)continue;var d=parseFloat(el.getAttribute('data-reveal-delay')||'0'),p=el.parentElement;if(p&&p.hasAttribute('data-reveal-group')){d+=parseFloat(p.getAttribute('data-reveal-delay-children')||'0')+Array.prototype.indexOf.call(p.children,el)*parseFloat(p.getAttribute('data-reveal-stagger')||'0');}release(el,el.animate([{opacity:1,transform:'none'}],{duration:reduce?0:900,delay:reduce?0:d*1000,easing:ease,fill:'forwards'}));}}catch(e){}function release(el,anim){if(!window.MutationObserver)return;var mo=new MutationObserver(function(){var s=el.style;if(s.opacity==='1'&&(s.transform===''||s.transform==='none')){mo.disconnect();anim.cancel();}});mo.observe(el,{attributes:true,attributeFilter:['style']});}});`;
