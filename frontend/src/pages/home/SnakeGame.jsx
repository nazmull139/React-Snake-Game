import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { useGetHighScoreQuery, useUpdateHighScoreMutation } from "../../redux/features/auth/authApi";

const SnakeGame = () => {
  const [score, setScore] = useState(0);
  const [snakeBody, setSnakeBody] = useState([{ x: 5, y: 20 }]);
  const [foodPosition, setFoodPosition] = useState({ x: 13, y: 10 });
  const [snakePosition, setSnakePosition] = useState({ x: 5, y: 20 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const [updateHighScore] = useUpdateHighScoreMutation();
  const { data } = useGetHighScoreQuery(user?._id);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("high-score")) || 0
  );

  const intervalRef = useRef(null);

  const handleUpdateScore = async () => {
    try {
      await updateHighScore({ userId: user?._id, highScore }).unwrap();
      console.log("High score updated in database:");
    } catch (error) {
      console.error("Failed to update high score in database:", error);
    }
  };

  const handleGameOver = () => {
    clearInterval(intervalRef.current);
    alert("You Died! Press OK to restart.");
    if(data?.highScore<highScore){
      handleUpdateScore();
    }
     // Ensure database sync when the game ends.
    window.location.reload();
  };

  const changePosition = () => {
    setFoodPosition({
      x: Math.floor(Math.random() * 30) + 1,
      y: Math.floor(Math.random() * 30) + 1,
    });
  };

  const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocity.y !== 1) {
      setVelocity({ x: 0, y: -1 });
    } else if (e.key === "ArrowDown" && velocity.y !== -1) {
      setVelocity({ x: 0, y: 1 });
    } else if (e.key === "ArrowRight" && velocity.x !== -1) {
      setVelocity({ x: 1, y: 0 });
    } else if (e.key === "ArrowLeft" && velocity.x !== 1) {
      setVelocity({ x: -1, y: 0 });
    }
  };

  const updateGame = () => {
    if (gameOver) {
      handleGameOver();
      return;
    }

    let newSnakePosition = {
      x: snakePosition.x + velocity.x,
      y: snakePosition.y + velocity.y,
    };

    if (
      snakePosition.x <= 0 ||
      snakePosition.x > 30 ||
      snakePosition.y <= 0 ||
      snakePosition.y > 30
    ) {
      setGameOver(true);
      handleGameOver();
      return;
    }

    const newSnakeBody = [...snakeBody];

    for (let i = newSnakeBody.length - 1; i > 0; i--) {
      newSnakeBody[i] = newSnakeBody[i - 1];
    }

    newSnakeBody[0] = { ...snakePosition };

    if (
      snakePosition.x === foodPosition.x &&
      snakePosition.y === foodPosition.y
    ) {
      changePosition();
      newSnakeBody.push({ x: foodPosition.x, y: foodPosition.y });
      setScore((prev) => {
        const newScore = prev + 1;
        const newHighScore = Math.max(newScore, highScore);

        // Update local high score
        if (newHighScore > highScore) {
          setHighScore(newHighScore);
          localStorage.setItem("high-score", newHighScore);

          // Batch database update
         // handleUpdateScore();
        }

        return newScore;
      });
    }

    for (let i = 1; i < newSnakeBody.length; i++) {
      if (
        newSnakePosition.x === newSnakeBody[i].x &&
        newSnakePosition.y === newSnakeBody[i].y
      ) {
        setGameOver(true);
        return;
      }
    }

    setSnakeBody(newSnakeBody);
    setSnakePosition(newSnakePosition);
  };

  useEffect(() => {
    intervalRef.current = setInterval(updateGame, 125);
    return () => clearInterval(intervalRef.current);
  }, [snakeBody]);

  useEffect(() => {
    const handleKeyDown = (e) => changeDirection(e);
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [velocity]);

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <div className="details">
          <span className="score">Score: {score}</span>
          <span className="high-score">
            High-score: {data?.highScore>highScore ? data?.highScore : highScore}
          </span>
        </div>
        <div className="game-box">
          <div
            className="food"
            style={{
              gridArea: `${foodPosition.y} / ${foodPosition.x}`,
            }}
          ></div>
          {snakeBody.map((segment, index) => (
            <div
              key={index}
              className="head"
              style={{
                gridArea: `${segment.y} / ${segment.x}`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
