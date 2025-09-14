import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Users, Info, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BoudLogo } from '@/components/BoudLogo';
import { PatternBackground } from '@/components/PatternBackground';

const NitaqatCalculatorPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [sector, setSector] = useState<string>('');
  const [saudiEmployees, setSaudiEmployees] = useState<number>(0);
  const [totalEmployees, setTotalEmployees] = useState<number>(0);

  const saudizationRate = totalEmployees > 0 ? (saudiEmployees / totalEmployees) * 100 : 0;

  const getNitaqatLevel = (sector: string, rate: number, total: number) => {
    // Simplified Nitaqat calculation for demonstration
    const levels = {
      'construction': {
        platinum: 12, green: 10, yellow: 8, red: 0
      },
      'retail': {
        platinum: 25, green: 20, yellow: 15, red: 0
      },
      'manufacturing': {
        platinum: 35, green: 30, yellow: 25, red: 0
      },
      'services': {
        platinum: 45, green: 40, yellow: 35, red: 0
      }
    };

    if (!sector || !(sector in levels)) return { level: 'غير محدد', color: 'gray', description: '' };

    const thresholds = levels[sector as keyof typeof levels];
    
    if (rate >= thresholds.platinum) {
      return { 
        level: isArabic ? 'بلاتيني' : 'Platinum', 
        color: 'purple', 
        description: isArabic ? 'أعلى مستوى امتثال' : 'Highest compliance level' 
      };
    } else if (rate >= thresholds.green) {
      return { 
        level: isArabic ? 'أخضر' : 'Green', 
        color: 'green', 
        description: isArabic ? 'مستوى جيد' : 'Good level' 
      };
    } else if (rate >= thresholds.yellow) {
      return { 
        level: isArabic ? 'أصفر' : 'Yellow', 
        color: 'yellow', 
        description: isArabic ? 'مستوى متوسط' : 'Medium level' 
      };
    } else {
      return { 
        level: isArabic ? 'أحمر' : 'Red', 
        color: 'red', 
        description: isArabic ? 'مستوى منخفض' : 'Low level' 
      };
    }
  };

  const nitaqatResult = getNitaqatLevel(sector, saudizationRate, totalEmployees);

  const sectors = [
    { value: 'construction', label: isArabic ? 'الإنشاءات' : 'Construction' },
    { value: 'retail', label: isArabic ? 'التجارة' : 'Retail' },
    { value: 'manufacturing', label: isArabic ? 'التصنيع' : 'Manufacturing' },
    { value: 'services', label: isArabic ? 'الخدمات' : 'Services' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PatternBackground opacity={0.02} size={120} />
      
      {/* Header */}
      <header className="relative z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link to="/hr-tools" className="flex items-center space-x-2 space-x-reverse text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>{isArabic ? 'العودة للأدوات' : 'Back to Tools'}</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <BoudLogo variant="icon" size="md" />
              <h1 className="text-lg font-semibold">
                {isArabic ? 'حاسبة النطاقات' : 'Nitaqat Calculator'}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {isArabic ? 'حاسبة النطاقات' : 'Nitaqat Calculator'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {isArabic 
                ? 'احسب مستوى نطاق منشأتك ونسبة السعودة المطلوبة'
                : 'Calculate your establishment\'s Nitaqat level and required Saudization ratio'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  {isArabic ? 'بيانات المنشأة' : 'Establishment Data'}
                </CardTitle>
                <CardDescription>
                  {isArabic 
                    ? 'أدخل بيانات المنشأة وعدد الموظفين'
                    : 'Enter establishment data and employee count'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>{isArabic ? 'القطاع' : 'Sector'}</Label>
                  <Select value={sector} onValueChange={setSector}>
                    <SelectTrigger>
                      <SelectValue placeholder={isArabic ? 'اختر القطاع' : 'Select sector'} />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map(s => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="saudi-employees">
                    {isArabic ? 'عدد الموظفين السعوديين' : 'Number of Saudi Employees'}
                  </Label>
                  <Input
                    id="saudi-employees"
                    type="number"
                    min="0"
                    value={saudiEmployees || ''}
                    onChange={(e) => setSaudiEmployees(Number(e.target.value))}
                    placeholder={isArabic ? 'أدخل عدد الموظفين السعوديين' : 'Enter number of Saudi employees'}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="total-employees">
                    {isArabic ? 'إجمالي عدد الموظفين' : 'Total Number of Employees'}
                  </Label>
                  <Input
                    id="total-employees"
                    type="number"
                    min="0"
                    value={totalEmployees || ''}
                    onChange={(e) => setTotalEmployees(Number(e.target.value))}
                    placeholder={isArabic ? 'أدخل إجمالي عدد الموظفين' : 'Enter total number of employees'}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {isArabic ? 'نتائج النطاق' : 'Nitaqat Results'}
                </CardTitle>
                <CardDescription>
                  {isArabic 
                    ? 'مستوى النطاق ونسبة السعودة'
                    : 'Nitaqat level and Saudization ratio'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">
                    {isArabic ? 'نسبة السعودة:' : 'Saudization Rate:'}
                  </span>
                  <span className="font-semibold">
                    {saudizationRate.toFixed(2)}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">
                    {isArabic ? 'الموظفين السعوديين:' : 'Saudi Employees:'}
                  </span>
                  <span className="font-semibold">
                    {saudiEmployees.toLocaleString('ar-SA')}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">
                    {isArabic ? 'إجمالي الموظفين:' : 'Total Employees:'}
                  </span>
                  <span className="font-semibold">
                    {totalEmployees.toLocaleString('ar-SA')}
                  </span>
                </div>

                {sector && totalEmployees > 0 && (
                  <div className={`p-4 rounded-lg border-2 ${
                    nitaqatResult.color === 'purple' ? 'bg-purple-50 border-purple-200' :
                    nitaqatResult.color === 'green' ? 'bg-green-50 border-green-200' :
                    nitaqatResult.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${
                        nitaqatResult.color === 'purple' ? 'bg-purple-500' :
                        nitaqatResult.color === 'green' ? 'bg-green-500' :
                        nitaqatResult.color === 'yellow' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} />
                      <span className="font-bold text-lg">
                        {isArabic ? 'النطاق:' : 'Nitaqat Level:'} {nitaqatResult.level}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      nitaqatResult.color === 'purple' ? 'text-purple-700' :
                      nitaqatResult.color === 'green' ? 'text-green-700' :
                      nitaqatResult.color === 'yellow' ? 'text-yellow-700' :
                      'text-red-700'
                    }`}>
                      {nitaqatResult.description}
                    </p>
                  </div>
                )}

                {nitaqatResult.color === 'red' && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-red-700">
                      <p className="font-semibold mb-1">
                        {isArabic ? 'تحذير - النطاق الأحمر' : 'Warning - Red Zone'}
                      </p>
                      <p>
                        {isArabic 
                          ? 'منشأتك في النطاق الأحمر. يُنصح بزيادة عدد الموظفين السعوديين لتحسين مستوى النطاق.'
                          : 'Your establishment is in the red zone. It is recommended to increase the number of Saudi employees to improve the Nitaqat level.'
                        }
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800">
              {isArabic 
                ? '⚠️ هذه النتائج استرشادية ومبسطة. للحصول على التصنيف الدقيق، يُرجى مراجعة بوابة وزارة الموارد البشرية والتنمية الاجتماعية.'
                : '⚠️ These results are indicative and simplified. For accurate classification, please refer to the Ministry of Human Resources and Social Development portal.'
              }
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NitaqatCalculatorPage;