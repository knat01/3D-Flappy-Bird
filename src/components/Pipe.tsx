import React from "react";
import { Box } from "@react-three/drei";

interface PipeProps {
  position: [number, number, number];
  height: number;
  gap: number;
}

const Pipe: React.FC<PipeProps> = ({ position, height, gap }) => {
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

export default Pipe;
