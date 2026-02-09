import { create } from 'zustand'

export const useEODStore = create((set) => ({
  activeService: null, // Empezamos en null para calma inicial
  services: [
    { id: 'opt', title: 'Optimización de procesos', desc: 'Análisis y mejora continua de flujos operativos.' },
    { id: 'cons', title: 'Consultoría y estrategia IA', desc: 'Implementación estratégica de modelos personalizados.' },
    { id: 'auto', title: 'Automatización', desc: 'Soluciones para reducir tareas repetitivas.' },
    { id: 'apps', title: 'Web apps / dashboards', desc: 'Aplicaciones robustas para toma de decisiones.' },
    { id: 'front', title: 'Landing / front comercial', desc: 'Diseño de alto impacto orientado a conversión.' }
  ],
  setActiveService: (id) => set({ activeService: id }),
}))