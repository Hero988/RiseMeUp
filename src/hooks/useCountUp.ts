import { useEffect, useRef, useState } from "react";

export function useCountUp(
  target: number,
  suffix: string,
  isDecimal: boolean,
  duration = 2000
) {
  const [display, setDisplay] = useState("0");
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          let startTime: number | null = null;

          function easeOutExpo(t: number) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          }

          function update(timestamp: number) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = easeOutExpo(progress);
            const current = target * eased;

            if (isDecimal) {
              setDisplay(current.toFixed(1) + suffix);
            } else {
              setDisplay(Math.floor(current) + suffix);
            }

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              setDisplay(
                isDecimal ? target.toFixed(1) + suffix : target + suffix
              );
            }
          }

          requestAnimationFrame(update);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, isDecimal, duration]);

  return { ref, display };
}
