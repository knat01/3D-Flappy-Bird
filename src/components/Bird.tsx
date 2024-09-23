import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

interface BirdProps {
  position: [number, number, number];
  gameOver: boolean;
  started: boolean;
}

const Bird = React.forwardRef<THREE.Group, BirdProps>(({ position, gameOver, started }, ref) => {
  const [velocity, setVelocity] = useState(0);

  useFrame((state, delta) => {
    if (ref && 'current' in ref && ref.current && !gameOver && started) {
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
    const handleJump = (e: KeyboardEvent | MouseEvent | TouchEvent) => {
      if (
        ((e as KeyboardEvent).code === "Space" || e.type === "click" || e.type === "touchstart") &&
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

export default Bird;
