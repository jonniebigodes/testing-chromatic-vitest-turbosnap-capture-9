import "../animations.css";

export type LoadingRipplesProps = {
  ringCount?: number;
  cycleMs?: number;
  color?: string;
};

export const LoadingRipples = ({
  ringCount = 3,
  cycleMs = 2400,
  color = "#3b82f6",
}: LoadingRipplesProps) => {
  const rings = Array.from({ length: ringCount }, (_, i) => i);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 140,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 100,
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {rings.map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 72,
              height: 72,
              borderRadius: 999,
              borderWidth: 2,
              borderStyle: "solid",
              boxSizing: "border-box",
              animationName: "ripple-pulse",
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
              borderColor: color,
              animationDuration: `${cycleMs}ms`,
              animationDelay: `${-(i / ringCount) * cycleMs}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
