import { useEffect, useState } from "react";

export type BasicAnimationProps = {
  tickMs?: number;
  widthMaxPx?: number;
};

export const BasicAnimation = ({
  tickMs = 3000,
  widthMaxPx = 350,
}: BasicAnimationProps) => {
  const [width, setWidth] = useState(10);

  useEffect(() => {
    const id = setInterval(() => {
      setWidth(Math.random() * widthMaxPx);
    }, tickMs);
    return () => clearInterval(id);
  }, [tickMs, widthMaxPx]);

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
          height: 80,
          backgroundColor: "black",
          margin: 30,
          transition: "width 500ms cubic-bezier(0.5, 0.01, 0, 1)",
          width,
        }}
      />
    </div>
  );
};
