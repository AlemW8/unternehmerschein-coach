'use client'

import { motion } from 'framer-motion'

// Einfache CSS-basierte 3D-Alternative ohne Three.js
export function Hero3D() {
  return (
    <motion.div 
      className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/10 via-transparent to-green-500/10 rounded-2xl overflow-hidden shadow-2xl relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-green-500 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-yellow-500 rounded-full blur-lg animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-12 w-24 h-24 bg-purple-500 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* 3D-Stil Taxi (CSS-basiert) */}
      <motion.div 
        className="relative"
        animate={{ 
          y: [0, -10, 0],
          rotateY: [0, 5, 0, -5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Taxi Hauptkörper */}
        <div className="relative w-48 h-24 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg shadow-2xl transform-gpu perspective-1000 rotate-x-12 rotate-y-6">
          {/* Taxi Dach */}
          <div className="absolute -top-6 left-6 right-6 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-t-lg shadow-lg"></div>
          
          {/* Windschutzscheibe */}
          <div className="absolute -top-5 left-8 right-8 h-10 bg-gradient-to-b from-blue-200 to-blue-300 rounded-t-lg opacity-80"></div>
          
          {/* Taxi Schild */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-red-500 rounded-sm shadow-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">TAXI</span>
          </div>
          
          {/* Räder */}
          <div className="absolute -bottom-3 left-2 w-8 h-8 bg-gray-800 rounded-full shadow-lg"></div>
          <div className="absolute -bottom-3 right-2 w-8 h-8 bg-gray-800 rounded-full shadow-lg"></div>
          
          {/* Scheinwerfer */}
          <div className="absolute top-1/2 -left-1 w-3 h-6 bg-gray-200 rounded-full shadow-inner"></div>
          <div className="absolute top-1/2 -right-1 w-3 h-6 bg-gray-200 rounded-full shadow-inner"></div>
        </div>

        {/* Schatten */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-4 bg-black/20 rounded-full blur-sm"></div>
      </motion.div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 text-4xl"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0, -10, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 0 }}
        >
          📚
        </motion.div>
        
        <motion.div 
          className="absolute top-1/3 right-1/4 text-3xl"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -15, 0, 15, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          🎯
        </motion.div>
        
        <motion.div 
          className="absolute bottom-1/3 left-1/6 text-3xl"
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, 20, 0, -20, 0]
          }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
        >
          ⚡
        </motion.div>
        
        <motion.div 
          className="absolute bottom-1/4 right-1/6 text-4xl"
          animate={{ 
            y: [0, -18, 0],
            rotate: [0, -12, 0, 12, 0]
          }}
          transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
        >
          🏆
        </motion.div>
      </div>

      {/* Text Overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="px-4 py-2 bg-white/90 dark:bg-gray-800/90 rounded-full backdrop-blur-sm shadow-lg"
        >
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Interaktive 3D-Lernwelt
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
