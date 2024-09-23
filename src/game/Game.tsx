import React, { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, Environment } from "@react-three/drei";
import * as THREE from "three";
import Bird from "../components/Bird";
import Pipe from "../components/Pipe";
import GameOverScreen from "../components/GameOverScreen";
import StartScreen from "../components/StartScreen";
import { PIPE_SPAWN_INTERVAL } from "../utils/constants";

interface PipeData {
  x: number;
  y: number;
  gap: number;
  passed: boolean;
}

const Game: React.FC = () => {
  const [pipes, setPipes] = useState<PipeData[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const birdRef = useRef<THREE.Group>(null);

  const [timeSinceLastPipe, setTimeSinceLastPipe] = useState(0);

  const { camera } = useThree();
  const frustum = new THREE.Frustum();
  const cameraViewProjectionMatrix = new THREE.Matrix4();

  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore") || "0";
    setHighScore(parseInt(storedHighScore, 10));
  }, []);

  useEffect(() => {
    if (gameOver) {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("highScore", score.toString());
      }
    }
  }, [gameOver, score, highScore]);

  const restartGame = () => {
    setPipes([]);
    setGameOver(false);
    setScore(0);
    setTimeSinceLastPipe(0);
    if (birdRef.current) {
      birdRef.current.position.y = 0;
      birdRef.current.rotation.z = 0;
    }
    setStarted(true);
  };

  useFrame((state, delta) => {
    if (!gameOver && started) {
      setTimeSinceLastPipe((prevTime) => prevTime + delta);

      camera.updateMatrixWorld();
      camera.matrixWorldInverse.copy(camera.matrixWorld).invert();
      cameraViewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
      frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

      if (timeSinceLastPipe > PIPE_SPAWN_INTERVAL) {
        const gapSize = 2 + Math.random();
        const pipeY = Math.random() * 3 - 1.5;
        setPipes((prevPipes) => [
          ...prevPipes,
          {
            x: 15,
            y: pipeY,
            gap: gapSize,
            passed: false,
          },
        ]);
        setTimeSinceLastPipe(0);
      }

      setPipes((currentPipes) =>
        currentPipes
          .map((pipe) => ({ ...pipe, x: pipe.x - 5 * delta }))
          .filter((pipe) => {
            const pipePosition = new THREE.Vector3(pipe.x, pipe.y, 0);
            return frustum.containsPoint(pipePosition) || pipe.x > -20;
          })
      );

      setPipes((currentPipes) =>
        currentPipes.map((pipe) => {
          if (birdRef.current) {
            const birdPos = new THREE.Vector3();
            birdRef.current.getWorldPosition(birdPos);

            const pipeWidth = 1.5;
            const pipeHeight = 6;
            const pipeGap = pipe.gap;

            const pipeBoxTop = new THREE.Box3(
              new THREE.Vector3(pipe.x - pipeWidth / 2, pipe.y + pipeGap / 2, -0.5),
              new THREE.Vector3(pipe.x + pipeWidth / 2, pipe.y + pipeGap / 2 + pipeHeight, 0.5)
            );

            const pipeBoxBottom = new THREE.Box3(
              new THREE.Vector3(pipe.x - pipeWidth / 2, pipe.y - pipeGap / 2 - pipeHeight, -0.5),
              new THREE.Vector3(pipe.x + pipeWidth / 2, pipe.y - pipeGap / 2, 0.5)
            );

            const birdSphere = new THREE.Sphere(birdPos, 0.2);

            if (pipeBoxTop.intersectsSphere(birdSphere) || pipeBoxBottom.intersectsSphere(birdSphere)) {
              setGameOver(true);
            }

            if (!pipe.passed && pipe.x + pipeWidth / 2 < birdPos.x - 0.2) {
              setScore((prevScore) => prevScore + 1);
              return { ...pipe, passed: true };
            }
          }
          return pipe;
        })
      );

      if (birdRef.current) {
        const birdY = birdRef.current.position.y;
        if (birdY < -5 || birdY > 5) {
          setGameOver(true);
        }
      }
    }
  });

  return (
    <>
      <Bird ref={birdRef} position={[0, 0, 0]} gameOver={gameOver} started={started} />

      {pipes.map((pipe, index) => (
        <Pipe
          key={index}
          position={[pipe.x, pipe.y, 0]}
          height={6}
          gap={pipe.gap}
        />
      ))}

      <Environment preset="forest" background />

      {gameOver && (
        <GameOverScreen
          score={score}
          onRestart={restartGame}
          highScore={highScore}
        />
      )}

      {!started && !gameOver && <StartScreen onStart={restartGame} />}

      {started && !gameOver && (
        <Text
          position={[0, 4.5, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          {`Score: ${score}`}
        </Text>
      )}
    </>
  );
};

export default Game;
