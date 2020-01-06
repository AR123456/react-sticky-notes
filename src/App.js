import React, { useState, useRef, useEffect, Fragment } from "react";
import { useInterval } from "./useInterval";
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
} from "./constants";

const App = () => {
  const startGame = () => {
    //
  };
  const endGame = () => {
    //
  };
  const moveSnake = () => {
    //
  };
  const createApple = () => {
    //
  };
  const checkCollision = () => {
    //
  };
  const checkAppleCollision = () => {
    //
  };
  const gameLoop = () => {
    //
  };
  useEffect(() => {
    //
  }, [snake, apple, gameOver]);

  return (
    <div role="button" tabIndex="0" onKeyDown={e => moveSnake(e)}>
      <canvas
        style={{ border: "1px solid black" }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      ></canvas>
      {gameOver && <div>Game Over !</div>}
      <button onClick={startGame}>StartGame</button>
    </div>
  );
};
export default App;
