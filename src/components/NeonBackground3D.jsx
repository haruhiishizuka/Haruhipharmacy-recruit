import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { memo, useMemo, useRef } from 'react';

/* ★ 星屑 ------------------ */
const Stars = memo(() => {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(300 * 3); // 軽量化: 300個
    for (let i = 0; i < 300; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40;
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
      <PointMaterial transparent color="#ffffff" size={0.15} depthWrite={false} />
    </Points>
  );
});

/* ★ 流れるネオンの道 -------- */
const NeonPath = memo(() => {
  const mat = useRef();
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-20, -2, -5),
        new THREE.Vector3(-10, 0, 0),
        new THREE.Vector3(0, 2, 2),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(20, -2, -5),
      ]),
    [],
  );

  useFrame(({ clock }) => { 
    if (mat.current) {
      mat.current.dashOffset = -clock.elapsedTime * 0.5; 
    }
  });

  return (
    <mesh>
      <tubeGeometry args={[curve, 100, 0.15, 8, false]} />
      <meshBasicMaterial
        ref={mat}
        color="#ff4dff"
        toneMapped={false}
        dashArray={1}
        dashRatio={0.5}
        transparent
      />
    </mesh>
  );
});

/* ★ 3D 背景コンポーネント ---- */
export default function NeonBackground3D() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 12], fov: 50 }} 
      style={{ position: 'absolute', inset: 0 }}
      gl={{ 
        antialias: false,
        powerPreference: 'low-power',
        alpha: true
      }}
    >
      <color attach="background" args={['transparent']} />

      {/* メイン球体 */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.8, 16, 16]} />
        <meshBasicMaterial color="#00e5ff" toneMapped={false} transparent opacity={0.3} />
      </mesh>

      {/* サブ球体 */}
      <mesh position={[6, 1.5, -2]}>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshBasicMaterial color="#ff4dff" toneMapped={false} transparent opacity={0.3} />
      </mesh>

      <NeonPath />
      <Stars />
    </Canvas>
  );
}