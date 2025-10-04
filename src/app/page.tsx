'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  BookOpen, 
  Brain, 
  Trophy, 
  Users, 
  Zap,
  Play,
  ChevronRight,
  Sparkles,
  Target,
  Clock,
  Shield,
  Smartphone,
  Laptop,
  Star
} from 'lucide-react'

// 3D Floating Icons Component
function FloatingIcon({ children, delay = 0, duration = 4 }: { children: React.ReactNode; delay?: number; duration?: number }) {
  return (
    <motion.div
      className="absolute"
      animate={{
        y: [-20, 20, -20],
        rotateY: [0, 180, 360],
        rotateX: [0, 10, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
    >
      {children}
    </motion.div>
  )
}

// 3D Card Component
function Card3D({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
  }

  const rotateX = useSpring((mousePosition.y - 150) / 10, { stiffness: 400, damping: 30 })
  const rotateY = useSpring((mousePosition.x - 150) / 10, { stiffness: 400, damping: 30 })

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
      >
        {/* Glasmorphism Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* 3D Shadow */}
        <motion.div
          className="absolute inset-0 bg-black/5 rounded-3xl"
          style={{
            transform: "translateZ(-50px)",
            transformStyle: "preserve-3d",
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// Parallax Text Component
function ParallaxText({ children, speed = 0.5, className = "" }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

// 3D Device Mockup
function DeviceMockup() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15])
  const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 10])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8])

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        scale,
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
      className="relative px-4"
    >
      {/* iPhone Mockup - Mobile Optimized */}
      <div className="relative w-48 h-72 sm:w-64 sm:h-96 mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl transform-gpu">
          <div className="absolute top-6 left-6 right-6 bottom-6 sm:top-8 sm:left-8 sm:right-8 sm:bottom-8 bg-white rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden">
            {/* Screen Content */}
            <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-3 sm:p-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-900 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
                <span className="text-white font-black text-sm sm:text-lg">FP</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-2 text-center">FahrGewerbe</h3>
              <div className="space-y-1.5 sm:space-y-2 w-full">
                <div className="h-1.5 sm:h-2 bg-slate-200 rounded animate-pulse"></div>
                <div className="h-1.5 sm:h-2 bg-slate-200 rounded animate-pulse w-3/4"></div>
                <div className="h-1.5 sm:h-2 bg-slate-200 rounded animate-pulse w-1/2"></div>
              </div>
              
              {/* Mobile App UI Elements */}
              <div className="mt-4 space-y-2 w-full">
                <div className="flex justify-between">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Home Indicator */}
          <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-0.5 sm:h-1 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Floating Elements around Device - Mobile Optimized */}
      <FloatingIcon delay={0}>
        <div className="absolute -top-8 -right-6 sm:-top-12 sm:-right-12 w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
          <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
      </FloatingIcon>

      <FloatingIcon delay={1}>
        <div className="absolute -bottom-6 -left-8 sm:-bottom-8 sm:-left-16 w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-xl">
          <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
      </FloatingIcon>

      <FloatingIcon delay={2}>
        <div className="absolute top-1/2 -left-12 sm:-left-20 w-10 h-10 sm:w-14 sm:h-14 bg-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
          <Target className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
        </div>
      </FloatingIcon>
    </motion.div>
  )
}

