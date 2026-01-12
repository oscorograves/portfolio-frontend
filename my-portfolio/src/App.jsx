import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { TrendingUp, Target, LineChart, ChevronRight, Play, X, Filter, Mail, Phone, MapPin, Linkedin, Download, Calendar, Briefcase, GraduationCap, Award, Film, Camera, Plane, BookOpen } from 'lucide-react';
import { metricsAPI } from './services/api.js';

const PageWrapper = ({ children, className }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    exit="hidden"
    variants={containerVariants}
    className={className}
  >
    {children}
  </motion.div>
);

// Global Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Default false (browser policy)
  const [volume, setVolume] = useState(0.5);
  const audioRef = React.useRef(null);

  // Handle Play/Pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Autoplay blocked by browser"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Attempt Autoplay on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      // Try to play automatically
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false)); // Autoplay was prevented
      }
    }
  }, []);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 120 }}
      className="fixed bottom-6 right-6 z-50 w-auto"
    >
      {/* The Audio Element (Hidden) */}
      <audio ref={audioRef} src="/song.mp3" loop />

      {/* The Visual Player */}
      <div className="bg-gray-900/90 backdrop-blur-md text-white border border-gray-700 rounded-full px-3 py-2 shadow-2xl flex items-center justify-between gap-4">

        {/* Song Info */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`}>
            <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold truncate">Portfolio Mix</span>
            <span className="text-[10px] text-gray-400 truncate">Kanishk Singh</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-white transition-colors">
            <ChevronRight className="w-5 h-5 rotate-180" /> {/* Reuse Chevron as Prev */}
          </button>

          <button
            onClick={togglePlay}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              // Pause Icon (Manual primitive to avoid importing new icon)
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-black rounded-full"></div>
                <div className="w-1 h-3 bg-black rounded-full"></div>
              </div>
            ) : (
              <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
            )}
          </button>

          <button className="text-gray-400 hover:text-white transition-colors">
            <ChevronRight className="w-5 h-5" /> {/* Next */}
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCreative, setSelectedCreative] = useState(null);

  const NavBar = () => (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-300 z-50">
      <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/profile.jpeg"
            alt="Kanishka Singh"
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
          <div>
            <div className="font-semibold text-gray-900 text-sm">Kanishk Singh</div>
            <div className="text-xs text-gray-600">Performance & Growth Marketer</div>
          </div>
        </div>
        <div className="flex gap-1">
          {['home', 'experience', 'case-studies', 'creative-lab', 'metrics'].map(page => (
            <motion.button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`relative px-4 py-2 text-sm transition-all rounded z-10 ${currentPage === page ? 'text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentPage === page && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gray-900 rounded"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{page.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="pt-20">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-300">
        <motion.div
          className="max-w-6xl mx-auto px-8 py-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <motion.h1 variants={itemVariants} className="text-5xl font-bold text-gray-900 mb-3">Kanishk Singh</motion.h1>
              <motion.p variants={itemVariants} className="text-xl text-gray-700 mb-6 font-medium">Performance & Growth Marketer</motion.p>
              <motion.p variants={itemVariants} className="text-base text-gray-600 leading-relaxed mb-8">
                I design paid media, CRO and growth systems that scale revenue. Specializing in data-driven campaign optimization, funnel design, and performance analytics across B2B and B2C channels.
              </motion.p>
              <motion.div variants={itemVariants} className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage('case-studies')}
                  className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-all cursor-pointer"
                >
                  View Case Studies
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/resume.pdf"
                  download="Kanishk_Singh_Resume.pdf"
                  className="px-5 py-2.5 border-2 border-gray-900 text-gray-900 text-sm font-medium rounded hover:bg-gray-50 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </motion.a>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="space-y-4">
              <div className="bg-gray-50 border border-gray-300 rounded p-4">
                <h3 className="text-xs font-semibold text-gray-600 uppercase mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-gray-700">
                    <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <a href="mailto:oscoro.graves@gmail.com" className="hover:text-gray-900 transition-colors">oscoro.graves@gmail.com</a>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700">
                    <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <a
                      href="tel:+918299406042"
                      className="hover:text-gray-900 transition-colors cursor-pointer"
                    >
                      +91 8299406042
                    </a>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Noida, India</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700">
                    <Linkedin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {/* UPDATED LINKEDIN LINK */}
                    <a href="https://www.linkedin.com/in/kanishk-singh-ab90b2203/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors break-all">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-300 rounded p-4">
                <h3 className="text-xs font-semibold text-gray-600 uppercase mb-3">Key Metrics</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'CTR', value: '+16%' },
                    { label: 'CPA', value: '−14%' },
                    { label: 'MQL', value: '+22%' },
                    { label: 'CVR', value: '+18%' }
                  ].map((kpi, i) => (
                    <motion.div
                      key={i}
                      className="bg-white border border-gray-300 rounded p-2 text-center"
                      whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
                    >
                      <div className="text-xs text-gray-600">{kpi.label}</div>
                      <div className="text-lg font-bold text-gray-900">{kpi.value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-900 text-white border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <motion.div
            className="grid grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { label: 'Years Experience', value: '2+' },
              { label: 'Ad Spend Managed', value: '$267K+' },
              { label: 'Campaigns Run', value: '25+' },
              { label: 'Highest ROI', value: '830%' }
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="text-center">
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Achievement */}
      <section className="bg-white border-b border-gray-300">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-900">Featured Work</h2>
          <motion.div
            className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl p-8 hover:border-gray-900 transition-all group cursor-pointer"
            onClick={() => setCurrentPage('case-studies')}
            whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xs font-semibold text-gray-600 uppercase mb-2">Growth & GTM</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Shipping a Paid GTM Engine for Packt Events</h3>
                <p className="text-gray-600 text-sm">Launched a paid events vertical and achieved 150+ attendees with 95% net-new audience acquisition</p>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-6">
              {[
                { label: 'Paid Attendees', value: '150' },
                { label: 'Net-New %', value: '95%' },
                { label: 'Blended CAC', value: '£12' },
                { label: 'Projected ROAS', value: '8.3×' }
              ].map((metric, i) => (
                <div key={i} className="bg-white border border-gray-300 rounded p-3 text-center">
                  <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
                  <div className="text-xl font-bold text-gray-900">{metric.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What I Offer */}
      <section className="bg-gray-50 border-b border-gray-300">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-900">What I Offer</h2>
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              {
                title: 'Paid Media Strategy & Execution',
                description: 'End-to-end campaign management across Meta, Google, and LinkedIn with focus on creative testing and audience optimization',
                icon: <Target className="w-5 h-5" />
              },
              {
                title: 'CRO Audits & A/B Testing',
                description: 'Data-driven conversion optimization using hypothesis testing, user research, and systematic experimentation',
                icon: <TrendingUp className="w-5 h-5" />
              },
              {
                title: 'Performance Dashboards & Analytics',
                description: 'Custom GA4 tracking, UTM architecture, and real-time dashboards for actionable growth insights',
                icon: <LineChart className="w-5 h-5" />
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white border border-gray-300 rounded-xl p-6 hover:border-gray-900 transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-white mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="bg-white border-b border-gray-300">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-900">Core Competencies</h2>
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { title: 'Performance Marketing', icon: <Target className="w-5 h-5" />, skills: ['Paid Media (Meta, Google, LinkedIn)', 'Campaign Strategy & Scaling', 'Budget Optimization'] },
              { title: 'Growth Marketing', icon: <TrendingUp className="w-5 h-5" />, skills: ['Landing Page Design', 'Funnel Optimization', 'User Experience Enhancement'] },
              { title: 'Analytics & CRO', icon: <LineChart className="w-5 h-5" />, skills: ['GA4 Implementation', 'A/B Testing', 'Performance Dashboards'] }
            ].map((competency, i) => (
              <motion.div key={i} variants={itemVariants} className="bg-gray-50 border border-gray-300 rounded p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-gray-900 rounded flex items-center justify-center text-white">{competency.icon}</div>
                  <h3 className="font-semibold text-gray-900 text-base">{competency.title}</h3>
                </div>
                <ul className="space-y-1.5">
                  {competency.skills.map((skill, j) => (
                    <li key={j} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-gray-400 mt-1.5">•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Digital Skills */}
      <section className="bg-gray-50 border-b border-gray-300">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-900">Digital Skills</h2>
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 mb-3">Platforms & Tools</h3>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={containerVariants}
              >
                {['Google Ads', 'Meta Ads Manager', 'LinkedIn Ads', 'GA4', 'HubSpot', 'SEMrush', 'Ahrefs', 'Optimizely'].map(skill => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
                    className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-700 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 mb-3">Languages</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Hindi</span>
                  <span className="text-xs text-gray-600 bg-white border border-gray-300 px-2 py-1 rounded">Native</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">English</span>
                  <span className="text-xs text-gray-600 bg-white border border-gray-300 px-2 py-1 rounded">C1</span>

                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Dutch</span>
                  {/* UPDATED DUTCH SKILL */}
                  <span className="text-xs text-gray-600 bg-white border border-gray-300 px-2 py-1 rounded">A2</span>

                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );

  const ExperiencePage = () => (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-gray-900">
          Professional Experience
        </h1>

        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Pocket FM */}
          <motion.div
            variants={itemVariants}
            className="bg-white border border-gray-300 rounded p-6"
            whileHover={{ y: -5, borderColor: '#111827', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">Ad Operations Specialist</h3>
                  <span className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-medium text-gray-700">
                    Contract
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    Pocket FM
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Remote
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Calendar className="w-3.5 h-3.5" />
                Jun 2025 – Present
              </div>
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Own Meta Ads execution across acquisition and engagement campaigns for multiple geographies</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Built creative and audience testing systems that improved CTR by ~16% and reduced cost per result by ~14%</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Designed live performance dashboards to guide budget reallocation and creative scaling</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Worked cross-functionally with content and growth teams to roll out winning creative formats globally</span>
              </li>
            </ul>
          </motion.div>

          {/* Intertek */}
          <motion.div
            variants={itemVariants}
            className="bg-white border border-gray-300 rounded p-6"
            whileHover={{ y: -5, borderColor: '#111827', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">Digital Marketing Executive</h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    Intertek India Pvt. Ltd.
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Delhi
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Calendar className="w-3.5 h-3.5" />
                Sep 2024 – Jun 2025
              </div>
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Ran paid search, paid social, and organic campaigns across South Asia for 37+ offices</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Used GA4 funnel analysis and CRO tests to lift conversion rate by ~18% and MQLs by ~22%</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Built and optimised landing pages, enquiry forms, and lead routing to improve sales handoff</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Deployed a Landbot chatbot and ran conversation A/B tests to increase lead completion</span>
              </li>
            </ul>
          </motion.div>

          {/* Tradebuilder */}
          <motion.div
            variants={itemVariants}
            className="bg-white border border-gray-300 rounded p-6"
            whileHover={{ y: -5, borderColor: '#111827', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">Digital Marketing Associate</h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    Tradebuilder Inc.
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Remote
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Calendar className="w-3.5 h-3.5" />
                Sep 2023 – Jul 2024
              </div>
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Managed Google Ads, Meta Ads, and HubSpot campaigns for B2B lead generation</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Built weekly GA4-based funnel and cohort reports that improved ad ROI by ~20%</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Ran A/B tests on creatives and landing pages to increase CTR by ~12% and lower CPL</span>
              </li>
            </ul>
          </motion.div>

          {/* ABP */}
          <motion.div
            variants={itemVariants}
            className="bg-white border border-gray-300 rounded p-6"
            whileHover={{ y: -5, borderColor: '#111827', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">SEO Intern</h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    ABP Learning Technologies
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Noida
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Calendar className="w-3.5 h-3.5" />
                Jun 2023 – Sep 2023
              </div>
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Scaled Instagram to 3,000+ and YouTube to 10,000+ followers using organic-first growth</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Improved search rankings through keyword research, on-page SEO, and metadata optimisation</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Projects */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-900">
            Key Projects
          </h2>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="bg-white border border-gray-300 rounded p-6"
              whileHover={{ y: -5, borderColor: '#111827', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
            >
              <h3 className="font-bold text-gray-900 mb-2">Custom GPT for Marketing Intelligence</h3>
              <p className="text-sm text-gray-700">
                Built a custom GPT integrating SEMrush, Ahrefs, and GA4 to automate competitor analysis, keyword research,
                and reporting. Reduced manual research time and standardised insights across campaigns.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white border border-gray-300 rounded p-6"
              whileHover={{ y: -5, borderColor: '#111827', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
            >
              <h3 className="font-bold text-gray-900 mb-2">Intertek Website Chatbot</h3>
              <p className="text-sm text-gray-700">
                Deployed and optimised a Landbot chatbot on an Optimizely CMS website to capture and qualify leads
                across multiple business units using conditional logic and A/B testing.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Education - Added mt-12 for spacing */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-900">Education</h2>
          <div className="bg-white border border-gray-300 rounded p-6">
            <div className="flex items-start gap-3 mb-3">
              <GraduationCap className="w-5 h-5 text-gray-900 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900">Bachelor of Business Administration</h3>
                <p className="text-sm text-gray-700">Marketing Specialization</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Jaypee Institute of Information Technology</p>
            <p className="text-sm text-gray-600 mb-2">Noida, India • 2020 – 2023</p>
            <p className="text-sm font-medium text-gray-900">CGPA: 7.7 / 10</p>
          </div>
        </div>

        {/* Certifications - Added mt-12 for spacing */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-900">Certifications</h2>
          <div className="bg-white border border-gray-300 rounded p-6">
            <ul className="space-y-3">
              {[
                'Google Ads Certification (Skillshop)',
                'Social Media Marketing (HubSpot)',
                'Fundamentals of Digital Marketing (Google)',
                'SEO Certification (HubSpot)'
              ].map((cert, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <Award className="w-4 h-4 text-gray-900 mt-0.5 flex-shrink-0" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
  const CaseStudiesPage = () => {
    const caseStudies = [
      {
        title: "Shipping a Paid GTM Engine for Packt Events",
        category: "Growth & GTM",
        client: "Packt",
        problem: "Packt needed to launch a new paid events + newsletter vertical and reach 150+ paid attendees while keeping at least 80 percent of registrations net-new.",
        actions: [
          "Designed a 30-day GTM plan with creator affiliates, technical communities, and Meta Ads",
          "Built UTM taxonomy and daily tracking dashboards to measure net-new acquisition",
          "Created a partner rev-share model and micro-affiliate testing system",
          "Sequenced pilot tests, kill-switches, and scale decisions across four growth sprints"
        ],
        results: [
          { metric: "Paid Attendees Target", value: "150" },
          { metric: "Net-New Audience", value: "95%" },
          { metric: "Blended CAC", value: "£12" },
          { metric: "Projected ROAS", value: "8.3×" }
        ]
      },
      {
        title: "30-Day CRO Strategy for JonesRoadBeauty.com",
        category: "Conversion Rate Optimization",
        client: "Jones Road Beauty",
        problem: "The brand was leaking revenue across product pages, shade selection, checkout, and post-purchase flows with no internal analytics access at the start.",
        actions: [
          "Mapped the full funnel from PDP to post-purchase using outside-in UX and competitive research",
          "Built hypothesis-driven test clusters for clarity, shade anxiety, first-time buyers, and checkout confidence",
          "Sequenced tests to prioritize conversion rate before AOV or urgency",
          "Defined guardrails and decision rules to prevent noisy or conflicting experiments"
        ],
        results: [
          { metric: "Test Clusters", value: "5" },
          { metric: "Funnel Zones", value: "4" },
          { metric: "Month-1 Focus", value: "Revenue efficiency" },
          { metric: "Outcome", value: "Scalable CRO backlog" }
        ]
      },
      {
        title: "Scaling User Acquisition for an Audio Platform",
        category: "Performance Marketing",
        client: "Audio Streaming Platform",
        problem: "The platform needed to scale user acquisition while maintaining cost efficiency across highly competitive digital channels.",
        actions: [
          "Conducted extensive audience testing across demographics and interest segments",
          "Optimized creative formats specifically for mobile-first consumption patterns",
          "Ran multiple creative and placement A/B tests to isolate winners",
          "Used Meta's learning phase and bidding controls to scale efficiently"
        ],
        results: [
          { metric: "CTR", value: "+16%" },
          { metric: "CPA", value: "−14%" },
          { metric: "Creative Variants Tested", value: "12+" },
          { metric: "Scale Phase", value: "Stable" }
        ]
      }
    ];

    return (
      <div className="pt-20 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Case Studies</h1>
          <p className="text-gray-600 mb-8 pb-4 border-b-2 border-gray-900">Detailed performance marketing projects and results</p>

          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {caseStudies.map((study, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white border border-gray-300 rounded overflow-hidden"
                whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-gray-900 text-white px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wide mb-1 opacity-80">{study.category}</div>
                      <h2 className="text-xl font-bold">{study.title}</h2>
                    </div>
                    <div className="text-xs bg-white/20 px-3 py-1 rounded">
                      {study.client}
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-gray-600 uppercase mb-2 tracking-wide">Problem Statement</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{study.problem}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-gray-600 uppercase mb-2 tracking-wide">Actions Taken</h3>
                    <ul className="space-y-1.5">
                      {study.actions.map((action, j) => (
                        <li key={j} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-gray-600 uppercase mb-3 tracking-wide">Key Results</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {study.results.map((result, j) => (
                        <div key={j} className="bg-gray-50 border border-gray-300 rounded p-3 text-center">
                          <div className="text-xs text-gray-600 mb-1">{result.metric}</div>
                          <div className="text-2xl font-bold text-gray-900">{result.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  };

  const CreativeLabPage = () => {
    const creatives = [
      { goal: 'Brand Awareness', ctr: '2.8%', cpl: '$12' },
      { goal: 'Lead Generation', ctr: '3.2%', cpl: '$18' },
      { goal: 'App Install', ctr: '4.1%', cpl: '$8' },
      { goal: 'Retargeting', ctr: '5.2%', cpl: '$15' },
      { goal: 'Product Launch', ctr: '3.9%', cpl: '$22' },
      { goal: 'Event Registration', ctr: '3.5%', cpl: '$14' },
      { goal: 'Content Download', ctr: '2.9%', cpl: '$10' },
      { goal: 'Webinar Sign-up', ctr: '4.3%', cpl: '$25' },
      { goal: 'Trial Conversion', ctr: '3.7%', cpl: '$30' }
    ];

    const videos = [
      { title: 'Product Demo Ad', type: 'Ad Edit', duration: '0:30' },
      { title: 'Brand Story', type: 'Promo Video', duration: '1:15' },
      { title: 'Founder Interview', type: 'Podcast Clip', duration: '2:45' },
      { title: 'Feature Highlight', type: 'Ad Edit', duration: '0:45' }
    ];

    return (
      <div className="pt-20 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Creative Lab</h1>
          <p className="text-gray-600 mb-8 pb-4 border-b-2 border-gray-900">Ad creative portfolio and video content</p>

          {/* Ad Creatives */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ad Creatives</h2>
            <motion.div
              className="grid grid-cols-3 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {creatives.map((creative, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  onClick={() => setSelectedCreative(creative)}
                  className="aspect-square bg-white border-2 border-gray-300 rounded cursor-pointer hover:border-gray-900 transition-all group"
                  whileHover="hover"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 relative bg-gradient-to-br from-gray-100 to-gray-200">
                    <motion.div
                      variants={{ hover: { scale: 1.2 } }}
                      className="w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center mb-3 group-hover:bg-gray-900 group-hover:border-gray-900 transition-all"
                    >
                      <Play className="w-6 h-6 text-gray-700 group-hover:text-white transition-all" />
                    </motion.div>
                    <div className="text-xs font-semibold text-gray-700 text-center">{creative.goal}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Video Content */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Video Content</h2>
            <motion.div
              className="grid md:grid-cols-2 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {videos.map((video, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover="hover"
                  className="bg-white border border-gray-300 rounded overflow-hidden hover:border-gray-900 transition-all group cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                    <motion.div
                      variants={{ hover: { scale: 1.2 } }}
                      className="w-14 h-14 bg-white border border-gray-300 rounded-full flex items-center justify-center group-hover:bg-gray-900 group-hover:border-gray-900 transition-all"
                    >
                      <Play className="w-7 h-7 text-gray-700 group-hover:text-white transition-all" />
                    </motion.div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-600 uppercase">{video.type}</span>
                      <span className="text-xs text-gray-600">{video.duration}</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">{video.title}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Creative Modal */}
        {/* Creative Modal */}
        {selectedCreative && (
          <div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50 p-6">
            <div className="bg-white border-2 border-gray-900 rounded max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <h3 className="text-lg font-bold">Campaign Performance</h3>
                <button onClick={() => setSelectedCreative(null)} className="hover:bg-white/20 p-1 rounded transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded mb-6 border border-gray-300"></div>

                <div className="space-y-3 bg-gray-50 border border-gray-300 rounded p-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                    <span className="text-sm text-gray-600">Campaign Goal</span>
                    <span className="font-semibold text-gray-900">{selectedCreative.goal}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                    <span className="text-sm text-gray-600">Click-Through Rate</span>
                    <span className="font-semibold text-gray-900">{selectedCreative.ctr}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Cost Per Lead</span>
                    <span className="font-semibold text-gray-900">{selectedCreative.cpl}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };



  const MetricsPage = () => {
    const [filterChannel, setFilterChannel] = useState('all');
    // HARDCODED FALLBACK DATA (Defined here to use for initialization)
    const fallbackMetrics = [
      { client: 'Pocket FM', channel: 'Meta', spend: 45000, ctr: 3.2, cpl: 12, cvr: 4.8, roi: 280 },
      { client: 'Packt', channel: 'Meta', spend: 1800, ctr: 2.4, cpl: 14, cvr: 6.1, roi: 830 },
      { client: 'Intertek', channel: 'Google Ads', spend: 62000, ctr: 2.1, cpl: 85, cvr: 8.2, roi: 340 },
      { client: 'Jones Road Beauty', channel: 'Direct', spend: 0, ctr: 0, cpl: 0, cvr: 3.4, roi: 0 },
      { client: 'Pocket FM', channel: 'Google Ads', spend: 28000, ctr: 2.8, cpl: 15, cvr: 5.2, roi: 245 },
      { client: 'B2B SaaS', channel: 'LinkedIn', spend: 38000, ctr: 1.8, cpl: 95, cvr: 12.1, roi: 420 },
      { client: 'E-commerce', channel: 'Meta', spend: 52000, ctr: 4.1, cpl: 8, cvr: 3.2, roi: 190 },
      { client: 'B2B SaaS', channel: 'Meta', spend: 41000, ctr: 2.9, cpl: 42, cvr: 9.8, roi: 380 }
    ];

    // Initialize WITH data so there is no loading flash
    const [metrics, setMetrics] = useState(fallbackMetrics);
    const [summary, setSummary] = useState(null);

    // Fetch in background (Silent Update)
    useEffect(() => {
      const fetchMetrics = async () => {
        try {
          const data = filterChannel === 'all'
            ? await metricsAPI.getAll()
            : await metricsAPI.getByChannel(filterChannel);

          if (data && (data.metrics || data.metricsData)) {
            setMetrics(data.metrics || data.metricsData);
            setSummary(data.summary || null);
          }
        } catch (err) {
          console.log('Using fallback data (API Silent Fail)');
          // No action needed, we already have fallback data set
          if (filterChannel !== 'all') {
            setMetrics(fallbackMetrics.filter(m => m.channel === filterChannel));
          }
        }
      };
      fetchMetrics();
    }, [filterChannel]);

    // Handle filtering locally for fallback if needed, or use state
    const displayMetrics = metrics;

    const totalSpend = summary?.totalSpend || displayMetrics.reduce((sum, m) => sum + m.spend, 0);
    const avgCTR = summary?.avgCTR || (displayMetrics.length ? displayMetrics.reduce((sum, m) => sum + m.ctr, 0) / displayMetrics.length : 0);
    const avgCVR = summary?.avgCVR || (displayMetrics.length ? displayMetrics.reduce((sum, m) => sum + m.cvr, 0) / displayMetrics.length : 0);
    const avgROI = summary?.avgROI || (displayMetrics.length ? displayMetrics.reduce((sum, m) => sum + m.roi, 0) / displayMetrics.length : 0);

    return (
      <div className="pt-20 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Performance Metrics</h1>
          <p className="text-gray-600 mb-8 pb-4 border-b-2 border-gray-900">Channel-wise performance across growth, CRO and paid acquisition</p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Summary Cards */}
            <motion.div variants={itemVariants} className="grid md:grid-cols-4 gap-4 mb-8">
              <motion.div whileHover={{ y: -5 }} className="bg-white border border-gray-300 rounded p-5 text-center">
                <div className="text-xs font-semibold text-gray-600 uppercase mb-2">Total Spend</div>
                <div className="text-3xl font-bold text-gray-900">${(totalSpend / 1000).toFixed(1)}K</div>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="bg-white border border-gray-300 rounded p-5 text-center">
                <div className="text-xs font-semibold text-gray-600 uppercase mb-2">Avg CTR</div>
                <div className="text-3xl font-bold text-gray-900">{avgCTR.toFixed(2)}%</div>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="bg-white border border-gray-300 rounded p-5 text-center">
                <div className="text-xs font-semibold text-gray-600 uppercase mb-2">Avg CVR</div>
                <div className="text-3xl font-bold text-gray-900">{avgCVR.toFixed(2)}%</div>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="bg-white border border-gray-300 rounded p-5 text-center">
                <div className="text-xs font-semibold text-gray-600 uppercase mb-2">Avg ROI</div>
                <div className="text-3xl font-bold text-gray-900">{avgROI.toFixed(0)}%</div>
              </motion.div>
            </motion.div>

            {/* Filters */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6 bg-white border border-gray-300 rounded p-4">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-600 uppercase">Channel</span>
              {['all', 'Meta', 'Google Ads', 'LinkedIn', 'Direct'].map(channel => (
                <button
                  key={channel}
                  onClick={() => setFilterChannel(channel)}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-all ${filterChannel === channel
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-50 border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {channel === 'all' ? 'All' : channel}
                </button>
              ))}
            </motion.div>

            {/* Table */}
            <motion.div variants={itemVariants} className="bg-white border-2 border-gray-300 rounded overflow-hidden mb-8">
              <table className="w-full">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    {['Client', 'Channel', 'Spend', 'CTR', 'CPL', 'CVR', 'ROI'].map(header => (
                      <th key={header} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {displayMetrics.map((row, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{row.client}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-semibold text-gray-700">
                          {row.channel}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">${row.spend.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{row.ctr}%</td>
                      <td className="px-4 py-3 text-sm text-gray-900">${row.cpl}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{row.cvr}%</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="font-bold text-green-700">{row.roi}%</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Signal Boxes */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Insights</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <motion.div whileHover={{ y: -5 }} className="bg-white border border-gray-300 rounded p-5">
                  <div className="text-xs font-semibold text-gray-600 uppercase mb-2">Top Channel</div>
                  <div className="text-lg font-bold text-gray-900">Meta Ads</div>
                  <p className="text-sm text-gray-600 mt-2">
                    Best balance of creative testing, audience learning and scale across Pocket FM, Packt and e-commerce.
                  </p>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="bg-white border border-gray-300 rounded p-5">
                  <div className="text-xs font-semibold text-gray-600 uppercase mb-2">Best CVR</div>
                  <div className="text-lg font-bold text-gray-900">LinkedIn (B2B)</div>
                  <p className="text-sm text-gray-600 mt-2">
                    High intent decision makers with slower volume but stronger pipeline quality.
                  </p>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="bg-white border border-gray-300 rounded p-5">
                  <div className="text-xs font-semibold text-gray-600 uppercase mb-2">Highest ROI</div>
                  <div className="text-lg font-bold text-gray-900">Packt GTM</div>
                  <p className="text-sm text-gray-600 mt-2">
                    Creator-led distribution plus Meta amplification produced an 8× revenue multiple.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  };

  const Footer = () => (
    <footer className="bg-white border-t border-gray-300 py-12 mt-12">
      <div className="max-w-6xl mx-auto px-8">

        {/* Top Section: Contact & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="text-sm text-gray-600 font-medium">
            © 2026 Kanishk Singh. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <motion.a
              href="mailto:oscoro.graves@gmail.com"
              className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-4 h-4" /> Email Me
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/kanishk-singh-ab90b2203/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 w-full mb-8"></div>

        {/* Bottom Section: Hobbies */}
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-xs font-semibold text-gray-600 uppercase mb-4">
            Off the Clock
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2 hover:text-gray-900 transition-colors cursor-default">
              <Film className="w-4 h-4" /> Film & Video Editing
            </span>
            <span className="flex items-center gap-2 hover:text-gray-900 transition-colors cursor-default">
              <Camera className="w-4 h-4" /> Photography
            </span>
            <span className="flex items-center gap-2 hover:text-gray-900 transition-colors cursor-default">
              <Plane className="w-4 h-4" /> Solo Travel
            </span>
            <span className="flex items-center gap-2 hover:text-gray-900 transition-colors cursor-default">
              <BookOpen className="w-4 h-4" /> Journaling
            </span>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />

      {/* Main Content Grows to fill space */}
      <div className="flex-grow">
        {currentPage === 'home' && <PageWrapper><HomePage /></PageWrapper>}
        {currentPage === 'experience' && <PageWrapper><ExperiencePage /></PageWrapper>}
        {currentPage === 'case-studies' && <PageWrapper><CaseStudiesPage /></PageWrapper>}
        {currentPage === 'creative-lab' && <PageWrapper><CreativeLabPage /></PageWrapper>}
        {currentPage === 'metrics' && <PageWrapper><MetricsPage /></PageWrapper>}
      </div>

      <Footer />
      <MusicPlayer />
    </div>
  );
}