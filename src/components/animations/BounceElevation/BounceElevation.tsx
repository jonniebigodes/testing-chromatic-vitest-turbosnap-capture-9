import { useEffect, useState } from "react";

export type BounceElevationProps = {
  liftPx?: number;
  cycleMs?: number;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const easeBounceOut = (t: number) => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) return n1 * t * t;
  if (t < 2 / d1) {
    const u = t - 1.5 / d1;
    return n1 * u * u + 0.75;
  }
  if (t < 2.5 / d1) {
    const u = t - 2.25 / d1;
    return n1 * u * u + 0.9375;
  }
  const u = t - 2.625 / d1;
  return n1 * u * u + 0.984375;
};

export const BounceElevation = ({
  liftPx = 36,
  cycleMs = 1400,
}: BounceElevationProps) => {
  const [y, setY] = useState(0);

  useEffect(() => {
    const liftDuration = cycleMs * 0.42;
    const fallDuration = cycleMs * 0.58;
    let raf = 0;
    let start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) % cycleMs;
      let nextY: number;
      if (elapsed < liftDuration) {
        nextY = -liftPx * easeOutCubic(elapsed / liftDuration);
      } else {
        const b = easeBounceOut((elapsed - liftDuration) / fallDuration);
        nextY = -liftPx + liftPx * b;
      }
      setY(nextY);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      start = performance.now();
    };
  }, [cycleMs, liftPx]);

  const ratio = -y / liftPx;
  const shadowOpacity = 0.18 + ratio * 0.22;
  const shadowScaleX = 0.85 + ratio * 0.18;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        minHeight: 160,
        paddingBottom: 12,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 18,
          width: 100,
          height: 16,
          borderRadius: 999,
          backgroundColor: "#020617",
          transformOrigin: "center",
          opacity: shadowOpacity,
          transform: `scaleX(${shadowScaleX})`,
        }}
      />
      <div
        style={{
          width: 92,
          height: 92,
          borderRadius: 18,
          backgroundColor: "#f97316",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${y}px)`,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: "#fff7ed",
          }}
        />
      </div>
    </div>
  );
};
