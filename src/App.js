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
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameover(false);
  };
  const endGame = () => {
    setSpeed(null);
    setGameover(true);
  };
  const moveSnake = ({ keyCode }) =>
    // only move when arrow keys are used
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);
  const createApple = () => {
    //
  };
  const checkCollision = (piece, snk = snake) => {
    // check for collision with walls
    if (
      // piece is head of snake
      // x val * scale greater than or = canvas size width
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      // or x val less than 0
      piece[0] < 0 ||
      //y val *scale greater than or = canvas size height
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      // or y less than 0
      piece[1] < 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkAppleCollision = () => {
    //check collision with apple make sure that when we first get random apple it is not inside the snake
  };
  const gameLoop = () => {
    //move snake make copy of snake - deep clone since it is a multidimentional array
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    // make new snake head
    // calc new x coord looking at the copy's x posiiton and dir  x is the first values in their respective arrays y is the second value
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    // mutate the snakecopy and attach the new head to the start of the array
    snakeCopy.unshift(newSnakeHead);
    // check for collison
    if (checkCollision(newSnakeHead)) endGame();
    //remove the last element in the array - this is how we get snake to crawl

    snakeCopy.pop();
    // update state
    setSnake(snakeCopy);
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

  useInterval(() => gameLoop(), speed);

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
