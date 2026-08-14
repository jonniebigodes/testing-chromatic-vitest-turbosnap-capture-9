import "../animations.css";

export type LoadingPulseDotsProps = {
  dotCount?: number;
  cycleMs?: number;
  color?: string;
};

export const LoadingPulseDots = ({
  dotCount = 5,
  cycleMs = 1400,
  color = "#6366f1",
}: LoadingPulseDotsProps) => {
  const dots = Array.from({ length: dotCount }, (_, i) => i);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        minHeight: 80,
      }}
    >
      {dots.map((i) => (
        <div
          key={i}
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            animationName: "pulse-dot",
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
            backgroundColor: color,
            animationDuration: `${cycleMs}ms`,
            animationDelay: `${-(i / dotCount) * cycleMs}ms`,
          }}
        />
      ))}
    </div>
  );
};
