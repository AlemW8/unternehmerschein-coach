'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export function FahrGewerbeLogo({ size = 48, className = "" }: { size?: number; className?: string }) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    // Fallback wenn das Bild nicht gefunden wird
    return (
      <motion.div 
        className={`relative ${className}`}
        style={{ width: size, height: size }}
        whileHover={{ 
          scale: 1.05,
          rotateY: 5,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-black text-lg">FP</span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Image
        src="/FahrGewerbe.svg"
        alt="FahrGewerbe Logo"
        width={size}
        height={size}
        className="object-contain drop-shadow-lg"
        priority
        onError={() => setImageError(true)}
      />
    </motion.div>
  )
}

export default FahrGewerbeLogo
