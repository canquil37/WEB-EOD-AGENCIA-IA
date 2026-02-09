import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { useEODStore } from '../store/useEODStore'
import * as THREE from 'three'

// Componente: El Núcleo de IA (La Esfera Líquida)
function NeuralCore() {
  const meshRef = useRef()
  const activeService = useEODStore((state) => state.activeService)
  
  // Colores reactivos según el estado (puedes personalizarlos)
  const color = useMemo(() => {
    if (!activeService) return "#333333" // Reposo (Gris oscuro metálico)
    return "#FFB800" // Activo (Amarillo EOD)
  }, [activeService])

  useFrame((state) => {
    // Rotación suave constante
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere args={[1, 64, 64]} ref={meshRef} scale={1.8}>
        <MeshDistortMaterial
          color={color}
          envMapIntensity={0.4}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.9} // Aspecto metálico
          roughness={0.1}
          distort={activeService ? 0.6 : 0.3} // Más distorsión si hay servicio activo
          speed={activeService ? 3 : 1.5} // Más velocidad si hay servicio activo
        />
      </Sphere>
    </Float>
  )
}

// Componente: Partículas de Fondo (La Red)
function DataField() {
  return (
    <Stars 
      radius={100} 
      depth={50} 
      count={5000} 
      factor={4} 
      saturation={0} 
      fade 
      speed={1} 
    />
  )
}

// ESCENA PRINCIPAL
export default function Scene() {
  const activeService = useEODStore((state) => state.activeService)

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      {/* Luces cinematográficas */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#FFB800" />
      
      {/* Actores */}
      <NeuralCore />
      <DataField />

      {/* Post-Procesado (EFECTOS DE CÁMARA BRUTALES) */}
      <EffectComposer disableNormalPass>
        {/* Bloom: El brillo neon intenso */}
        <Bloom 
          luminanceThreshold={0.2} 
          mipmapBlur 
          intensity={1.5} 
          radius={0.6}
        />
        
        {/* Noise: Grano de película para realismo */}
        <Noise opacity={0.15} />
        
        {/* Vignette: Oscurece las esquinas para focalizar la vista */}
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        
        {/* Chromatic Aberration: Efecto de "Glitch" o lente barata (RGB Split) */}
        {/* Solo se activa fuerte cuando hay un servicio activo */}
        <ChromaticAberration 
          offset={[activeService ? 0.002 : 0, activeService ? 0.002 : 0]} 
        />
      </EffectComposer>

      {/* Controles (limitados para que el usuario no rompa la vista) */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate={!activeService} // Rota solo si no estás interactuando
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  )
}