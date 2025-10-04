import { motion } from 'framer-motion'

interface FahrGewerbeLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'white' | 'dark'
  className?: string
  showText?: boolean
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
}

const textSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg'
}

export function FahrGewerbeLogo({ 
  size = 'md', 
  variant = 'default', 
  className = '',
  showText = false 
}: FahrGewerbeLogoProps) {
  const logoClasses = {
    default: 'bg-gradient-to-br from-blue-600 to-purple-600 text-white',
    white: 'bg-white text-slate-900 shadow-lg',
    dark: 'bg-slate-900 text-white'
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <motion.div 
        className={`
          ${sizeClasses[size]} 
          ${logoClasses[variant]} 
          rounded-xl flex items-center justify-center font-black tracking-wider
          shadow-lg hover:shadow-xl transition-all duration-300
        `}
        whileHover={{ 
          scale: 1.05,
          rotateY: 5,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
        style={{
          transformStyle: "preserve-3d"
        }}
      >
        <motion.span 
          className={`${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : size === 'xl' ? 'text-2xl' : 'text-sm'}`}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          FP
        </motion.span>
      </motion.div>
      
      {showText && (
        <motion.div 
          className="flex flex-col"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className={`font-black ${textSizes[size]} ${
            variant === 'white' ? 'text-slate-900' : 
            variant === 'dark' ? 'text-white' : 
            'text-slate-900 dark:text-white'
          }`}>
            FahrGewerbe
          </span>
          <span className={`font-medium ${
            size === 'sm' ? 'text-[10px]' : 
            size === 'lg' ? 'text-sm' : 
            size === 'xl' ? 'text-base' : 
            'text-xs'
          } ${
            variant === 'white' ? 'text-slate-500' : 
            variant === 'dark' ? 'text-slate-400' : 
            'text-slate-500 dark:text-slate-400'
          } -mt-1`}>
            3D Driving School
          </span>
        </motion.div>
      )}
    </div>
  )
}
