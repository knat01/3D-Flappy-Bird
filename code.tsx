"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Box,
  Sphere,
  Environment,
  Text,
  Html,
} from "@react-three/drei";
import * as THREE from "three";

const Bird = React.forwardRef(({ position, gameOver, started }, ref) => {
  const [velocity, setVelocity] = useState(0);

  useFrame((state, delta) => {
    if (ref.current && !gameOver && started) {
      ref.current.position.y += velocity * delta;
      setVelocity((v) => v - 20 * delta); // Gravity
      ref.current.rotation.z = THREE.MathUtils.lerp(
        ref.current.rotation.z,
        Math.max(-Math.PI / 2, velocity * 0.2),
        0.1
      );
    }
  });

  useEffect(() => {
    const handleJump = (e) => {
      if (
        (e.code === "Space" || e.type === "click" || e.type === "touchstart") &&
        !gameOver &&
        started
      ) {
        setVelocity(5);
      }
    };
    window.addEventListener("keydown", handleJump);
    window.addEventListener("click", handleJump);
    window.addEventListener("touchstart", handleJump);
    return () => {
      window.removeEventListener("keydown", handleJump);
      window.removeEventListener("click", handleJump);
      window.removeEventListener("touchstart", handleJump);
    };
  }, [gameOver, started]);

  return (
    <group ref={ref} position={position}>
      <Sphere args={[0.2, 32, 32]}>
        <meshStandardMaterial
          color="yellow"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </Sphere>
    </group>
  );
});

const Pipe = ({ position, height, gap }) => {
  return (
    <group position={position}>
      <Box
        args={[1.5, height, 1]}
        position={[0, -gap / 2 - height / 2, 0]}
      >
        <meshStandardMaterial
          color="green"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </Box>
      <Box
        args={[1.5, height, 1]}
        position={[0, gap / 2 + height / 2, 0]}
      >
        <meshStandardMaterial
          color="green"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </Box>
    </group>
  );
};

const GameOverScreen = ({ score, onRestart, highScore }) => {
  return (
    <group position={[0, 0, 1]}>
      <Text
        position={[0, 2, 0]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        Game Over
      </Text>
      <Text
        position={[0, 1, 0]}
        fontSize={0.5}
        color="yellow"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        {`Score: ${score}`}
      </Text>
      <Text
        position={[0, 0, 0]}
        fontSize={0.5}
        color="orange"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        {`High Score: ${highScore}`}
      </Text>
      <group position={[0, -1.5, 0]} onClick={onRestart}>
        <Box args={[3, 1, 0.1]}>
          <meshStandardMaterial
            color="#007BFF"
            metalness={1}
            roughness={0.2}
            envMapIntensity={1}
          />
        </Box>
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          Restart
        </Text>
      </group>
    </group>
  );
};

const StartScreen = ({ onStart }) => {
  return (
    <group position={[0, 0, 1]}>
      <Text
        position={[0, 2, 0]}
        fontSize={1}
        color="yellow"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        Flappy Bird 3D
      </Text>
      <group position={[0, 0, 0]} onClick={onStart}>
        <Box args={[3, 1, 0.1]}>
          <meshStandardMaterial
            color="#28A745"
            metalness={1}
            roughness={0.2}
            envMapIntensity={1}
          />
        </Box>
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          Start Game
        </Text>
      </group>
      <Text
        position={[0, -2, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        Click or Press Space to Flap
      </Text>
    </group>
  );
};

const Game = () => {
  const [pipes, setPipes] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const birdRef = useRef();

  const [timeSinceLastPipe, setTimeSinceLastPipe] = useState(0);
  const pipeSpawnInterval = 1.5; // Decreased from 2 to 1.5 seconds

  const { camera } = useThree();
  const frustum = new THREE.Frustum();
  const cameraViewProjectionMatrix = new THREE.Matrix4();

  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore") || 0;
    setHighScore(parseInt(storedHighScore, 10));
  }, []);

  useEffect(() => {
    if (gameOver) {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("highScore", score);
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

      if (timeSinceLastPipe > pipeSpawnInterval) {
        const gapSize = 2 + Math.random();
        const pipeY = Math.random() * 3 - 1.5;
        setPipes((prevPipes) => [
          ...prevPipes,
          {
            x: 15, // Starting x position (off-screen to the right)
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
            return frustum.containsPoint(pipePosition) || pipe.x > -20; // Increased from -15 to -20
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

export default function FlappyBird() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Game />

        <Html
          position={[0, -3, 0]}
          center
          distanceFactor={1}
          style={{ pointerEvents: "none" }}
        >
          <div className="text-white text-2xl">
            Press Space or Click to Flap
          </div>
        </Html>
      </Canvas>
    </div>
  );
}