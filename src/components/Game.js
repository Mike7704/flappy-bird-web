"use client";
import { useState, useEffect } from "react";
import Bird from "@/components/Bird";

export default function Game() {
  const [birdYPos, setBirdYPos] = useState(0);
  const gravity = 1;
  const jumpHeight = 50;

  const gameHeight = 667;
  const birdHeight = 36;

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
    <div className="game-window">
      <Bird yPos={birdYPos} />
    </div>
  );
}