// Interactive 3D Feature Cards
function FeatureCard3D({ icon: Icon, title, description, gradient, delay }: {
  icon: React.ComponentType<any>
  title: string
  description: string
  gradient: string
  delay: number
}) {
  return (
    <Card3D delay={delay} className="h-full">
      <div className="p-8 h-full">
        <motion.div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-xl`}
          whileHover={{ 
            scale: 1.1,
            rotateY: 180,
            transition: { duration: 0.6 }
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>
        
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        <p className="text-white/80 leading-relaxed">{description}</p>
      </div>
    </Card3D>
  )
}

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)

  // Hero Parallax Effects
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden">
      {/* Hero Section with Apple-style Design */}
      <motion.section 
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"
      >
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}>
          </div>
        </div>

        {/* Floating 3D Elements - Mobile Optimized */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingIcon delay={0}>
            <div className="absolute top-16 left-4 sm:top-20 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-blue-500/20 rounded-2xl sm:rounded-3xl backdrop-blur-sm"></div>
          </FloatingIcon>
          <FloatingIcon delay={1}>
            <div className="absolute top-32 right-6 sm:top-40 sm:right-20 w-10 h-10 sm:w-16 sm:h-16 bg-purple-500/20 rounded-xl sm:rounded-2xl backdrop-blur-sm"></div>
          </FloatingIcon>
          <FloatingIcon delay={2}>
            <div className="absolute bottom-32 left-6 sm:bottom-40 sm:left-20 w-16 h-8 sm:w-24 sm:h-12 bg-green-500/20 rounded-lg sm:rounded-xl backdrop-blur-sm"></div>
          </FloatingIcon>
          <FloatingIcon delay={3}>
            <div className="absolute bottom-48 right-4 sm:bottom-60 sm:right-10 w-8 h-8 sm:w-14 sm:h-14 bg-pink-500/20 rounded-full backdrop-blur-sm"></div>
          </FloatingIcon>
        </div>

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Hero Badge - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6 sm:mb-8"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
              <span className="text-white font-medium text-sm sm:text-base">Modernste KI-Lerntechnologie</span>
            </motion.div>

            {/* Hero Title - Mobile Optimized */}
            <ParallaxText speed={0.2}>
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-6 sm:mb-8 leading-none px-2">
                <span className="text-white">Dein Weg zur</span><br />
                <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Fahrerlizenz
                </span>
              </h1>
            </ParallaxText>
            
            <ParallaxText speed={0.1}>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
                Für Taxi, Uber & Mietwagen. Meistere PBefG, BOKraft und alle 
                Prüfungsinhalte mit FahrGewerbe - deiner revolutionären 3D-Lern-App.
              </p>
            </ParallaxText>

            {/* Hero CTA Buttons - Mobile Optimized */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateX: 5 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/pricing"
                  className="group inline-flex items-center justify-center gap-3 bg-white text-slate-900 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 w-full sm:w-auto"
                >
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                  Jetzt starten
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, rotateX: -5 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/learn"
                  className="group inline-flex items-center justify-center gap-3 border-2 border-white/30 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl backdrop-blur-xl hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
                >
                  <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                  3D Demo erleben
                </Link>
              </motion.div>
            </motion.div>

            {/* 3D Device Showcase */}
            <DeviceMockup />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Section with 3D Cards - Mobile Optimized */}
      <section className="py-16 sm:py-24 lg:py-32 bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <ParallaxText speed={0.3} className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6">
              In Zahlen überzeugt
            </h2>
            <p className="text-lg sm:text-xl text-white/60">
              Unsere Erfolgsgeschichte spricht für sich
            </p>
          </ParallaxText>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { number: '2.500+', label: 'Fragen', icon: '📊', gradient: 'from-blue-500 to-cyan-500' },
              { number: '95%', label: 'Erfolgsquote', icon: '🎯', gradient: 'from-green-500 to-emerald-500' },
              { number: '10.000+', label: 'Nutzer', icon: '👥', gradient: 'from-purple-500 to-pink-500' },
              { number: '4.9/5', label: 'Bewertung', icon: '⭐', gradient: 'from-orange-500 to-red-500' }
            ].map((stat, index) => (
              <Card3D key={stat.label} delay={index * 0.2}>
                <div className="p-4 sm:p-6 lg:p-8 text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-4">{stat.icon}</div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-1 sm:mb-2">{stat.number}</div>
                  <div className="text-white/60 font-medium text-sm sm:text-base">{stat.label}</div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with 3D Elements - Mobile Optimized */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <ParallaxText speed={0.2} className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6">
                            Warum FahrGewerbe?
            </h2>
            <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto px-4">
              Revolutionäre 3D-Technologie trifft auf bewährte Lernmethoden
            </p>
          </ParallaxText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 px-4">
            <FeatureCard3D
              icon={Brain}
              title="KI-gestützte 3D-Lernerfahrung"
              description="Erlebe Lernen in einer neuen Dimension mit adaptiven 3D-Umgebungen und personalisierten KI-Algorithmen."
              gradient="from-blue-500 to-purple-600"
              delay={0.2}
            />
            
            <FeatureCard3D
              icon={Trophy}
              title="Interaktive 3D-Simulationen"
              description="Praxisnahe 3D-Szenarien bereiten dich optimal auf reale Fahrsituationen und Prüfungen vor."
              gradient="from-green-500 to-teal-600"
              delay={0.4}
            />
            
            <FeatureCard3D
              icon={Target}
              title="Immersive Lernwelten"
              description="Tauche ein in fotorealistische 3D-Umgebungen und lerne Verkehrsregeln in ihrem natürlichen Kontext."
              gradient="from-purple-500 to-pink-600"
              delay={0.6}
            />
            
            <FeatureCard3D
              icon={Users}
              title="3D-Community Hub"
              description="Vernetze dich mit anderen Lernenden in unserer virtuellen 3D-Community und teile Erfahrungen."
              gradient="from-orange-500 to-red-600"
              delay={0.8}
            />
          </div>
        </div>
      </section>

      {/* Final CTA with 3D Elements - Mobile Optimized */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <Card3D delay={0.2} className="max-w-4xl mx-auto">
            <div className="p-6 sm:p-8 lg:p-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6">
                Bereit für die Zukunft des Lernens?
              </h2>
              <p className="text-lg sm:text-xl text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
                Erlebe eine völlig neue Art zu lernen mit unserer revolutionären 3D-Technologie.
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full sm:w-auto inline-block"
              >
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 px-8 py-4 sm:px-12 sm:py-6 rounded-2xl font-bold text-lg sm:text-xl shadow-2xl hover:shadow-white/25 transition-all duration-300 w-full sm:w-auto"
                >
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                  3D-Erlebnis starten
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
              </motion.div>
            </div>
          </Card3D>
        </div>
      </section>

      {/* Mobile Floating Action Button */}
      <MobileFloatingButton />
    </div>
  )
}

// Mobile Floating Action Button
function MobileFloatingButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0 
      }}
      className="fixed bottom-6 right-6 z-50 md:hidden"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center"
      >
        <Link
          href="/pricing"
          className="w-full h-full flex items-center justify-center text-white"
        >
          <Zap className="w-8 h-8" />
        </Link>
      </motion.div>
    </motion.div>
  )
}
