import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { SlideController } from './components/SlideController';
import { ExportModal } from './components/ExportModal';

// Slides
import { Slide1Hero } from './components/slides/Slide1Hero';
import { Slide2Introduction } from './components/slides/Slide2Introduction';
import { Slide3Definitions } from './components/slides/Slide3Definitions';
import { Slide4ModernDefinition } from './components/slides/Slide4ModernDefinition';
import { Slide5Characteristics } from './components/slides/Slide5Characteristics';
import { Slide6Importance } from './components/slides/Slide6Importance';
import { Slide7Elements } from './components/slides/Slide7Elements';
import { Slide8ManagementLevels } from './components/slides/Slide8ManagementLevels';
import { Slide9ManagementStyles } from './components/slides/Slide9ManagementStyles';
import { Slide10EvolutionTimeline } from './components/slides/Slide10EvolutionTimeline';
import { Slide11SchoolsOfManagement } from './components/slides/Slide11SchoolsOfManagement';
import { Slide12Conclusion } from './components/slides/Slide12Conclusion';

// Powerful 3D Slide Transition Variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    rotateY: direction > 0 ? 35 : -35,
    scale: 0.85,
    opacity: 0,
    filter: 'blur(8px)',
  }),
  center: {
    x: 0,
    rotateY: 0,
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    rotateY: direction > 0 ? -35 : 35,
    scale: 0.85,
    opacity: 0,
    filter: 'blur(8px)',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'landing' | 'slides'>('slides');
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Auto-play Slideshow State
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [autoPlayProgress, setAutoPlayProgress] = useState<number>(0);

  const totalSlides = 12;
  const slideDurationMs = 7000; // 7 seconds per slide for academic readability

  // Track scroll position in landing mode to update currentSlide
  useEffect(() => {
    if (viewMode !== 'landing') return;

    const handleScroll = () => {
      const slideElements = Array.from({ length: totalSlides }, (_, i) =>
        document.getElementById(`slide-${i + 1}`)
      );

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = slideElements.length - 1; i >= 0; i--) {
        const el = slideElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setCurrentSlide(i + 1);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode, totalSlides]);

  const handleJumpToSlide = useCallback((slideNum: number) => {
    setDirection(slideNum >= currentSlide ? 1 : -1);
    setCurrentSlide(slideNum);
    setAutoPlayProgress(0);
    if (viewMode === 'landing') {
      const el = document.getElementById(`slide-${slideNum}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [currentSlide, viewMode]);

  const handlePrevSlide = useCallback(() => {
    if (currentSlide > 1) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
      setAutoPlayProgress(0);
    } else if (isAutoPlay) {
      setDirection(-1);
      setCurrentSlide(totalSlides);
      setAutoPlayProgress(0);
    }
  }, [currentSlide, isAutoPlay, totalSlides]);

  const handleNextSlide = useCallback(() => {
    if (currentSlide < totalSlides) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
      setAutoPlayProgress(0);
    } else if (isAutoPlay) {
      // Loop back to slide 1 in autoplay
      setDirection(1);
      setCurrentSlide(1);
      setAutoPlayProgress(0);
    }
  }, [currentSlide, isAutoPlay, totalSlides]);

  const handleToggleViewMode = () => {
    const nextMode = viewMode === 'landing' ? 'slides' : 'landing';
    setViewMode(nextMode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Auto-Play slideshow
  const handleToggleAutoPlay = () => {
    if (!isAutoPlay && viewMode === 'landing') {
      // Switch to slides mode automatically so the user sees the PowerPoint slideshow experience
      setViewMode('slides');
    }
    setIsAutoPlay((prev) => !prev);
    setAutoPlayProgress(0);
  };

  // Auto-play timer effect
  useEffect(() => {
    if (!isAutoPlay) {
      setAutoPlayProgress(0);
      return;
    }

    const stepMs = 50;
    const stepPercent = (stepMs / slideDurationMs) * 100;

    const timer = setInterval(() => {
      setAutoPlayProgress((prev) => {
        if (prev >= 100) {
          handleNextSlide();
          return 0;
        }
        return prev + stepPercent;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [isAutoPlay, handleNextSlide, slideDurationMs]);

  // Synchronize scroll in landing mode during auto-play
  useEffect(() => {
    if (!isAutoPlay || viewMode !== 'landing') return;
    const el = document.getElementById(`slide-${currentSlide}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentSlide, isAutoPlay, viewMode]);

  // Slide renderer helper
  const renderSlideContent = (slideNum: number) => {
    switch (slideNum) {
      case 1:
        return <Slide1Hero />;
      case 2:
        return <Slide2Introduction />;
      case 3:
        return <Slide3Definitions />;
      case 4:
        return <Slide4ModernDefinition />;
      case 5:
        return <Slide5Characteristics />;
      case 6:
        return <Slide6Importance />;
      case 7:
        return <Slide7Elements />;
      case 8:
        return <Slide8ManagementLevels />;
      case 9:
        return <Slide9ManagementStyles />;
      case 10:
        return <Slide10EvolutionTimeline />;
      case 11:
        return <Slide11SchoolsOfManagement />;
      case 12:
        return (
          <Slide12Conclusion
            onOpenExportModal={() => setIsExportModalOpen(true)}
            onRestart={() => handleJumpToSlide(1)}
          />
        );
      default:
        return <Slide1Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-cairo selection:bg-[#D4AF37] selection:text-[#062A5A] relative">
      {/* Top Auto-Play Progress Bar */}
      {isAutoPlay && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200/40 z-50 overflow-hidden no-print">
          <div
            className="h-full bg-linear-to-r from-[#062A5A] via-[#D4AF37] to-[#062A5A] transition-all duration-75 ease-linear shadow-xs"
            style={{ width: `${autoPlayProgress}%` }}
          />
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        viewMode={viewMode}
        onToggleViewMode={handleToggleViewMode}
        onJumpToSlide={handleJumpToSlide}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        isAutoPlay={isAutoPlay}
        onToggleAutoPlay={handleToggleAutoPlay}
      />

      {/* Main Content Area */}
      <main className="w-full">
        {viewMode === 'landing' ? (
          /* Continuous Scrollable Landing Page Mode */
          <div className="flex flex-col">
            <Slide1Hero />
            <Slide2Introduction />
            <Slide3Definitions />
            <Slide4ModernDefinition />
            <Slide5Characteristics />
            <Slide6Importance />
            <Slide7Elements />
            <Slide8ManagementLevels />
            <Slide9ManagementStyles />
            <Slide10EvolutionTimeline />
            <Slide11SchoolsOfManagement />
            <Slide12Conclusion
              onOpenExportModal={() => setIsExportModalOpen(true)}
              onRestart={() => handleJumpToSlide(1)}
            />
          </div>
        ) : (
          /* Full Screen Responsive Edge-to-Edge Presentation Stage with 3D Transitions */
          <div className="h-screen w-full overflow-hidden bg-slate-50 pt-16 pb-16 relative flex flex-col justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full absolute inset-0 pt-16 pb-16 px-4 sm:px-8 lg:px-12 flex flex-col justify-center items-center origin-center overflow-y-auto"
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                <div className="w-full max-w-[1600px] my-auto flex flex-col justify-center">
                  {renderSlideContent(currentSlide)}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Floating Bottom Slide Controller */}
      <SlideController
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onPrev={handlePrevSlide}
        onNext={handleNextSlide}
        onSelectSlide={handleJumpToSlide}
        viewMode={viewMode}
        isAutoPlay={isAutoPlay}
        onToggleAutoPlay={handleToggleAutoPlay}
        autoPlayProgress={autoPlayProgress}
      />

      {/* Export to Slides / PowerPoint Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}

export default App;
