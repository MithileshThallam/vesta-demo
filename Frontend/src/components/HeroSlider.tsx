import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero1 from "/HeroSlider/hero-1.png";
import hero2 from "/HeroSlider/hero-2.png";
import hero3 from "/HeroSlider/hero-3.png";
import hero4 from "/HeroSlider/hero-4.png";
import hero5 from "/HeroSlider/hero-5.png";

const slides = [
  {
    id: 1,
    image: hero1,
    title: "Advanced Diagnostic Excellence",
    subtitle: "Where cutting-edge technology meets precision healthcare",
    description: "Experience the future of medical diagnostics with our state-of-the-art facilities and innovative testing solutions.",
  },
  {
    id: 2,
    image: hero2,
    title: "Global Network, Local Care",
    subtitle: "Connected centers, personalized service",
    description: "Our extensive network of diagnostic centers ensures world-class healthcare is always within your reach.",
  },
  {
    id: 3,
    image: hero3,
    title: "Comprehensive Testing Suite",
    subtitle: "From routine to specialized diagnostics",
    description: "Advanced molecular diagnostics, genetic testing, and AI-powered analysis for accurate, timely results.",
  },
  {
    id: 4,
    image: hero4,
    title: "Expert Medical Professionals",
    subtitle: "Precision diagnostics, expert interpretation",
    description: "Our team of specialists combines years of experience with the latest diagnostic technologies.",
  },
  {
    id: 5,
    image: hero5,
    title: "Data-Driven Healthcare",
    subtitle: "Intelligence that transforms care",
    description: "Harness the power of medical data analytics for better health outcomes and personalized treatment plans.",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set new interval
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, currentSlide]); // Added currentSlide to dependencies

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    // Restart auto-play after manual navigation
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    // Restart auto-play after manual navigation
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Restart auto-play after manual navigation
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative h-screen overflow-hidden bg-white">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
              }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  <h2 className="text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-xl lg:text-2xl text-white/90 mb-4 font-medium">
                    {slide.subtitle}
                  </p>
                  <p className="text-lg lg:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="premium" size="xl" className="text-lg">
                      Get Started
                    </Button>
                    <Button variant="outline" size="xl" className="text-lg bg-white/90 text-text-dark border-white/90 hover:bg-white">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-smooth hover:scale-105"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-smooth hover:scale-105"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-smooth ${index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/70"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full transition-all duration-5000 ease-linear"
          style={{
            width: isAutoPlaying ? `${((currentSlide + 1) / slides.length) * 100}%` : "0%",
            background: 'linear-gradient(90deg, #F05A28 0%, #1A1449 100%)'
          }}
        />
      </div>
    </section>
  );
};

export default HeroSlider;
