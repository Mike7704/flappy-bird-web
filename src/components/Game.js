"use client";
import { useState, useEffect } from "react";
import Bird from "@/components/Bird";
import Floor from "@/components/Floor";

export default function Game() {
  const [scale, setScale] = useState(1);
  const [birdYPos, setBirdYPos] = useState(0);
  const gravity = 1;
  const jumpHeight = 50;

  const gameHeight = 667;
  const birdHeight = 36;

  useEffect(() => {
    const handleResize = () => {
      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;
      const gameWidth = 375;
      const gameHeight = 667;

      // Calculate the scale to maintain aspect ratio
      const scaleX = screenWidth / gameWidth;
      const scaleY = screenHeight / gameHeight;
      const newScale = Math.min(scaleX, scaleY);

      setScale(newScale);
    };

    // Initial scaling on mount
    handleResize();

    // Recalculate scaling on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Bird jump logic
  const handleJump = () => {
    setBirdYPos((prevPosition) => Math.max(prevPosition - jumpHeight, 0)); // Prevent bird going too high
  };

  // Bird gravity
  useEffect(() => {
    const gravityInterval = setInterval(() => {
      setBirdYPos((prevPosition) => {
        return Math.min(prevPosition + gravity, gameHeight / 2 - birdHeight); // Prevent bird going too low
      });
    }, 100); // 100 milliseconds

    return () => clearInterval(gravityInterval); // Cleanup on unmount
  }, []);

  // Key input listeners
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space" || event.type === "click") {
        event.preventDefault();
        handleJump();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("click", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("click", handleKeyPress);
    };
  }, []);

  return (
    <div className="scaled-container">
      <div
        className="game-window"
        style={{
          transform: `scale(${scale})`, // Dynamically scale the game window
        }}
      >
        <Bird yPos={birdYPos} />
        <Floor />
      </div>
    </div>
  );
}
