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
  const canvasRef = useRef();
  // set up state with the hooks syntax
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameover] = useState(false);

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
  //  this use effect is what actualy draws to the canvas
  useEffect(() => {
    //getting context to be able to draw using canvas
    const context = canvasRef.current.getContext("2d");
    // set tran from context
    // set scale with each update or render using what is defined in SCALE const (x and y )
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    // clear canvas and draw new stuf
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
    ///make the snake pink
    context.fillStyle = "pink";
    // can just pass in 1 px and SCALE will make the correct size
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    // making apple
    context.fillStyle = "lightblue";
    //draw rect and pull apple out of state
    context.fillRect(apple[0], apple[1], 1, 1);
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
