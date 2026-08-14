import { useEffect, useRef, useState } from "react";

export type FillTextLoadingProps = {
  label?: string;
  cycleMs?: number;
};

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const FillTextLoading = ({
  label = "Loading",
  cycleMs = 2200,
}: FillTextLoadingProps) => {
  const [progress, setProgress] = useState(0);
  const [fullWidth, setFullWidth] = useState(0);
  const baseRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const period = cycleMs * 2;

    const tick = (now: number) => {
      const elapsed = (now - start) % period;
      const linear =
        elapsed < cycleMs
          ? elapsed / cycleMs
          : 1 - (elapsed - cycleMs) / cycleMs;
      setProgress(easeInOutCubic(linear));
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [cycleMs]);

  useEffect(() => {
    const el = baseRef.current;
    if (!el) return;
    const update = () => setFullWidth(el.getBoundingClientRect().width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [label]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 80,
      }}
    >
      <span
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#d4d4d8",
            letterSpacing: "0.5px",
            whiteSpace: "nowrap",
            display: "inline-block",
          }}
          ref={baseRef}
        >
          {label}
        </span>
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <span
            style={{
              overflow: "hidden",
              height: "100%",
              display: "flex",
              alignItems: "center",
              width: fullWidth * progress,
            }}
          >
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#18181b",
                letterSpacing: "0.5px",
                whiteSpace: "nowrap",
                display: "inline-block",
              }}
            >
              {label}
            </span>
          </span>
        </span>
      </span>
    </div>
  );
};
