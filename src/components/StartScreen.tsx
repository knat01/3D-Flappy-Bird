import React from "react";
import { Text, Box } from "@react-three/drei";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
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

export default StartScreen;
