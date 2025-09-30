import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TestimonialCarouselProps {
  currentLanguage: 'ar' | 'en';
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ currentLanguage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      nameAr: 'أحمد المحمد',
      nameEn: 'Ahmed Al-Mohammed',
      positionAr: 'مدير الموارد البشرية',
      positionEn: 'HR Manager',
      companyAr: 'شركة الرياض للتقنية',
      companyEn: 'Riyadh Technology Company',
      textAr: 'نظام بُعد HR غيّر طريقة عملنا بالكامل. الواجهة سهلة والمميزات متقدمة جداً.',
      textEn: 'BOUD HR system completely changed the way we work. The interface is easy and the features are very advanced.',
      rating: 5
    },
    {
      nameAr: 'فاطمة السعيد',
      nameEn: 'Fatima Al-Saeed',
      positionAr: 'مديرة العمليات',
      positionEn: 'Operations Manager',
      companyAr: 'مجموعة الخليج التجارية',
      companyEn: 'Gulf Commercial Group',
      textAr: 'التكامل مع الأنظمة الحكومية وفر علينا وقتاً كبيراً وقلل من الأخطاء.',
      textEn: 'Integration with government systems saved us a lot of time and reduced errors.',
      rating: 5
    },
    {
      nameAr: 'محمد الشمري',
      nameEn: 'Mohammed Al-Shammari',
      positionAr: 'الرئيس التنفيذي',
      positionEn: 'CEO',
      companyAr: 'شركة الابتكار الرقمي',
      companyEn: 'Digital Innovation Company',
      textAr: 'الذكاء الاصطناعي في النظام يساعدنا في اتخاذ قرارات أفضل حول الموظفين.',
      textEn: 'The AI in the system helps us make better decisions about employees.',
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-accent fill-current' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -10 }}
          className="bg-gradient-to-b from-card to-background p-8 rounded-2xl border border-border shadow-2xl"
        >
          <div className="text-center space-y-6">
            <div className="flex justify-center space-x-1 mb-4">
              {renderStars(testimonials[currentIndex].rating)}
            </div>
            
            <blockquote className="text-xl text-gray-300 italic leading-relaxed">
              "{currentLanguage === 'ar' ? testimonials[currentIndex].textAr : testimonials[currentIndex].textEn}"
            </blockquote>
            
            <div className="border-t border-gray-800 pt-6">
              <h4 className="text-lg font-semibold text-white">
                {currentLanguage === 'ar' ? testimonials[currentIndex].nameAr : testimonials[currentIndex].nameEn}
              </h4>
              <p className="text-accent">
                {currentLanguage === 'ar' ? testimonials[currentIndex].positionAr : testimonials[currentIndex].positionEn}
              </p>
              <p className="text-gray-400 text-sm">
                {currentLanguage === 'ar' ? testimonials[currentIndex].companyAr : testimonials[currentIndex].companyEn}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={prevTestimonial}
          className="w-12 h-12 rounded-full border border-border text-foreground hover:bg-accent/20 hover:border-accent"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-accent' : 'bg-muted hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={nextTestimonial}
          className="w-12 h-12 rounded-full border border-border text-foreground hover:bg-accent/20 hover:border-accent"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};