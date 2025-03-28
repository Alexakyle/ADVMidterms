import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import { Clock, Mail, Phone, Gavel, Award, Globe, ChevronDown, ChevronUp, Play, Pause, Quote, ArrowRight, ChevronLeft, ChevronRight, TrendingUp, Repeat, Sparkles, Gem, Palette, Brush } from "lucide-react";
import tourVideo from "../../components/ui/tour.mp4";
import { motion, useAnimation, useInView } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";

const AboutPage = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredSpecialist, setHoveredSpecialist] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const platformRef = useRef(null);
  const statsRef = useRef(null);
  const artworksRef = useRef(null);
  const processRef = useRef(null);
  const teamRef = useRef(null);
  const successRef = useRef(null);
  const contactRef = useRef(null);

  // Animation controls
  const heroControls = useAnimation();
  const platformControls = useAnimation();
  const statsControls = useAnimation();
  const artworksControls = useAnimation();
  const processControls = useAnimation();
  const teamControls = useAnimation();
  const successControls = useAnimation();
  const contactControls = useAnimation();

  // Set up inView triggers
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.5 });
  const isPlatformInView = useInView(platformRef, { once: true, amount: 0.3 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const isArtworksInView = useInView(artworksRef, { once: true, amount: 0.3 });
  const isProcessInView = useInView(processRef, { once: true, amount: 0.3 });
  const isTeamInView = useInView(teamRef, { once: true, amount: 0.3 });
  const isSuccessInView = useInView(successRef, { once: true, amount: 0.3 });
  const isContactInView = useInView(contactRef, { once: true, amount: 0.3 });

  // Trigger animations when elements come into view
  useEffect(() => {
    if (isHeroInView) heroControls.start("visible");
    if (isPlatformInView) platformControls.start("visible");
    if (isStatsInView) statsControls.start("visible");
    if (isArtworksInView) artworksControls.start("visible");
    if (isProcessInView) processControls.start("visible");
    if (isTeamInView) teamControls.start("visible");
    if (isSuccessInView) successControls.start("visible");
    if (isContactInView) contactControls.start("visible");
  }, [
    isHeroInView, isPlatformInView, isStatsInView, isArtworksInView, 
    isProcessInView, isTeamInView, isSuccessInView, isContactInView,
    heroControls, platformControls, statsControls, artworksControls,
    processControls, teamControls, successControls, contactControls
  ]);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const toggleVideo = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate featured artworks
  useEffect(() => {
    const artworkInterval = setInterval(() => {
      setCurrentArtworkIndex((prev) => (prev + 1) % featuredArtworks.length);
    }, 4000);
    return () => clearInterval(artworkInterval);
  }, []);

  // Animated counters for stats
  useEffect(() => {
    const targetValues = [850, 42, 28, 96];
    const duration = 2000;
    const startTime = Date.now();
    
    const animateCounters = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const newCounters = targetValues.map((target, index) => {
        if (index === 3) {
          return Math.floor(progress * target);
        } else {
          const increment = target / 20;
          return Math.floor(progress * target / increment) * increment;
        }
      });
      
      setCounters(newCounters);
      
      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      }
    };
    
    animateCounters();
  }, []);

  const handleTestimonialNavigation = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTestimonial(index);
      setIsTransitioning(false);
    }, 500);
  };

  const featuredArtworks = [
    {
      title: "Island Sunset",
      artist: "Maria Clara",
      price: "₱125,000",
      image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      medium: "Oil on canvas",
      dimensions: "24 × 36 inches",
      bids: 14,
      timeLeft: "2h 45m"
    },
    {
      title: "Urban Rhythm",
      artist: "Juan Luna Jr.",
      price: "₱85,000",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2005&q=80",
      medium: "Acrylic on wood",
      dimensions: "18 × 24 inches",
      bids: 8,
      timeLeft: "1d 3h"
    },
    {
      title: "Mountain Serenity",
      artist: "Liwayway Cruz",
      price: "₱150,000",
      image: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80",
      medium: "Watercolor on paper",
      dimensions: "22 × 30 inches",
      bids: 22,
      timeLeft: "6h 12m"
    },
    {
      title: "Cultural Mosaic",
      artist: "Fernando Reyes",
      price: "₱220,000",
      image: "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
      medium: "Mixed media",
      dimensions: "36 × 48 inches",
      bids: 17,
      timeLeft: "3d 5h"
    }
  ];

  const teamMembers = [
    {
      name: "Maria Santos",
      title: "Artist Relations Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      expertise: "Artist Development",
      years: "3 years with us",
      achievements: [
        "Curated 200+ successful auctions",
        "Artist mentorship program founder",
        "International exhibition coordinator"
      ]
    },
    {
      name: "Juan Dela Cruz",
      title: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      expertise: "Platform Innovation",
      years: "4 years with us",
      achievements: [
        "Built real-time bidding system",
        "AI-powered art valuation",
        "Blockchain authentication"
      ]
    },
    {
      name: "Sofia Reyes",
      title: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      expertise: "Visionary Leadership",
      years: "4 years with us",
      achievements: [
        "Established global collector network",
        "Pioneered digital art auctions",
        "Featured in Forbes 30 Under 30"
      ]
    },
    {
      name: "James Tan",
      title: "Marketing Director",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      expertise: "Brand Strategy",
      years: "3 years with us",
      achievements: [
        "500% audience growth",
        "Viral auction campaigns",
        "Celebrity art partnerships"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Andrea Lopez",
      title: "Visual Artist",
      quote: "This platform transformed my career. My first auction exceeded expectations by 300%, and now international collectors compete for my work. The team's expertise in positioning emerging artists is unparalleled.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      medium: "Oil paintings",
      location: "Manila, Philippines",
      result: "₱420,000 final bid",
      increase: "320% over reserve"
    },
    {
      name: "Carlos Hernandez",
      title: "Digital Artist",
      quote: "As a digital creator, I doubted my work could command serious bids. The auction format proved me wrong - my NFT collection sold for ₱780,000, with bidding wars between collectors from 5 countries.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      medium: "Digital art",
      location: "Cebu, Philippines",
      result: "₱780,000 final bid",
      increase: "490% over reserve"
    },
    {
      name: "Ling Zhang",
      title: "Art Collector",
      quote: "I've acquired 14 pieces through these auctions. The competitive environment surfaces extraordinary talent, and the authentication process gives me confidence in every acquisition. My collection has appreciated 200% thanks to discoveries here.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      medium: "Collects various media",
      location: "Hong Kong",
      result: "14 artworks collected",
      increase: "200% appreciation"
    }
  ];

  const SectionDivider = ({ variant = "default", sectionBg = "white" }) => {
    const variants = {
      default: (
        <div className="relative py-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gallery-beige/50"></div>
          </div>
          <div className="relative flex justify-center">
            <span className={`px-6 ${sectionBg === 'white' ? 'bg-white' : 'bg-gallery-beige/30'} rounded-full`}>
              <Brush className="h-6 w-6 text-gallery-accent p-1 bg-gallery-accent/10 rounded-full" />
            </span>
          </div>
        </div>
      ),
      wavy: (
        <div className="relative py-12 overflow-hidden">
          <svg
            className="absolute top-0 left-0 w-full h-10"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".35"
              className="fill-current text-gallery-beige/50"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="fill-current text-gallery-beige/50"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-current text-gallery-beige/50"
            ></path>
          </svg>
          <div className="relative flex justify-center">
            <span className={`px-6 ${sectionBg === 'white' ? 'bg-white' : 'bg-gallery-beige/30'} rounded-full`}>
              <Palette className="h-6 w-6 text-gallery-accent p-1 bg-gallery-accent/10 rounded-full" />
            </span>
          </div>
        </div>
      ),
      dots: (
        <div className="relative py-10">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t-2 border-dashed border-gallery-beige/50"></div>
          </div>
          <div className="relative flex justify-center">
            <div className={`flex space-x-3 ${sectionBg === 'white' ? 'bg-white' : 'bg-gallery-beige/30'} px-6 py-1 rounded-full`}>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-2 w-2 rounded-full bg-gallery-accent/50"></div>
              ))}
            </div>
          </div>
        </div>
      ),
      brush: (
        <div className="relative py-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-gallery-accent/50 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className={`${sectionBg === 'white' ? 'bg-white' : 'bg-gallery-beige/30'} px-6 rounded-full`}>
              <svg
                className="h-6 w-6 text-gallery-accent p-1 bg-gallery-accent/10 rounded-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
          </div>
        </div>
      )
    };

    return variants[variant] || variants.default;
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gallery-text">
      <Navbar />

      {/* Hero Section with Video Option */}
      <motion.div 
        ref={heroRef}
        initial="hidden"
        animate={heroControls}
        variants={fadeIn}
        className="relative h-screen max-h-[800px] overflow-hidden bg-gallery-beige"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 z-10 flex items-center justify-center">
          <motion.div 
            className="text-center px-4 relative z-20"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-gallery-accent/10 rounded-full filter blur-xl animate-pulse-slow"></div>
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gallery-accent/5 rounded-full filter blur-xl animate-pulse-slow animation-delay-2000"></div>
            
            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif tracking-tight text-white drop-shadow-lg">
              WHERE <span className="text-gallery-accent">ART</span> FINDS ITS <span className="relative">
                VALUE
                <Sparkles className="absolute -top-3 -right-5 text-gallery-accent animate-pulse" size={24} />
              </span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl max-w-3xl mx-auto font-light text-white/90 mb-6">
              The world's most <span className="font-medium text-white">prestigious</span> auction platform connecting visionary artists with discerning collectors
            </motion.p>
            <motion.div variants={fadeIn} className="flex justify-center">
              <button 
                onClick={toggleVideo}
                className="flex items-center justify-center mx-auto bg-gallery-accent hover:bg-gallery-accent-dark text-white px-6 py-3 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-sm"
              >
                {isPlaying ? (
                  <>
                    <Gem className="mr-2" size={16}/>
                  </>
                ) : (
                  <>
                    <Play className="mr-2" size={16} /> Witness Our Auction Magic
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        </div>
        {isPlaying ? (
          <video 
            autoPlay 
            muted 
            loop 
            className="w-full h-full object-cover"
          >
            <source src={tourVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src="https://images.unsplash.com/photo-1578926375605-eaf7559b1458?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
            alt="Art auction in progress"
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      <SectionDivider variant="wavy" sectionBg="gallery-beige" />

      {/* Our Platform Section - Updated with new style */}
      <motion.div 
        ref={platformRef}
        initial="hidden"
        animate={platformControls}
        variants={fadeIn}
        className="relative py-16 bg-white overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-gallery-accent/10 blur-xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 -right-20 w-60 h-60 rounded-full bg-gallery-accent/5 blur-xl animate-pulse-slow animation-delay-2000"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-gallery-accent/20 blur-lg animate-pulse-slow animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div 
            variants={fadeIn}
            className="mb-12 text-center"
          >
            <h2 className="text-base font-medium text-gallery-accent mb-1 tracking-widest">OUR MISSION</h2>
            <div className="relative inline-block mb-6 group">
              <h3 className="text-3xl md:text-4xl font-medium relative z-10 group-hover:text-gallery-accent transition-colors duration-300">
                <span className="text-gallery-accent font-bold">REVOLUTIONIZING</span> ART COMMERCE
              </h3>
              <div className="absolute -bottom-1 left-0 w-3/4 h-1 bg-gradient-to-r from-gallery-accent to-transparent z-0 group-hover:w-full transition-all duration-500"></div>
            </div>
            <p className="text-lg text-center text-gallery-text/70 max-w-2xl mx-auto">
              Creating a fair, transparent marketplace for artists and collectors
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="flex flex-col lg:flex-row gap-10 items-center"
          >
            <motion.div variants={slideInFromLeft} className="lg:w-1/2 relative">
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-xl relative group">
                <img
                  src="https://static01.nyt.com/images/2021/05/12/arts/12auctions-sothebys-nina-4/merlin_187675863_2ea4fde6-7eaf-4f44-90ef-35633d607c97-superJumbo.jpg"
                  alt="Artist uploading artwork"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-gallery-accent flex items-center justify-center shadow-xl transform hover:rotate-12 transition-all duration-300">
                  <span className="text-white text-2xl font-bold font-serif">2020</span>
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md transform hover:-rotate-12 transition-all duration-300">
                  <Palette className="text-gallery-accent" size={24} />
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={slideInFromRight} className="lg:w-1/2">
              <div className="space-y-4">
                <p className="text-gallery-text/80 leading-relaxed text-base border-l-2 border-gallery-accent pl-3 hover:border-gallery-accent-dark transition-colors duration-300">
                  Our <span className="font-semibold text-gallery-accent">exclusive auction platform</span> was designed to create a fair, transparent marketplace where artists receive proper 
                  value for their work and collectors discover exceptional pieces. The competitive bidding process ensures 
                  market-driven pricing that often exceeds expectations.
                </p>
                
                <div className="p-4 bg-gradient-to-br from-gallery-beige/20 to-gallery-accent/10 rounded-lg border border-gallery-beige/50 hover:bg-gallery-beige/30 transition-colors duration-300 shadow-md hover:shadow-lg">
                  <div className="flex items-start">
                    <Gavel className="text-gallery-accent mr-3 mt-0.5 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-gallery-text/80 leading-relaxed italic text-sm">
                        "Traditional galleries often dictate prices. Our auction system lets the global market decide, resulting in 
                        fairer valuations and <span className="font-semibold">exciting opportunities</span> for both artists and collectors."
                      </p>
                      <p className="mt-2 text-xs text-gallery-accent font-medium">
                        — Our Auction Philosophy
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-base font-medium mb-3 text-gallery-accent hover:underline transition-all duration-300 flex items-center">
                    <Brush className="mr-2" size={16} /> Premium Auction Features
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { feature: "Transparent bidding", description: "Real-time updates on all bids", icon: "👁️" },
                      { feature: "Reserve prices", description: "Protect your minimum value", icon: "🛡️" },
                      { feature: "Timed auctions", description: "Flexible closing times", icon: "⏳" },
                      { feature: "Global reach", description: "Bidders from 50+ countries", icon: "🌎" }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        variants={fadeIn}
                        className="bg-white/90 backdrop-blur-sm p-3 rounded-lg hover:bg-white transition-colors duration-300 shadow-sm hover:shadow border border-gray-100"
                      >
                        <div className="flex items-center mb-1">
                          <span className="text-lg mr-1">{item.icon}</span>
                          <div className="text-gallery-accent font-bold hover:text-gallery-accent-dark transition-colors duration-300 text-sm">{item.feature}</div>
                        </div>
                        <div className="text-xs text-gallery-text/80 pl-5">{item.description}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <SectionDivider variant="dots" />

      {/* Enhanced Stats Section with better background */}
      <motion.div 
        ref={statsRef}
        initial="hidden"
        animate={statsControls}
        variants={fadeIn}
        className="py-16 bg-gradient-to-br from-gallery-beige/30 to-gallery-accent/10 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(244,162,97,0.05)_0%,_transparent_70%)]"></div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-gallery-accent/10 blur-xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full bg-gallery-accent/5 blur-xl animate-pulse-slow animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-base font-medium text-gallery-accent mb-1 tracking-widest">BY THE NUMBERS</h2>
            <h3 className="text-3xl md:text-4xl font-medium mb-4 font-serif relative inline-block">
              <span className="relative z-10">Our Auction Impact</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gallery-accent/30 z-0"></span>
            </h3>
            <p className="text-lg text-center text-gallery-text/70 max-w-2xl mx-auto">
              Quantifying our transformative effect on art sales through our premium auction platform
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { 
                value: counters[0], 
                suffix: "M+", 
                label: "Artist Earnings", 
                description: "Generated through our auctions",
                icon: "💰"
              },
              { 
                value: counters[1], 
                suffix: "", 
                label: "Countries", 
                description: "With active collectors bidding",
                icon: "🌍"
              },
              { 
                value: counters[2], 
                suffix: "K+", 
                label: "Artworks Sold", 
                description: "Through successful auctions",
                icon: "🖼️"
              },
              { 
                value: counters[3], 
                suffix: "%", 
                label: "Sell-Through", 
                description: "Rate of auction listings",
                icon: "📈"
              }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={scaleUp}
                className="relative bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-white hover:border-gallery-accent/20 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gallery-beige/30 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="flex items-end mb-3">
                    <span className="text-4xl md:text-5xl font-bold text-gallery-accent">
                      {stat.value}
                    </span>
                    <span className="text-2xl font-bold text-gallery-accent ml-1">
                      {stat.suffix}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium mb-1 group-hover:text-gallery-accent transition-colors duration-300">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-gallery-text/70">
                    {stat.description}
                  </p>
                </div>
                
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 border border-transparent group-hover:border-gallery-accent/30 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_20%,#f4a26180_25%,transparent_30%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            variants={fadeIn}
            className="mt-12 text-center"
          >
            <button className="inline-flex items-center justify-center bg-gradient-to-r from-gallery-accent to-gallery-accent-dark text-white px-8 py-3 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl group text-sm">
              <span className="mr-2 text-base font-medium">Start Your Auction Journey</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={16} />
            </button>
          </motion.div>
        </div>
      </motion.div>

      <SectionDivider variant="brush" sectionBg="gallery-beige/30" />

      {/* Featured Artworks Section */}
      <motion.div 
        ref={artworksRef}
        initial="hidden"
        animate={artworksControls}
        variants={fadeIn}
        className="py-16 bg-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] opacity-10"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div 
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-base font-medium text-gallery-accent mb-1 tracking-widest">CURRENTLY FEATURED</h2>
            <h3 className="text-3xl md:text-4xl font-medium mb-4 font-serif relative inline-block">
              <span className="relative z-10">Masterpieces in Auction</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gallery-accent/30 z-0"></span>
            </h3>
            <p className="text-lg text-center text-gallery-text/70 max-w-2xl mx-auto">
              Extraordinary artworks currently available through our exclusive auctions
            </p>
          </motion.div>

          <motion.div 
            variants={scaleUp}
            className="relative h-[500px] max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg"
          >
            {featuredArtworks.map((artwork, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${currentArtworkIndex === index ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="relative h-full w-full">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                    <div className="text-white">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-medium mb-1">{artwork.title}</h3>
                          <p className="text-xl opacity-90 mb-4">by {artwork.artist}</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-gallery-accent font-bold text-sm">{artwork.price}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div>
                          <p className="text-xs text-white/70">Medium</p>
                          <p className="text-sm">{artwork.medium}</p>
                        </div>
                        <div>
                          <p className="text-xs text-white/70">Dimensions</p>
                          <p className="text-sm">{artwork.dimensions}</p>
                        </div>
                        <div>
                          <p className="text-xs text-white/70">Bids</p>
                          <p className="text-sm">{artwork.bids}</p>
                        </div>
                        <div>
                          <p className="text-xs text-white/70">Time Left</p>
                          <p className="text-sm">{artwork.timeLeft}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="bg-gallery-accent hover:bg-gallery-accent-dark text-white px-6 py-2 rounded-full transition-all transform hover:scale-105 shadow-md text-sm">
                          Place Bid
                        </button>
                        <button className="border border-white hover:border-gallery-accent text-white hover:text-gallery-accent px-6 py-2 rounded-full transition-colors duration-300 text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
              {featuredArtworks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentArtworkIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${currentArtworkIndex === index ? 'bg-gallery-accent w-6' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <SectionDivider variant="wavy" />

      {/* How Our Auctions Work Section */}
      <motion.div 
        ref={processRef}
        initial="hidden"
        animate={processControls}
        variants={fadeIn}
        className="py-16 bg-gradient-to-br from-white to-gallery-beige/10 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/crisp-paper-ruffles.png')] opacity-10"></div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <motion.div 
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-base font-medium text-gallery-accent mb-1 tracking-widest">OUR PROCESS</h2>
            <h3 className="text-3xl md:text-4xl font-medium mb-4 font-serif relative inline-block">
              <span className="relative z-10">How Our Premium Auctions Work</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gallery-accent/30 z-0"></span>
            </h3>
            <p className="text-lg text-center text-gallery-text/70 max-w-2xl mx-auto">
              A sophisticated, transparent process designed to maximize value for artists and collectors
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            {[
              {
                title: "Curated Listing Process",
                icon: <Award className="text-gallery-accent" size={20} />,
                content: "Our expert curators work with artists to create stunning listings with professional photography, detailed descriptions, and optimal reserve pricing. Each piece undergoes authentication and quality verification before being presented to our global collector base.",
                features: ["Professional photography", "Expert curation", "Quality authentication"]
              },
              {
                title: "Competitive Bidding Experience",
                icon: <Gavel className="text-gallery-accent" size={20} />,
                content: "Auctions run for 7-14 days with real-time bidding updates. Our platform generates excitement with countdown timers, bid notifications, and collector interest indicators. The transparent system shows current high bids while protecting bidder identities until closing.",
                features: ["Real-time updates", "Countdown timers", "Bid notifications"]
              },
              {
                title: "Seamless Transaction & Delivery",
                icon: <Globe className="text-gallery-accent" size={20} />,
                content: "When the auction concludes, we facilitate secure payment through multiple methods and handle all shipping logistics with white-glove service. Artists receive prompt payment after collector approval, while collectors benefit from our authenticity guarantee and professional packaging.",
                features: ["Secure payments", "Global shipping", "White-glove service"]
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="mb-6 last:mb-0"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`flex items-center justify-between w-full p-6 text-left bg-white rounded-xl shadow-md hover:shadow-lg transition-all ${activeAccordion === index ? 'border border-gallery-accent' : 'border border-gallery-beige/50'}`}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gallery-accent/10 rounded-full flex items-center justify-center mr-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-medium">{item.title}</h3>
                  </div>
                  {activeAccordion === index ? (
                    <ChevronUp className="text-gallery-accent" size={24} />
                  ) : (
                    <ChevronDown className="text-gallery-accent" size={24} />
                  )}
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: activeAccordion === index ? 'auto' : 0,
                    opacity: activeAccordion === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white p-6 rounded-b-xl border border-t-0 border-gallery-beige/50 shadow-sm">
                    <p className="text-gallery-text/80 mb-4 text-base">{item.content}</p>
                    <div className="grid md:grid-cols-3 gap-3">
                      {item.features.map((feature, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-gallery-beige/10 p-3 rounded-md border border-gallery-beige/20 text-sm"
                        >
                          <div className="text-gallery-accent font-medium">{feature}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <SectionDivider variant="default" />

      {/* Team Section */}
      <motion.div 
        ref={teamRef}
        initial="hidden"
        animate={teamControls}
        variants={fadeIn}
        className="py-16 bg-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-10"></div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-gallery-accent/5 blur-2xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full bg-gallery-accent/10 blur-2xl animate-pulse-slow animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div 
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-base font-medium text-gallery-accent mb-1 tracking-widest">MEET THE EXPERTS</h2>
            <h3 className="text-3xl md:text-4xl font-medium mb-4 font-serif relative inline-block">
              <span className="relative z-10">Our Auction Specialists</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gallery-accent/30 z-0"></span>
            </h3>
            <p className="text-lg text-center text-gallery-text/70 max-w-2xl mx-auto">
              The passionate professionals elevating artists and serving collectors
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                variants={scaleUp}
                className="relative group"
                onMouseEnter={() => setHoveredSpecialist(index)}
                onMouseLeave={() => setHoveredSpecialist(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-gallery-accent/10 to-gallery-beige/10 rounded-xl transition-all duration-500 ${hoveredSpecialist === index ? 'opacity-100 scale-105' : 'opacity-0 scale-95'}`}></div>
                
                <div className={`relative bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 ${hoveredSpecialist === index ? 'transform -translate-y-2 shadow-lg' : ''}`}>
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`w-full h-full object-cover transition-transform duration-700 ${hoveredSpecialist === index ? 'scale-110' : 'scale-100'}`}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6`}>
                      <div>
                        <h4 className="text-xl font-medium text-white mb-1">{member.name}</h4>
                        <p className="text-gallery-beige text-xs mb-2">{member.title}</p>
                        <div className="h-px w-full bg-gallery-beige/50 mb-3"></div>
                        <ul className="text-white/90 text-xs space-y-1 mb-4">
                          {member.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-gallery-accent mr-1">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                        <button className="text-xs text-white hover:text-gallery-accent transition-colors duration-300 flex items-center">
                          Contact Specialist <ArrowRight className="ml-1" size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-medium mb-1 group-hover:text-gallery-accent transition-colors duration-300">{member.name}</h4>
                    <p className="text-xs text-gallery-accent uppercase tracking-wider mb-2">{member.title}</p>
                    <p className="text-xs text-gallery-text/60 mb-3">{member.expertise}</p>
                    <div className="h-px w-12 bg-gallery-beige/50 group-hover:bg-gallery-accent transition-colors duration-300"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <SectionDivider variant="dots" />

      {/* Enhanced Auction Success Section */}
      <motion.div 
        ref={successRef}
        initial="hidden"
        animate={successControls}
        variants={fadeIn}
        className="py-16 bg-gradient-to-br from-gallery-beige/20 to-gallery-accent/10 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] opacity-10"></div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-gallery-accent/5 blur-xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gallery-accent/10 blur-xl animate-pulse-slow animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-gallery-accent/15 blur-lg animate-pulse-slow animation-delay-3000"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div 
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-base font-medium text-gallery-accent mb-1 tracking-widest">TRANSFORMATIVE RESULTS</h2>
            <h3 className="text-3xl md:text-4xl font-medium mb-4 font-serif relative inline-block">
              <span className="relative z-10">Auction Success Stories</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gallery-accent/30 z-0"></span>
            </h3>
            <p className="text-lg text-center text-gallery-text/70 max-w-2xl mx-auto">
              Discover how our auction platform has elevated artists' careers and connected them with serious collectors
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid lg:grid-cols-3 gap-6 mb-10"
          >
            {[
              {
                title: "Average Price Increase",
                value: "142%",
                description: "for artists after 3 auctions",
                icon: <TrendingUp className="text-gallery-accent" size={24} />,
                decoration: "✨"
              },
              {
                title: "Repeat Collectors",
                value: "78%",
                description: "of buyers return for multiple auctions",
                icon: <Repeat className="text-gallery-accent" size={24} />,
                decoration: "🔄"
              },
              {
                title: "International Reach",
                value: "92%",
                description: "of auctions attract global bidders",
                icon: <Globe className="text-gallery-accent" size={24} />,
                decoration: "🌐"
              }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={scaleUp}
                className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-white hover:border-gallery-accent/20 group overflow-hidden relative"
              >
                <div className="absolute -top-3 -right-3 text-4xl opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  {stat.decoration}
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gallery-accent/10 rounded-full flex items-center justify-center mr-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-lg font-medium group-hover:text-gallery-accent transition-colors duration-300">
                    {stat.title}
                  </h3>
                </div>
                <div className="pl-16">
                  <div className="text-4xl md:text-5xl font-bold text-gallery-accent mb-2 animate-count-up">
                    {stat.value}
                  </div>
                  <p className="text-gallery-text/80 text-sm">{stat.description}</p>
                </div>
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 border border-transparent group-hover:border-gallery-accent/30 transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            variants={fadeIn}
            className="relative min-h-[500px]"
          >
            <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-20">
              <button 
                onClick={() => handleTestimonialNavigation((activeTestimonial - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gallery-accent hover:text-white transition-colors duration-300"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            
            <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-20">
              <button 
                onClick={() => handleTestimonialNavigation((activeTestimonial + 1) % testimonials.length)}
                className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gallery-accent hover:text-white transition-colors duration-300"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index === 0 ? 50 : -50 }}
                animate={{ 
                  opacity: activeTestimonial === index ? 1 : 0,
                  x: activeTestimonial === index ? 0 : (index > activeTestimonial ? 50 : -50),
                  zIndex: activeTestimonial === index ? 10 : 0
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`absolute inset-0 ${isTransitioning ? 'opacity-0' : ''}`}
              >
                <div className="flex flex-col lg:flex-row gap-8 h-full">
                  <div className="lg:w-1/2 h-full">
                    <div className="relative h-full rounded-xl overflow-hidden shadow-lg group">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-8">
                        <div>
                          <h3 className="text-2xl font-medium text-white mb-1">{testimonial.name}</h3>
                          <p className="text-gallery-beige text-sm mb-4">{testimonial.title}</p>
                          <div className="flex gap-3 mb-6">
                            <span className="text-xs text-white/80 bg-gallery-accent/30 px-3 py-1 rounded-full">
                              {testimonial.medium}
                            </span>
                            <span className="text-xs text-white/80 bg-gallery-accent/30 px-3 py-1 rounded-full">
                              {testimonial.location}
                            </span>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                            <div className="text-base font-bold text-gallery-accent mb-0.5">{testimonial.result}</div>
                            <div className="text-xs text-white">{testimonial.increase}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2 h-full flex flex-col justify-center">
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gallery-beige/50 h-full flex flex-col justify-center relative">
                      <Quote className="absolute top-6 left-6 text-gallery-beige/20 w-12 h-12" />
                      <div className="relative z-10">
                        <p className="text-gallery-text/80 italic text-base leading-relaxed mb-6">
                          "{testimonial.quote}"
                        </p>
                        
                        <div className="mt-8">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-gallery-beige/50"></div>
                            <div className="text-xs text-gallery-text/60 uppercase tracking-wider">
                              Auction Highlights
                            </div>
                            <div className="flex-1 h-px bg-gallery-beige/50"></div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="bg-gallery-beige/10 p-4 rounded-lg border border-gallery-beige/20"
                            >
                              <div className="text-xl font-bold text-gallery-accent mb-1">₱{Math.floor(Math.random() * 500) + 100}K</div>
                              <div className="text-xs text-gallery-text/70">Highest Bid</div>
                            </motion.div>
                            <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="bg-gallery-beige/10 p-4 rounded-lg border border-gallery-beige/20"
                            >
                              <div className="text-xl font-bold text-gallery-accent mb-1">{Math.floor(Math.random() * 20) + 5}</div>
                              <div className="text-xs text-gallery-text/70">Bidders</div>
                            </motion.div>
                            <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="bg-gallery-beige/10 p-4 rounded-lg border border-gallery-beige/20"
                            >
                              <div className="text-xl font-bold text-gallery-accent mb-1">{Math.floor(Math.random() * 300) + 50}%</div>
                              <div className="text-xs text-gallery-text/70">Over Reserve</div>
                            </motion.div>
                            <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                              className="bg-gallery-beige/10 p-4 rounded-lg border border-gallery-beige/20"
                            >
                              <div className="text-xl font-bold text-gallery-accent mb-1">{Math.floor(Math.random() * 15) + 3}</div>
                              <div className="text-xs text-gallery-text/70">Countries</div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleTestimonialNavigation(index)}
                  className={`w-2 h-2 rounded-full transition-all ${activeTestimonial === index ? 'bg-gallery-accent w-4' : 'bg-gallery-beige/50'}`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div 
            variants={fadeIn}
            className="mt-12 text-center"
          >
            <button className="inline-flex items-center justify-center bg-gradient-to-r from-gallery-accent to-gallery-accent-dark text-white px-10 py-4 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl group text-sm">
              <span className="mr-3 text-base font-medium">Begin Your Success Story</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={16} />
            </button>
          </motion.div>
        </div>
      </motion.div>

      <SectionDivider variant="wavy" />

      {/* Contact Section */}
      <motion.div 
        ref={contactRef}
        initial="hidden"
        animate={contactControls}
        variants={fadeIn}
        className="py-16 bg-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/crisp-paper-ruffles.png')] opacity-10"></div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <motion.div 
            variants={scaleUp}
            className="bg-white rounded-xl overflow-hidden shadow-lg border border-gallery-beige/50"
          >
            <div className="p-8">
              <h2 className="text-3xl font-medium mb-8 text-center">Connect With Our Auction Team</h2>
              
              <motion.div 
                variants={staggerContainer}
                className="grid md:grid-cols-2 gap-8 mb-8"
              >
                <motion.div variants={fadeIn} className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gallery-accent/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Mail className="text-gallery-accent" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Email</h3>
                      <p className="text-gallery-text/80 text-sm">
                        support@artauctions.ph<br />
                        artists@artauctions.ph
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gallery-accent/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Clock className="text-gallery-accent" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Auction Support</h3>
                      <p className="text-gallery-text/80 text-sm">
                        Monday - Friday: 9:00 AM - 8:00 PM<br />
                        Saturday: 10:00 AM - 6:00 PM<br />
                        Philippine Standard Time
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gallery-accent/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Phone className="text-gallery-accent" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Contact</h3>
                      <p className="text-gallery-text/80 text-sm">
                        +63 (2) 8555-0123 (Landline)<br />
                        +63 (917) 555-0124 (Mobile)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gallery-accent/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Globe className="text-gallery-accent" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Social Media</h3>
                      <p className="text-gallery-text/80 text-sm">
                        @ArtAuctionsPH (Facebook/Instagram)<br />
                        @ArtAuctionPH (Twitter)
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div 
                variants={fadeIn}
                className="mt-8"
              >
                <h3 className="text-xl font-medium mb-6 text-center">Have Auction Questions?</h3>
                <form className="grid md:grid-cols-2 gap-6">
                  <motion.div variants={fadeIn}>
                    <label htmlFor="name" className="block text-xs font-medium text-gallery-text/80 mb-1">Name</label>
                    <input type="text" id="name" className="w-full px-4 py-2 border border-gallery-beige/50 rounded-lg focus:ring-gallery-accent focus:border-gallery-accent text-sm" />
                  </motion.div>
                  <motion.div variants={fadeIn}>
                    <label htmlFor="email" className="block text-xs font-medium text-gallery-text/80 mb-1">Email</label>
                    <input type="email" id="email" className="w-full px-4 py-2 border border-gallery-beige/50 rounded-lg focus:ring-gallery-accent focus:border-gallery-accent text-sm" />
                  </motion.div>
                  <motion.div variants={fadeIn} className="md:col-span-2">
                    <label htmlFor="subject" className="block text-xs font-medium text-gallery-text/80 mb-1">Subject</label>
                    <input type="text" id="subject" className="w-full px-4 py-2 border border-gallery-beige/50 rounded-lg focus:ring-gallery-accent focus:border-gallery-accent text-sm" />
                  </motion.div>
                  <motion.div variants={fadeIn} className="md:col-span-2">
                    <label htmlFor="message" className="block text-xs font-medium text-gallery-text/80 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full px-4 py-2 border border-gallery-beige/50 rounded-lg focus:ring-gallery-accent focus:border-gallery-accent text-sm"
                    ></textarea>
                  </motion.div>
                  <motion.div 
                    variants={fadeIn}
                    className="md:col-span-2 text-center"
                  >
                    <button type="submit" className="bg-gradient-to-r from-gallery-accent to-gallery-accent-dark text-white px-10 py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg text-sm font-medium">
                      Send Message
                    </button>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;