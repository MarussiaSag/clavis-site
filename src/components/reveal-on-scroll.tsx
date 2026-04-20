"use client";

import { useEffect, useRef } from "react";

type RevealOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  once?: boolean;
};

export function RevealOnScroll({
  children,
  className = "",
  delayMs = 0,
  once = true,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const fallbackTimer = window.setTimeout(() => {
      node.classList.add("is-visible");
    }, 900 + delayMs);

    if (!("IntersectionObserver" in window)) {
      node.classList.add("is-visible");
      clearTimeout(fallbackTimer);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          clearTimeout(fallbackTimer);
          if (once) {
            observer.unobserve(node);
          }
        } else if (!once) {
          node.classList.remove("is-visible");
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(node);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [delayMs, once]);

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${className}`.trim()}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
