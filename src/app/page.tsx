'use client'

import React, { useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence, easeInOut, easeOut } from 'framer-motion'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: easeInOut }
  }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const floatingAnimation = {
  animate: {
    y: [-20, 20, -20],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1]
    }
  }
}

const cardHover = {
  rest: { scale: 1, rotateY: 0, rotateX: 0 },
  hover: { 
    scale: 1.05, 
    rotateY: 5, 
    rotateX: 5,
    transition: { duration: 0.3 }
  }
}

// Components
const FloatingElements = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div 
      animate={{
        y: [-20, 20, -20],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut", // ✅ Valid easing preset
        },
      }}
      className="absolute top-20 left-10 w-20 h-20 bg-rose-200 rounded-full opacity-60"
    />
    <motion.div 
      {...floatingAnimation}
      animate={{
        y: [-15, 25, -15],
        transition: { duration: 6, repeat: Infinity, ease: [0.42, 0, 0.58, 1], delay: 2 }
      }}
      className="absolute top-40 right-16 w-16 h-16 bg-emerald-200 rounded-full opacity-60"
    />
    <motion.div 
      animate={{
        y: [-20, 20, -20],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut", // ✅ Valid easing preset
        },
      }}
      className="absolute bottom-32 left-1/4 w-24 h-24 bg-blue-200 rounded-full opacity-40"
    />
    <motion.div 
      {...floatingAnimation}
      animate={{
        y: [-10, 30, -10],
        transition: { duration: 6, repeat: Infinity, ease: [0.42, 0, 0.58, 1], delay: 3 }
      }}
      className="absolute top-1/3 right-1/3 w-12 h-12 bg-purple-200 rounded-full opacity-50"
    />
  </div>
)

