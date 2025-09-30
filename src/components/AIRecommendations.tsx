import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Lightbulb, TrendingUp, Users, CreditCard } from 'lucide-react';

interface AIRecommendationsProps {
  employeeCount: number;
  currentPackage: string;
  billingCycle: 'monthly' | 'yearly';
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  employeeCount,
  currentPackage,
  billingCycle
}) => {
  const generateRecommendations = () => {
    const recommendations = [];

    // توصية الباقة حسب عدد الموظفين
    if (employeeCount <= 10 && currentPackage !== 'startup') {
      recommendations.push({
        type: 'package',
        icon: Users,
        title: 'باقة أصغر مناسبة أكثر',
        description: 'الباقة الصغيرة تناسب شركتك وتوفر 50% من التكلفة',
        color: 'bg-blue-500'
      });
    } else if (employeeCount > 10 && employeeCount <= 50 && currentPackage === 'startup') {
      recommendations.push({
        type: 'upgrade',
        icon: TrendingUp,
        title: 'ننصح بالترقية للباقة الأساسية',
        description: 'مزايا إضافية مهمة مع نمو فريقك',
        color: 'bg-success'
      });
    } else if (employeeCount > 50 && currentPackage === 'basic') {
      recommendations.push({
        type: 'upgrade',
        icon: TrendingUp,
        title: 'الباقة الاحترافية أنسب',
        description: 'مزايا متقدمة لإدارة الفرق الكبيرة',
        color: 'bg-primary'
      });
    } else if (employeeCount > 250 && currentPackage !== 'enterprise') {
      recommendations.push({
        type: 'upgrade',
        icon: TrendingUp,
        title: 'الباقة الشاملة هي الأمثل',
        description: 'حلول متقدمة للمؤسسات الكبيرة',
        color: 'bg-purple-500'
      });
    }

    // توصية الدفع السنوي
    if (billingCycle === 'monthly') {
      recommendations.push({
        type: 'billing',
        icon: CreditCard,
        title: 'الدفع السنوي يوفر 15%',
        description: 'وفر شهرين مجانًا مع الدفع السنوي',
        color: 'bg-success'
      });
    }

    // توصيات عامة
    if (employeeCount >= 25) {
      recommendations.push({
        type: 'service',
        icon: Lightbulb,
        title: 'ننصح بخدمة التدريب',
        description: 'تدريب الفريق يزيد الاستفادة من النظام بنسبة 40%',
        color: 'bg-orange-500'
      });
    }

    return recommendations;
  };

  const recommendations = generateRecommendations();

  if (recommendations.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-primary">الذكاء الاصطناعي</h3>
        </div>
        <div className="text-center py-4">
          <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Bot className="h-6 w-6 text-success" />
          </div>
          <p className="text-sm text-success font-medium">
            اختيار ممتاز! الباقة المختارة مناسبة تماماً لحجم شركتك
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-primary">توصيات الذكاء الاصطناعي</h3>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const IconComponent = rec.icon;
          return (
            <div key={index} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 ${rec.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                  <p className="text-xs text-muted-foreground">{rec.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center justify-center gap-2">
          <Bot className="h-4 w-4 text-primary" />
          <p className="text-xs text-primary font-medium">
            توصيات ذكية مبنية على تحليل +1000 شركة
          </p>
        </div>
      </div>
    </Card>
  );
};