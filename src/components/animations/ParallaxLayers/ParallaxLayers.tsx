import { useEffect, useState } from "react";

export type ParallaxLayersProps = {
  axis?: "horizontal" | "vertical";
  durationMs?: number;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const ParallaxLayers = ({
  axis = "horizontal",
  durationMs = 5000,
}: ParallaxLayersProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const period = durationMs * 2;

    const tick = (now: number) => {
      const elapsed = (now - start) % period;
      const p =
        elapsed < durationMs
          ? elapsed / durationMs
          : 1 - (elapsed - durationMs) / durationMs;
      setProgress(p);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs]);

  const horizontal = axis === "horizontal";
  const backRange = horizontal ? [-26, 26] : [-18, 18];
  const midRange = horizontal ? [-44, 44] : [-32, 32];
  const frontRange = horizontal ? [-62, 62] : [-46, 46];

  const translate = (range: number[]) => {
    const v = lerp(range[0], range[1], progress);
    return horizontal ? `translateX(${v}px)` : `translateY(${v}px)`;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 160,
      }}
    >
      <div
        style={{
          overflow: "hidden",
          borderRadius: 14,
          backgroundColor: "#f4f4f5",
          position: "relative",
          ...(horizontal
            ? { width: 260, height: 110 }
            : { width: 140, height: 200 }),
        }}
      >
        <div
          style={{
            position: "absolute",
            borderRadius: 10,
            width: "78%",
            height: "62%",
            left: "11%",
            top: "19%",
            backgroundColor: "#93c5fd",
            transform: translate(backRange),
          }}
        />
        <div
          style={{
            position: "absolute",
            borderRadius: 10,
            width: "58%",
            height: "48%",
            left: "21%",
            top: "26%",
            backgroundColor: "#60a5fa",
            transform: translate(midRange),
          }}
        />
        <div
          style={{
            position: "absolute",
            borderRadius: 10,
            width: "40%",
            height: "34%",
            left: "30%",
            top: "33%",
            backgroundColor: "#1d4ed8",
            transform: translate(frontRange),
          }}
        />
      </div>
    </div>
  );
};
