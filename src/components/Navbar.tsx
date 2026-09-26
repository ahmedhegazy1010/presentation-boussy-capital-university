import React, { useState, useEffect } from 'react';
import { Presentation, LayoutList, Download, Maximize2, Minimize2, Loader2, FileDown, Play, Pause } from 'lucide-react';

interface NavbarProps {
  currentSlide: number;
  totalSlides?: number;
  viewMode: 'landing' | 'slides';
  onToggleViewMode: () => void;
  onJumpToSlide: (slideNumber: number) => void;
  onOpenExportModal: () => void;
  isAutoPlay?: boolean;
  onToggleAutoPlay?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  viewMode,
  onToggleViewMode,
  onJumpToSlide,
  onOpenExportModal,
  isAutoPlay = false,
  onToggleAutoPlay,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDownloadingPptx, setIsDownloadingPptx] = useState(false);
  const [pptxStatus, setPptxStatus] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  const handleDownloadPptx = async () => {
    if (isDownloadingPptx) return;
    setIsDownloadingPptx(true);
    try {
      const { generateAndDownloadPptx } = await import('../utils/generatePptx');
      await generateAndDownloadPptx((msg) => setPptxStatus(msg));
    } catch (error) {
      console.error('Failed to download PPTX:', error);
      alert('حدث خطأ أثناء تنزيل ملف البوربوينت. يرجى إعادة المحاولة.');
    } finally {
      setIsDownloadingPptx(false);
      setPptxStatus('');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
        scrolled || viewMode === 'slides'
          ? 'py-2 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200'
          : 'py-3 bg-white/70 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo / Brand */}
        <div
          onClick={() => onJumpToSlide(1)}
          className="cursor-pointer flex items-center gap-2.5"
        >
          <img
            src="./images/capital_university_logo.png"
            alt="جامعة العاصمة"
            className="h-9 w-auto object-contain"
          />
          <div className="text-right">
            <span className="font-black text-xs sm:text-sm text-[#062A5A] block leading-tight">
              جامعة العاصمة • كلية الاقتصاد المنزلي
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              قسم إدارة مؤسسات الأسرة والطفولة • تمهيدي ماجستير
            </span>
          </div>
        </div>

        {/* Actions / View Modes */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <button
            onClick={onToggleViewMode}
            className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-[#062A5A] border border-slate-200 hover:border-[#062A5A] shadow-2xs transition-colors"
            title={viewMode === 'landing' ? 'التبديل إلى وضع الشرائح' : 'التبديل إلى عرض الصفحة'}
          >
            {viewMode === 'landing' ? (
              <>
                <Presentation className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">وضع الشرائح</span>
              </>
            ) : (
              <>
                <LayoutList className="w-3.5 h-3.5 text-[#062A5A]" />
                <span className="hidden sm:inline">عرض الصفحة</span>
              </>
            )}
          </button>

          {/* Auto-Play Slideshow Button */}
          {onToggleAutoPlay && (
            <button
              onClick={onToggleAutoPlay}
              className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs ${
                isAutoPlay
                  ? 'bg-[#062A5A] text-[#D4AF37] border border-[#D4AF37] ring-2 ring-[#D4AF37]/30'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-[#062A5A] hover:text-[#062A5A]'
              }`}
              title={isAutoPlay ? 'إيقاف التحرك التلقائي للشرائح (مسافة)' : 'تشغيل العرض التلقائي كالبوربوينت (مسافة)'}
            >
              {isAutoPlay ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37] animate-pulse" />
                  <span className="hidden md:inline font-bold">إيقاف العرض التلقائي</span>
                  <span className="md:hidden font-bold">إيقاف</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                  <span className="hidden md:inline">عرض تلقائي (Slideshow)</span>
                  <span className="md:hidden">عرض تلقائي</span>
                </>
              )}
            </button>
          )}

          {/* Direct PowerPoint Download Button */}
          <button
            onClick={handleDownloadPptx}
            disabled={isDownloadingPptx}
            className="cursor-pointer flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-black bg-[#D4AF37] hover:bg-[#b89528] text-[#062A5A] shadow-2xs transition-all disabled:opacity-60"
            title="تنزيل العرض التقديمي كملف بوربوينت بصيغة PPTX"
          >
            {isDownloadingPptx ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#062A5A]" />
                <span className="text-[11px] font-bold">{pptxStatus || 'جاري التنزيل...'}</span>
              </>
            ) : (
              <>
                <FileDown className="w-3.5 h-3.5 text-[#062A5A]" />
                <span>تحميل PowerPoint (.pptx)</span>
              </>
            )}
          </button>

          {/* Export / Convert to Slides Button */}
          <button
            onClick={onOpenExportModal}
            className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#062A5A] hover:bg-[#041c3d] text-white shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">خيارات التصدير</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="cursor-pointer p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title={isFullscreen ? 'الخروج من الشاشة الكاملة' : 'ملء الشاشة'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
