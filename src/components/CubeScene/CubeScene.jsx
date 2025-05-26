import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function SpinningBox() {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#83A603" />
    </mesh>
  )
}

export default function CubeScene() {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Canvas camera={{ position: [3, 3, 3] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <SpinningBox />
        <OrbitControls />
      </Canvas>
    </div>
  )
}