const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const HeroSection = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  
  return (
    <section className="bg-gradient-to-br from-rose-100 via-emerald-50 to-blue-100 min-h-screen flex items-center justify-center px-4 relative z-10">
      <motion.div 
        style={{ y }}
        className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center"
      >
        {/* Left Column */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center lg:text-left space-y-8"
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-['Space_Grotesk'] leading-tight">
              🏠 <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Surviving City Life
              </span> Just Got Easier
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
              😩 <strong>Tired of PG hunting, tiffin chaos, delayed rent, and broke weeks?</strong>
              <br /><br />
              → Get curated housing, meals, jobs & roommates — all in one place.
            </p>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow"
            >
              ✅ Join the Waitlist
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgb(241 245 249)" }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all"
            >
              🔍 Explore Features
            </motion.button>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-slate-500"
          >
            <div className="flex -space-x-3">
              <motion.div 
                whileHover={{ scale: 1.2, zIndex: 10 }}
                className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full border-2 border-white"
              />
              <motion.div 
                whileHover={{ scale: 1.2, zIndex: 10 }}
                className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full border-2 border-white"
              />
              <motion.div 
                whileHover={{ scale: 1.2, zIndex: 10 }}
                className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-white"
              />
            </div>
            <span><strong>500+ students</strong> already joined!</span>
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative"
        >
          <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-2xl">
            <div className="text-6xl mb-4">📱💻🏠</div>
            <h3 className="text-2xl font-bold mb-4">Your City Survival Kit</h3>
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4 text-slate-600"
            >
              {[
                { icon: "🏠", text: "Find PGs without brokers" },
                { icon: "🍱", text: "Home-cooked tiffin delivery" },
                { icon: "💸", text: "Split bills with roommates" },
                { icon: "💼", text: "Part-time jobs & gigs" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-3"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

const ProblemSection = () => {
  const problems = [
    { emoji: "😭", title: "Flatmate Crisis", text: "\"Flatmate didn't pay rent again 😭\"" },
    { emoji: "🍛", title: "Food Struggles", text: "\"Zomato dinner for the 9th day straight 🍛\"" },
    { emoji: "👕", title: "Laundry Disaster", text: "\"Where are my clean clothes?\"" },
    { emoji: "👻", title: "Landlord Drama", text: "\"Landlord ghosted me 👻\"" }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6">
            😂 <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Real Problems, Real Chaos
            </span>
          </h2>
          <p className="text-xl text-slate-600">We&#39;ve all been there...</p>
        </AnimatedSection>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover="hover"
              initial="rest"
              className="bg-white/70 backdrop-blur-lg p-6 rounded-3xl text-center shadow-lg border border-white/20"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div 
                variants={cardHover}
                className="text-4xl mb-4"
              >
                {problem.emoji}
              </motion.div>
              <h3 className="font-bold text-lg mb-2">{problem.title}</h3>
              <p className="text-slate-600">{problem.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const FeaturesSection = () => {
  const features = [
    {
      emoji: "🏠",
      title: "PG Finder",
      description: "Verified PG listings, no brokers",
      points: ["Real photos & reviews", "Direct owner contact", "Filter by budget & amenities"]
    },
    {
      emoji: "🍱",
      title: "Tiffin Match",
      description: "Home-cooked meals near your college/office",
      points: ["Local aunties cooking", "Monthly subscriptions", "Diet preferences"]
    },
    {
      emoji: "💸",
      title: "Split & Track",
      description: "Share rent, tiffin, and WiFi bills",
      points: ["Auto bill splitting", "Payment reminders", "Expense tracking"]
    },
    {
      emoji: "🧹",
      title: "Maid & Laundry",
      description: "Book vetted maids and laundry pickup",
      points: ["Background verified", "Flexible scheduling", "Quality guarantee"]
    },
    {
      emoji: "💼",
      title: "Jobs Hub",
      description: "Gigs, part-time jobs, and quick internships",
      points: ["Student-friendly timing", "Work from PG options", "Instant payments"]
    },
    {
      emoji: "🤝",
      title: "Roommate Match",
      description: "Find compatible roommates",
      points: ["Lifestyle compatibility", "Verified profiles", "Chat before meeting"]
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-rose-100 via-emerald-50 to-blue-100">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6">
            🤖 <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Your Survival Toolbox
            </span>
          </h2>
          <p className="text-xl text-slate-600">Everything you need to thrive in the city</p>
        </AnimatedSection>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20 transition-all"
            >
              <div className="text-5xl mb-4">{feature.emoji}</div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-600 mb-4">{feature.description}</p>
              <ul className="space-y-2 text-sm text-slate-500">
                {feature.points.map((point, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    ✓ {point}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


const WaitlistSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    city: '',
    role: '',
    problem: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false)

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.email || !formData.number || !formData.city || !formData.role || !formData.problem) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields.'
      })
      return
    }

    // Phone number validation
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,15}$/
    if (!phoneRegex.test(formData.number.replace(/\s/g, ''))) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid phone number.'
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Welcome to BachelorOS! 🎉 Check your email for confirmation.'
        })
        // Reset form
        setFormData({
          name: '',
          email: '',
          number: '',
          city: '',
          role: '',
          problem: ''
        })
        // Show WhatsApp modal after successful submission
        setTimeout(() => {
          setShowWhatsAppModal(true)
        }, 1500)
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.details || data.error || 'Something went wrong. Please try again.'
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: easeOut }
    }
  }

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const WhatsAppModal = () => (
    <AnimatePresence>
      {showWhatsAppModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowWhatsAppModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">🎉 You&#39;re In!</h3>
              <p className="text-gray-600 mb-6">
                Join our exclusive WhatsApp group for instant updates, early access perks, and connect with fellow city survivors!
              </p>
              
              <div className="space-y-4">
                <a
                  href="https://chat.whatsapp.com/GLWCgvs4w0f3NH2XDKPK01" // Replace with your actual WhatsApp group link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>Join WhatsApp Group</span>
                </a>
                
                <button
                  onClick={() => setShowWhatsAppModal(false)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  Maybe Later
                </button>
              </div>
              
              <p className="text-xs text-gray-400 mt-4">
                You can always join later from our welcome email!
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-rose-100 via-emerald-50 to-blue-100">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-white/20 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6">
              🚀 <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Join the Revolution
              </span>
            </h2>
            <p className="text-xl text-slate-600 mb-8">Be among the first to experience city life without chaos</p>

            {/* Status Messages */}
            {submitStatus.type && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mb-6 p-4 rounded-xl ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-300' 
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <div className="space-y-6 max-w-2xl mx-auto">
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 gap-4"
              >
                <motion.input
                  variants={fadeInUp}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name *"
                  required
                  disabled={isSubmitting}
                  className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
                <motion.input
                  variants={fadeInUp}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address *"
                  required
                  disabled={isSubmitting}
                  className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
              </motion.div>
              
              <motion.input
                variants={fadeInUp}
                type="tel"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Phone Number (WhatsApp preferred) *"
                required
                disabled={isSubmitting}
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
              />
              
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 gap-4"
              >
                <motion.select
                  variants={fadeInUp}
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select City *</option>
                  <option value="kolkata">Kolkata</option>
                  <option value="delhi">Delhi</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="pune">Pune</option>
                  <option value="hyderabad">Hyderabad</option>
                  <option value="chennai">Chennai</option>
                  <option value="other">Other</option>
                </motion.select>
                
                <motion.select
                  variants={fadeInUp}
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
                >
                  <option value="">I am a... *</option>
                  <option value="student">Student</option>
                  <option value="professional">Working Professional</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="vendor">Vendor/Service Provider</option>
                </motion.select>
              </motion.div>

              <motion.select
                variants={fadeInUp}
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
              >
                <option value="">My biggest problem is... *</option>
                <option value="food">Finding good food</option>
                <option value="housing">Finding a flat/PG</option>
                <option value="cleaning">Laundry & cleaning</option>
                <option value="jobs">Finding part-time jobs</option>
                <option value="bills">Managing bills</option>
                <option value="roommates">Finding good roommates</option>
              </motion.select>

              <motion.button
                onClick={handleSubmit}
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Joining...
                  </span>
                ) : (
                  '✅ Join 500+ on the Waitlist'
                )}
              </motion.button>
            </div>

            <div className="mt-6 space-y-2">
              <p className="text-sm text-slate-500">🟢 Refer friends and earn Think Coins for early access perks!</p>
              <p className="text-xs text-slate-400">We&#39;ll never spam you. Unsubscribe anytime.</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      <WhatsAppModal />
    </>
  )
}

const AboutSection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <AnimatedSection className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6">
          💡 <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Built by People Who Get It
          </span>
        </h2>
        <p className="text-xl text-slate-600 leading-relaxed">
          From Asansol to Kolkata, we lived the pain of dirty kitchens, lost maids, and rent stress.<br />
          So we&#39;re building the OS we wish we had.<br />
        </p>
      </AnimatedSection>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex justify-center items-center space-x-8"
      >
        <motion.div variants={fadeInUp} className="text-center">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-4"
          />
          <h3 className="font-bold">Founder 1</h3>
          <p className="text-sm text-slate-500">The PG Survivor</p>
        </motion.div>
        <motion.div variants={fadeInUp} className="text-center">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mx-auto mb-4"
          />
          <h3 className="font-bold">Founder 2</h3>
          <p className="text-sm text-slate-500">The Tiffin Expert</p>
        </motion.div>
      </motion.div>
    </div>
  </section>
)

const Footer = () => {
  const socialIcons = [
    { emoji: "📱", bg: "bg-blue-600" },
    { emoji: "📧", bg: "bg-purple-600" },
    { emoji: "💬", bg: "bg-green-600" },
    { emoji: "📺", bg: "bg-red-600" }
  ]

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold font-['Space_Grotesk'] mb-4">BachelorOS</h3>
          <p className="text-slate-400 mb-6">Your city survival operating system</p>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center space-x-6 mb-8"
          >
            {["About", "Privacy Policy", "Contact", "Blog"].map((link, index) => (
              <motion.a
                key={link}
                variants={fadeInUp}
                href="#"
                className="hover:text-blue-400 transition-colors"
              >
                {link}
              </motion.a>
            ))}
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center space-x-4 mb-8"
          >
            {socialIcons.map((icon, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className={`w-10 h-10 ${icon.bg} rounded-full flex items-center justify-center cursor-pointer`}
              >
                {icon.emoji}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="border-t border-slate-700 pt-8 text-center">
          <p className="text-slate-400">Made with ♡ From Kolkata</p>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
const BachelorOSLanding = () => {
  return (
    <div className="bg-slate-50 text-slate-900 font-['Inter']">
      <FloatingElements />
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <WaitlistSection />
      <AboutSection />
      <Footer />
    </div>
  )
}

export default BachelorOSLanding