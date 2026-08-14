import "../animations.css";

export type RotationLoopProps = {
  /** One full revolution duration in ms. */
  durationMs?: number;
};

export const RotationLoop = ({ durationMs = 3200 }: RotationLoopProps) => {
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
          width: 88,
          height: 88,
          borderRadius: 16,
          backgroundColor: "#0ea5e9",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
          paddingTop: 10,
          boxSizing: "border-box",
          animationName: "spin-loop",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
          animationDuration: `${durationMs}ms`,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            backgroundColor: "#f8fafc",
          }}
        />
      </div>
    </div>
  );
};
