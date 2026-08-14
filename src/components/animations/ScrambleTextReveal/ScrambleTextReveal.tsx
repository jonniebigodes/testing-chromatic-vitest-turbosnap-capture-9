import { useEffect, useMemo, useState } from "react";
import "../animations.css";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)] ?? "X";
}

export type ScrambleTextRevealProps = {
  words?: string[];
  wordHoldMs?: number;
  scrambleTickMs?: number;
};

export const ScrambleTextReveal = ({
  words: wordsProp,
  wordHoldMs = 2200,
  scrambleTickMs = 45,
}: ScrambleTextRevealProps) => {
  const words = useMemo(
    () => wordsProp ?? ["Hello", "Storybook", "Reanimated"],
    [wordsProp],
  );

  const [display, setDisplay] = useState(words[0] ?? "");

  useEffect(() => {
    let wordIndex = 0;
    let scrambleTimer: ReturnType<typeof setInterval> | undefined;

    const advanceWord = () => {
      const next = words[(wordIndex + 1) % words.length] ?? "";
      wordIndex += 1;
      let step = 0;
      const steps = Math.max(next.length * 2, 14);

      if (scrambleTimer) {
        clearInterval(scrambleTimer);
      }

      scrambleTimer = setInterval(() => {
        step += 1;
        if (step >= steps) {
          if (scrambleTimer) {
            clearInterval(scrambleTimer);
            scrambleTimer = undefined;
          }
          setDisplay(next);
          return;
        }
        const revealCount = Math.min(
          Math.floor((step / steps) * next.length),
          next.length,
        );
        const chars = next.split("");
        const scrambled = chars.map((ch, i) => {
          if (i < revealCount) {
            return ch;
          }
          if (ch === " ") {
            return " ";
          }
          return randomChar();
        });
        setDisplay(scrambled.join(""));
      }, scrambleTickMs);
    };

    const cycle = setInterval(advanceWord, wordHoldMs);
    return () => {
      clearInterval(cycle);
      if (scrambleTimer) {
        clearInterval(scrambleTimer);
      }
    };
  }, [scrambleTickMs, wordHoldMs, words]);

  return (
    <div
      style={{
        minHeight: 72,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 12px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          gap: 6,
        }}
      >
        <span
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#171717",
            letterSpacing: "0.5px",
            fontFamily: "monospace",
          }}
        >
          {display}
        </span>
        <span
          style={{
            width: 3,
            height: 28,
            backgroundColor: "#2563eb",
            borderRadius: 1,
            animation: "caret-blink 800ms ease-in-out infinite",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
