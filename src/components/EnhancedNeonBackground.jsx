import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { memo, useMemo, useRef, Suspense } from 'react';

// 軽量版星屑コンポーネント
const OptimizedStars = memo(() => {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(300 * 3); // 軽量化: 300個
    for (let i = 0; i < 300; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.05;
    }
  });

  return (
    <Points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial 
        transparent 
        color="#ffffff" 
        size={0.12} 
        depthWrite={false}
        alphaTest={0.1}
      />
    </Points>
  );
});

// 軽量版ネオン球体
const NeonSphere = memo(({ position, color, size = 1.2 }) => {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.opacity = 0.3 + Math.sin(clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.3}
        toneMapped={false}
      />
    </mesh>
  );
});

// メイン3D背景コンポーネント
const EnhancedNeonBackground = memo(() => {
  return (
    <div style={{ 
      position: 'absolute', 
      inset: 0, 
      zIndex: 0,
      pointerEvents: 'none'
    }}>
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        className="enhanced-3d-canvas"
        style={{ background: 'transparent' }}
        gl={{ 
          antialias: false,
          powerPreference: 'low-power',
          alpha: true
        }}
      >
        <color attach="background" args={['transparent']} />
        
        <Suspense fallback={null}>
          <OptimizedStars />
          <NeonSphere position={[0, 0, 0]} color="#3B82F6" size={1.0} />
          <NeonSphere position={[4, 1, -2]} color="#8B5CF6" size={0.6} />
        </Suspense>
      </Canvas>
    </div>
  );
});

export default EnhancedNeonBackground;