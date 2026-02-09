import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useEODStore } from '../store/useEODStore'

function SceneContent() {
  const logoTexture = useLoader(THREE.TextureLoader, '/logo-eod.png')
  const lightRef = useRef()
  const activeService = useEODStore((state) => state.activeService)

  useFrame((state) => {
    if (!lightRef.current) return
    const { x, y } = state.mouse
    // Ajuste de distancia: Z en 3.5 evita el "quemado" visual en el centro
    lightRef.current.position.set(x * 5, y * 5, 3.5)
  })

  return (
    <>
      <ambientLight intensity={0.1} />
      
      {/* LUZ FOCAL: Intensidad ajustada para un brillo premium, no cegador */}
      <pointLight 
        ref={lightRef} 
        intensity={35} 
        color="#ffffff" 
        distance={12} 
        decay={2}
      />
      
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
        
        {/* LOGO EOD: Mantenemos el material reactivo pero con emissive más suave */}
        <mesh position={[0, 0, 0.2]}>
          <planeGeometry args={[1.15, 0.7]} />
          <meshStandardMaterial 
            map={logoTexture} 
            transparent={true} 
            alphaTest={0.5}
            emissive="#FFB800"
            emissiveIntensity={0.5} // Bajamos el brillo base
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* ESFERA CAÓTICA: Se mantiene igual de épica */}
        <mesh>
          <sphereGeometry args={[0.75, 64, 64]} /> 
          <MeshDistortMaterial 
            color="#FF8A00" 
            speed={activeService ? 6 : 3} 
            distort={activeService ? 0.75 : 0.5} 
            radius={1} 
            wireframe 
            transparent
            opacity={0.12} 
          />
        </mesh>
      </Float>

      <EffectComposer>
        {/* Subimos el threshold para que el brillo sea más definido y menos "borroso" */}
        <Bloom 
          luminanceThreshold={0.4} 
          intensity={1.5} 
          radius={0.4} 
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

export default function Scene() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 30 }} 
      className="w-full h-full"
      dpr={[1, 2]}
    >
      <color attach="background" args={['#050505']} />
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}