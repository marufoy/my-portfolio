"use client";

import { useEffect, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/styles.css";

import styles from "./HtmlContentWithImageLightbox.module.css";

type Slide = { src: string; alt?: string; description?: string };

export type HtmlContentWithImageLightboxProps = {
  html: string;
  className?: string;
};

function buildSlides(root: HTMLElement): Slide[] {
  return Array.from(root.querySelectorAll<HTMLImageElement>("img")).map(
    (img) => {
      const alt = img.alt?.trim();
      const title = img.getAttribute("title")?.trim();
      const caption = title || alt || undefined;
      return {
        src: img.currentSrc || img.src,
        alt: alt || caption,
        description: caption,
      };
    }
  );
}

/** `<a href="…"><img /></a>` でリンク先へ飛ぶのを止めつつ画像を特定する */
function resolveClickedImage(
  root: HTMLElement,
  target: Element
): HTMLImageElement | null {
  const fromImg =
    target instanceof HTMLImageElement
      ? target
      : target.closest("img");
  if (fromImg instanceof HTMLImageElement && root.contains(fromImg)) {
    return fromImg;
  }

  const anchor = target.closest("a");
  if (!anchor || !root.contains(anchor)) return null;

  const inside = anchor.querySelectorAll("img");
  if (inside.length !== 1) return null;

  const inner = inside[0];
  return inner instanceof HTMLImageElement ? inner : null;
}

export function HtmlContentWithImageLightbox({
  html,
  className,
}: HtmlContentWithImageLightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    setSlides(buildSlides(root));

    const handleClickCapture = (e: MouseEvent) => {
      const el = e.target;
      if (!(el instanceof Element)) return;

      const img = resolveClickedImage(root, el);
      if (!img) return;

      e.preventDefault();
      e.stopPropagation();

      const slidesNext = buildSlides(root);
      const imgs = Array.from(
        root.querySelectorAll<HTMLImageElement>("img")
      );
      const i = imgs.indexOf(img);
      if (i < 0 || slidesNext.length === 0) return;

      setSlides(slidesNext);
      setIndex(i);
      setOpen(true);
    };

    root.addEventListener("click", handleClickCapture, true);

    return () => {
      root.removeEventListener("click", handleClickCapture, true);
    };
  }, [html]);

  return (
    <>
      <div
        ref={containerRef}
        className={[styles.root, className].filter(Boolean).join(" ")}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {slides.length > 0 && (
        <Lightbox
          className={styles.magnificLike}
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={slides}
          plugins={[Captions, Counter, Zoom]}
          carousel={{ finite: true }}
          controller={{ closeOnBackdropClick: true }}
          captions={{ descriptionTextAlign: "center", showToggle: false }}
          labels={{
            Close: "閉じる",
            Previous: "前の画像",
            Next: "次の画像",
          }}
          on={{
            view: ({ index: next }) => setIndex(next),
          }}
        />
      )}
    </>
  );
}
