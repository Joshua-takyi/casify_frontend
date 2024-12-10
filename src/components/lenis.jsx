"use client";
// components/Layout.js
import Lenis from "lenis";
import { useEffect } from "react";

const LenisCom = ({ children }) => {
  useEffect(() => {
    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      smooth: true,
      duration: 1.2, // Customize duration of the smooth scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
    });

    // Create the animation frame loop
    let animationFrameId;

    const raf = (time) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    // Start the animation loop
    animationFrameId = requestAnimationFrame(raf);

    // Cleanup when the component unmounts to prevent memory leaks
    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return <div>{children}</div>;
};

export default LenisCom;
