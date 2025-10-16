import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  BookOpen, 
  FileText, 
  TrendingUp,
  ExternalLink,
  Download,
  Users,
  Award
} from 'lucide-react';

const tools = [
  {
    slug: "salary-calculator",
    title: "حاسبة الرواتب",
    description: "احسب راتبك الصافي مع جميع البدلات والخصومات",
    icon: Calculator,
    type: "أداة"
  },
  {
    slug: "end-of-service",
    title: "حاسبة مكافأة نهاية الخدمة",
    description: "احسب مكافأة نهاية الخدمة وفقاً لقانون العمل السعودي",
    icon: Award,
    type: "أداة"
  },
  {
    slug: "salary-comparison",
    title: "مقارنة الرواتب",
    description: "قارن رواتب المهن المختلفة في السوق السعودي",
    icon: TrendingUp,
    type: "أداة"
  },
  {
    slug: "hr-glossary",
    title: "قائمة مصطلحات الموارد البشرية",
    description: "دليل شامل لمصطلحات الموارد البشرية باللغة العربية",
    icon: BookOpen,
    type: "دليل"
  }
];

const knowledgeContent = [
  {
    title: "دليل قانون العمل السعودي",
    description: "دليل شامل لجميع قوانين العمل والتأمينات الاجتماعية",
    type: "كتاب إلكتروني",
    downloads: "5,200"
  },
  {
    title: "أفضل ممارسات الموارد البشرية",
    description: "استراتيجيات مجربة لتطوير أقسام الموارد البشرية",
    type: "دراسة حالة",
    downloads: "3,100"
  },
  {
    title: "مؤشرات الأداء الرئيسية في HR",
    description: "كيفية قياس وتحسين أداء قسم الموارد البشرية",
    type: "تقرير",
    downloads: "2,800"
  },
  {
    title: "دليل التحول الرقمي للموارد البشرية",
    description: "خطوات عملية لرقمنة عمليات الموارد البشرية",
    type: "دليل عملي",
    downloads: "4,500"
  }
];

export const KnowledgeSection = () => {
  return (
    <section className="py-20 bg-background text-foreground relative overflow-hidden" dir="rtl">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="currentColor" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>

      {/* Floating Elements for Professional Look */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-32 left-16 w-32 h-32 bg-accent/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 right-20 w-16 h-16 bg-accent/15 rounded-full blur-lg animate-pulse delay-500"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="space-y-16">
          {/* Tools Section */}
          <div className="space-y-8">
            {/* Enhanced Hero Section */}
            <div className="text-center mb-12 relative">
              {/* Floating background elements */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-sm"></div>
              
              <h2 className="text-5xl font-bold mb-8 text-foreground bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent leading-tight">
                <span className="text-foreground">الأدوات </span>
                <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                  التفاعلية
                </span>
              </h2>
              
              <div className="relative max-w-3xl mx-auto">
                <p className="text-muted-foreground text-lg leading-relaxed bg-card backdrop-blur-sm p-6 rounded-2xl border border-border shadow-xl">
                  أدوات مجانية لمساعدتك في حسابات الموارد البشرية والرواتب
                </p>
              </div>
            </div>

            {/* Professional Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {tools.map((tool, index) => (
                <div
                  key={tool.slug}
                  className="group relative overflow-hidden bg-card backdrop-blur-xl rounded-3xl border border-border shadow-2xl hover:shadow-accent/25 transition-all duration-500 hover:scale-105 hover:border-accent cursor-pointer"
                >
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative p-8 space-y-6">
                    {/* Header with icon and badge */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="relative">
                        <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-accent/40 group-hover:border-accent/70 transition-all duration-300">
                          <tool.icon className="w-8 h-8 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                        </div>
                        {/* Animated ring */}
                        <div className="absolute inset-0 rounded-2xl bg-accent/20 opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
                      </div>
                      
                      <Badge className="bg-accent/20 text-accent border border-accent/40 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 text-xs font-semibold">
                        {tool.type}
                      </Badge>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-card-foreground group-hover:text-accent transition-colors duration-300 leading-tight">
                        {tool.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-card-foreground transition-colors duration-300">
                        {tool.description}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Button 
                      className="w-full bg-accent/20 text-accent border border-accent/40 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 font-semibold shadow-lg hover:shadow-accent/25"
                      size="lg"
                    >
                      جرب الآن
                      <ExternalLink className="w-4 h-4 mr-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge Content Section */}
          <div className="space-y-8">
            {/* Enhanced Section Header */}
            <div className="text-center mb-12 relative">
              {/* Floating background elements */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-sm"></div>
              
              <h3 className="text-5xl font-bold mb-8 text-foreground bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent leading-tight">
                المحتوى التعليمي والمعرفي
              </h3>
              
              <div className="relative max-w-3xl mx-auto">
                <p className="text-muted-foreground text-lg leading-relaxed bg-card backdrop-blur-sm p-6 rounded-2xl border border-border shadow-xl">
                  موارد قيّمة ومجانية لتطوير معرفتك في مجال الموارد البشرية
                </p>
              </div>
            </div>

            {/* Professional Knowledge Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              {knowledgeContent.map((content, index) => (
                <div
                  key={content.title}
                  className="group relative overflow-hidden bg-card backdrop-blur-xl rounded-3xl border border-border shadow-2xl hover:shadow-accent/25 transition-all duration-500 hover:scale-105 hover:border-accent cursor-pointer"
                >
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content Header */}
                  <div className="relative p-8 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-xl font-bold text-card-foreground group-hover:text-accent transition-colors duration-300 leading-tight flex-1">
                        {content.title}
                      </h4>
                      <Badge className="bg-accent/20 text-accent border border-accent/40 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 text-xs font-semibold shrink-0 mr-4">
                        {content.type}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Content Body */}
                  <div className="relative px-8 pb-8 space-y-6">
                    <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-card-foreground transition-colors duration-300">
                      {content.description}
                    </p>
                    
                    {/* Footer with stats and CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-card-foreground transition-colors duration-300">
                        <Users className="w-4 h-4 text-accent" />
                        <span className="font-medium">{content.downloads} تحميل</span>
                      </div>
                      
                      <Button 
                        className="bg-accent/20 text-accent border border-accent/40 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 font-semibold shadow-lg hover:shadow-accent/25"
                        size="sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        تحميل
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};