import React, { useState, useEffect } from 'react'
import Scene from './engine/Scene'
import { useEODStore } from './store/useEODStore'
import { motion, AnimatePresence } from 'framer-motion'

// Variantes para la secuencia de "Boot" (Arranque del sistema)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1, // Efecto cascada
      delayChildren: 0.5 
    }
  }
}

const itemVariants = {
  hidden: { x: -20, opacity: 0, filter: "blur(10px)" },
  visible: { 
    x: 0, 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120 }
  }
}

function App() {
  const services = useEODStore((state) => state.services)
  const activeService = useEODStore((state) => state.activeService)
  const setActiveService = useEODStore((state) => state.setActiveService)
  const [booted, setBooted] = useState(false)

  // Simulación de carga de sistema
  useEffect(() => {
    setTimeout(() => setBooted(true), 500)
  }, [])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#050505] text-white selection:bg-amarilloEOD selection:text-black font-mono">
      
      {/* CAPA 0: EL MOTOR 3D */}
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen">
        <Scene />
      </div>

      {/* CAPA 1: INTERFAZ DE USUARIO (UI) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={booted ? "visible" : "hidden"}
        className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12 pointer-events-none"
      >
        
        {/* HEADER: Identidad con Glitch */}
        <header className="flex justify-between items-start pointer-events-auto">
          <motion.div variants={itemVariants} className="flex flex-col group cursor-none">
            <motion.h1 
              whileHover={{ x: [0, -2, 2, -1, 0], textShadow: "2px 0px 0px #FF0000, -2px 0px 0px #00FFFF" }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-white mix-blend-difference"
            >
              EOD
            </motion.h1>
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="h-[2px] w-4 bg-amarilloEOD animate-pulse"></span>
              <span className="text-[10px] tracking-[0.6em] text-white/60">
                EXPERTS_ON_DUTY
              </span>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-right text-[10px] tracking-widest text-white/40 uppercase border-r border-white/20 pr-4">
            <p>System_Check: <span className="text-emerald-400">OK</span></p>
            <p>Latency: <span className="text-white">12ms</span></p>
            <p className="mt-2 text-[8px] opacity-50">v.2.0.4-brutal</p>
          </motion.div>
        </header>

        {/* NAVEGACIÓN RADIAL MEJORADA */}
        <section className="relative flex flex-col gap-4 self-start mt-[-5%] pl-4 border-l border-white/5">
          {services && services.map((s, index) => {
            // Curva más agresiva
            const curveOffset = Math.pow(index, 2.2) * 8; 

            return (
              <motion.div 
                key={s.id}
                variants={itemVariants}
                onMouseEnter={() => setActiveService(s.id)}
                className="pointer-events-auto cursor-pointer relative group"
                // Animación de hover magnético
                animate={{ x: activeService === s.id ? curveOffset + 30 : curveOffset }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-4">
                  {/* Indicador de estado */}
                  <motion.div 
                    animate={{ 
                      width: activeService === s.id ? 40 : 4,
                      backgroundColor: activeService === s.id ? "#FFB800" : "#333"
                    }}
                    className="h-1"
                  />
                  
                  <h3 className={`text-sm md:text-base font-bold uppercase tracking-widest transition-colors duration-200 ${
                    activeService === s.id ? 'text-white' : 'text-white/30 group-hover:text-white/60'
                  }`}>
                    {s.title}
                  </h3>
                </div>

                {/* Descripción desplegable con efecto cristal */}
                <AnimatePresence>
                  {activeService === s.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, x: -20 }}
                      animate={{ opacity: 1, height: 'auto', x: 0 }}
                      exit={{ opacity: 0, height: 0, x: -10 }}
                      className="ml-14 mt-2 overflow-hidden"
                    >
                      <div className="backdrop-blur-sm bg-white/5 p-3 border-l-2 border-amarilloEOD max-w-[250px]">
                        <p className="text-[10px] text-gray-300 font-light leading-relaxed">
                          {/* Simulamos código binario o datos antes del texto */}
                          <span className="text-amarilloEOD/50 font-mono block mb-1 text-[8px]">{`>> ACCESSING DATA...`}</span>
                          {s.desc}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </section>

        {/* FOOTER TÁCTICO */}
        <motion.footer variants={itemVariants} className="pointer-events-auto flex justify-between items-end text-[9px] text-white/30 uppercase tracking-widest border-t border-white/10 pt-4">
          <div className="flex gap-6">
            <a href="#" className="hover:text-amarilloEOD transition-colors">Instagram</a>
            <a href="#" className="hover:text-amarilloEOD transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-amarilloEOD transition-colors">GitHub</a>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>Recording_Session</span>
          </div>
        </motion.footer>
      </motion.div>

{/* EFECTOS DE POST-PROCESADO (Overlay CSS) */}
<div className="absolute inset-0 pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      <div className="absolute inset-0 pointer-events-none z-40 bg-gradient-to-t from-black via-transparent to-black/50" />
    </main>
  )
}

export default App