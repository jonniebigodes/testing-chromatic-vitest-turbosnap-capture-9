import { useEffect, useState } from "react";

export type SpringOscillatorProps = {
  spanPx?: number;
};

type SpringConfig = {
  target: number;
  damping: number;
  stiffness: number;
};

export const SpringOscillator = ({ spanPx = 56 }: SpringOscillatorProps) => {
  const [x, setX] = useState(0);

  useEffect(() => {
    const sequence: SpringConfig[] = [
      { target: spanPx, damping: 8, stiffness: 140 },
      { target: -spanPx, damping: 8, stiffness: 140 },
      { target: 0, damping: 12, stiffness: 180 },
    ];

    let raf = 0;
    let position = 0;
    let velocity = 0;
    let stepIndex = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 1 / 30);
      lastTime = now;

      const cfg = sequence[stepIndex];
      const force =
        -cfg.stiffness * (position - cfg.target) - cfg.damping * velocity;
      velocity += force * dt;
      position += velocity * dt;

      const settled =
        Math.abs(position - cfg.target) < 0.5 && Math.abs(velocity) < 0.5;
      if (settled) {
        position = cfg.target;
        velocity = 0;
        stepIndex = (stepIndex + 1) % sequence.length;
      }

      setX(position);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [spanPx]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 120,
      }}
    >
      <div
        style={{
          width: 240,
          height: 44,
          borderRadius: 999,
          backgroundColor: "#e2e8f0",
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            backgroundColor: "#16a34a",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.12)",
            transform: `translateX(${x}px)`,
          }}
        />
      </div>
    </div>
  );
};
