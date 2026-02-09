import React from 'react'
import Scene from './engine/Scene'
import { useEODStore } from './store/useEODStore'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const services = useEODStore((state) => state.services)
  const activeService = useEODStore((state) => state.activeService)
  const setActiveService = useEODStore((state) => state.setActiveService)

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#050505] text-white selection:bg-amarilloEOD selection:text-black">
      {/* CAPA 0: EL MOTOR 3D - El núcleo caótico de EOD */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* CAPA 1: INTERFAZ RADIAL Y BRANDING */}
      <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12 pointer-events-none">
        
        {/* Header - Identidad Visual */}
        <header className="flex justify-between items-start pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col"
          >
            <h1 className="text-4xl font-black tracking-tighter leading-none">EOD</h1>
            <span className="text-[9px] font-mono text-amarilloEOD tracking-[0.4em] mt-1 italic">
              EXPERTS_ON_DUTY
            </span>
          </motion.div>
          
          <div className="text-right font-mono text-[9px] tracking-widest text-white/40 uppercase">
            <p>System Status: <span className="text-amarilloEOD animate-pulse">Core_Active</span></p>
            <p className="mt-1">Neural_Network: <span className="text-white">Stable</span></p>
          </div>
        </header>

        {/* Navegación Radial de Servicios */}
        <section className="relative flex flex-col gap-6 self-start mt-[-10%]">
          {services && services.map((s, index) => {
            // Lógica Radial: Desplazamos los items en el eje X para crear un arco
            // El cálculo Math.pow(index - 2, 2) crea una curva hacia adentro/afuera
            const curveOffset = Math.pow(index - 1.5, 2) * 18;

            return (
              <motion.div 
                key={s.id}
                onMouseEnter={() => setActiveService(s.id)}
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: 1, 
                  x: activeService === s.id ? curveOffset + 15 : curveOffset 
                }}
                className="pointer-events-auto cursor-pointer relative"
              >
                <div className="flex items-center gap-4 group">
                  {/* Línea indicadora dinámica */}
                  <motion.div 
                    animate={{ 
                      width: activeService === s.id ? 40 : 10,
                      backgroundColor: activeService === s.id ? "#FFB800" : "rgba(255,255,255,0.1)"
                    }}
                    className="h-[1px]"
                  />
                  
                  <h3 className={`text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300 ${
                    activeService === s.id ? 'text-amarilloEOD scale-110 translate-x-2' : 'text-white/20'
                  }`}>
                    {s.title}
                  </h3>
                </div>

                <AnimatePresence>
                  {activeService === s.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -5 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-14 mt-2 overflow-hidden"
                    >
                      <p className="text-[10px] text-white/40 font-light max-w-[180px] leading-relaxed border-l border-amarilloEOD/30 pl-4 italic">
                        {s.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </section>

        {/* Footer Técnico Brutalista */}
        <footer className="pointer-events-auto flex justify-between items-end text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">
          <div className="space-y-1">
            <p className="hover:text-white transition-colors cursor-crosshair">Protocol: AI_Brutalism_V1</p>
            <p>Loc: 40.7128° N, 74.0060° W</p>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            <div className="flex gap-4">
              <span className="text-amarilloEOD/40">FB</span>
              <span className="text-amarilloEOD/40">IG</span>
              <span className="text-amarilloEOD/40">LI</span>
            </div>
            <p>© 2026 Experts_On_Duty</p>
          </div>
        </footer>
      </div>

      {/* Efecto decorativo de Scanline */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-50 bg-[length:100%_4px,3px_100%]" />
    </main>
  )
}

export default App