"use client"; // Ensure this runs only on the client side

import React, { useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import spin.js to prevent server-side execution
// const SpinFunctions = dynamic(() => import("./spin"), { ssr: false });

function WheelPage() {
  useEffect(() => {
    async function loadSpinFunctions() {
      const { drawRouletteWheel, spin } = await import("./spin");
      drawRouletteWheel();

      const spinButton = document.getElementById("spin");
      if (spinButton) {
        spinButton.addEventListener("click", spin);
      }

      return () => {
        if (spinButton) {
          spinButton.removeEventListener("click", spin);
        }
      };
    }

    loadSpinFunctions();
  }, []);

  return (
    <div>
      <input type="button" value="Spin" id="spin" />
      <canvas id="canvas" width="500" height="500"></canvas>
      <style jsx>{`
        #spin {
          float: left;
          margin: 10px;
          padding: 10px;
          background: #ffcc00;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default WheelPage;
