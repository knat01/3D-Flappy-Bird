import React, { Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import Game from './game/Game';

const App: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Suspense fallback={<Html center>Loading...</Html>}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Game />
        </Suspense>
      </Canvas>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        fontSize: '24px',
        pointerEvents: 'none'
      }}>
        Press Space or Click to Flap
      </div>
    </div>
  );
}

export default App;
