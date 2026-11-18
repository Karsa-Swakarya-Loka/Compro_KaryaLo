"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";

/**
 * A photograph shown whole inside a box of any shape: the picture is fitted
 * (contain), never cropped or zoomed, and the space around it is filled by a
 * softly blurred copy of the same picture, so a 4:3 or portrait photo sits
 * naturally in a wide banner or a 4:3 frame. The sharp picture sits in a frame
 * sized to its own proportions (read when it loads), so its edges can fade into
 * the blur instead of ending in a hard line. Both layers use the same file, so
 * it is downloaded once. Fills its positioned parent, like `fill`.
 */
export default function FitImage({
  src,
  alt = "",
  sizes,
  priority,
  className,
}: {
  src: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [ratio, setRatio] = useState(4 / 3);
  return (
    <span className={`fit-image ${className ?? ""}`} style={{ "--fit-ratio": ratio } as CSSProperties}>
      <Image src={src} alt="" aria-hidden="true" fill sizes={sizes} className="fit-image-fill" />
      <span className="fit-image-frame">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="fit-image-main"
          onLoad={(e) => {
            const img = e.currentTarget;
            if (img.naturalWidth && img.naturalHeight) setRatio(img.naturalWidth / img.naturalHeight);
          }}
        />
      </span>
    </span>
  );
}
