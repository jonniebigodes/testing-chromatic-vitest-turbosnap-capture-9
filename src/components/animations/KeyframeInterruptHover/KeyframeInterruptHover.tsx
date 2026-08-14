import { useEffect, useState } from "react";
import "../animations.css";

export type KeyframeInterruptHoverProps = {
  /** How often the keyframed card remounts (entering animation restarts). */
  keyframeCycleMs?: number;
  /** How often the bar animation is cancelled and retargeted. */
  interruptCycleMs?: number;
};

export const KeyframeInterruptHover = ({
  keyframeCycleMs = 1600,
  interruptCycleMs = 550,
}: KeyframeInterruptHoverProps) => {
  const [enterKey, setEnterKey] = useState(0);
  const [barWidth, setBarWidth] = useState(48);

  useEffect(() => {
    const id = setInterval(() => {
      setEnterKey((k) => k + 1);
    }, keyframeCycleMs);
    return () => clearInterval(id);
  }, [keyframeCycleMs]);

  useEffect(() => {
    const id = setInterval(() => {
      setBarWidth(56 + Math.random() * 140);
    }, interruptCycleMs);
    return () => clearInterval(id);
  }, [interruptCycleMs]);

  return (
    <div
      style={{
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "8px 0",
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "#52525b",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          marginBottom: 8,
        }}
      >
        Keyframe (remount)
      </span>
      <div
        key={enterKey}
        style={{
          width: 160,
          padding: "16px 12px",
          borderRadius: 12,
          backgroundColor: "#e4e4e7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          animation: "card-enter 900ms ease-in-out",
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#18181b",
          }}
        >
          Hover-like
        </span>
      </div>

      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "#52525b",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          marginBottom: 8,
          marginTop: 20,
        }}
      >
        Interruptible timing
      </span>
      <div
        style={{
          width: 220,
          height: 14,
          borderRadius: 999,
          backgroundColor: "#e4e4e7",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 999,
            backgroundColor: "#7c3aed",
            transition: "width 420ms linear",
            width: barWidth,
          }}
        />
      </div>
    </div>
  );
};
