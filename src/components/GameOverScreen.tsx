import React from "react";
import { Text, Box } from "@react-three/drei";

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
  highScore: number;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart, highScore }) => {
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

export default GameOverScreen;
