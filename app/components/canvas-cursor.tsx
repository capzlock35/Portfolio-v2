"use client";

import { useEffect, useState } from "react";
import useCanvasCursor from "../hooks/useCanvasCursor";

export default function CanvasCursor() {
  useCanvasCursor();

  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* Canvas trail */}
      <canvas
        id="canvas"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />

      {/* Static cursor dot */}
      <div
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          width: "6px",
          height: "6px",
          backgroundColor: "white",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </>
  );
}