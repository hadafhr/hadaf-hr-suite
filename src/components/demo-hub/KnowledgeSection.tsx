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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="space-y-16">
          {/* Tools Section */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold">
                <span className="text-foreground">الأدوات </span>
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  التفاعلية
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                أدوات مجانية لمساعدتك في حسابات الموارد البشرية والرواتب
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map((tool, index) => (
                <Card 
                  key={tool.slug} 
                  className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-border/50 hover:border-primary/30"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-xl flex items-center justify-center">
                        <tool.icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {tool.type}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                    >
                      جرب الآن
                      <ExternalLink className="w-4 h-4 mr-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Knowledge Content Section */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                المحتوى التعليمي والمعرفي
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                موارد قيّمة ومجانية لتطوير معرفتك في مجال الموارد البشرية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {knowledgeContent.map((content, index) => (
                <Card 
                  key={content.title} 
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {content.title}
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        {content.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {content.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {content.downloads} تحميل
                      </div>
                      
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        تحميل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};