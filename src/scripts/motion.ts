/* motion.ts — Vanilla TS animation utilities.
   Elements are visible by default; animations are progressive enhancement. */

type FromTo = Record<string, string>;

export function tryAnimate(
  el: Element | null,
  from: FromTo,
  to: FromTo,
  duration: number,
  delay: number,
  easing = "cubic-bezier(0.33, 1, 0.68, 1)"
): void {
  if (!el || !(el instanceof HTMLElement)) return;
  try {
    const anim = el.animate([from, to], { duration, delay, easing, fill: "none" });
    Object.assign(el.style, from);
    anim.onfinish = () => { anim.cancel(); Object.assign(el.style, to); };
    setTimeout(() => { anim.cancel(); Object.assign(el.style, to); }, duration + delay + 100);
  } catch {
    /* Animation not supported — element stays visible */
  }
}

const directionOffsets: Record<string, string> = {
  up:    "translateY(20px)",
  down:  "translateY(-20px)",
  left:  "translateX(20px)",
  right: "translateX(-20px)",
};

export function setupScrollReveals(): void {
  const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const direction = el.dataset.reveal || "up";
        const delay = Number(el.dataset.delay ?? 0);
        tryAnimate(
          el,
          { opacity: "0", transform: directionOffsets[direction] ?? directionOffsets.up },
          { opacity: "1", transform: "none" },
          500,
          delay
        );
        observer.unobserve(el);
      }
    },
    { rootMargin: "-40px", threshold: 0 }
  );

  for (const el of els) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const direction = el.dataset.reveal || "up";
      const delay = Number(el.dataset.delay ?? 0);
      tryAnimate(
        el,
        { opacity: "0", transform: directionOffsets[direction] ?? directionOffsets.up },
        { opacity: "1", transform: "none" },
        500,
        delay
      );
    } else {
      observer.observe(el);
    }
  }
}

export function setupHeroEntries(): void {
  const els = document.querySelectorAll<HTMLElement>("[data-hero-entry]");
  for (const el of els) {
    const delay = Number(el.dataset.delay ?? 0);
    tryAnimate(
      el,
      { opacity: "0", transform: "translateY(24px)" },
      { opacity: "1", transform: "none" },
      600,
      delay
    );
  }
}

export function setupTextReveals(): void {
  const containers = document.querySelectorAll<HTMLElement>("[data-text-reveal]");

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const container = entry.target as HTMLElement;
        animateWords(container);
        observer.unobserve(container);
      }
    },
    { rootMargin: "-20px", threshold: 0 }
  );

  for (const container of containers) {
    const rect = container.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animateWords(container);
    } else {
      observer.observe(container);
    }
  }
}

function animateWords(container: HTMLElement): void {
  const staggerMs = Number(container.dataset.stagger ?? 40);
  const words = container.querySelectorAll<HTMLElement>("[data-word]");
  words.forEach((word, i) => {
    tryAnimate(
      word,
      { opacity: "0", transform: "translateY(100%)" },
      { opacity: "1", transform: "translateY(0)" },
      500,
      i * staggerMs
    );
  });
}
