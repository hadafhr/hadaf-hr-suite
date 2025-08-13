import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { 
  PlayCircle,
  RotateCcw,
  Share,
  Save,
  Brain,
  Target,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Lightbulb,
  Users,
  BarChart3
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  currentScore: number;
  potential: number;
  performance: number;
  components: {
    kpi: number;
    mbo: number;
    bsc: number;
    continuous: number;
    assessment: number;
    rating360: number;
  };
  quadrant: string;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  changes: {
    [key: string]: number; // component changes
  };
  weightChanges: {
    [key: string]: number; // weight adjustments
  };
  predictedScore: number;
  predictedQuadrant: string;
  impact: string;
  createdAt: string;
  status: 'draft' | 'saved' | 'shared';
}

export const WhatIfSimulator = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedEmployee, setSelectedEmployee] = useState<string>('1');
  const [isSimulating, setIsSimulating] = useState(false);
  const [showAIAdvice, setShowAIAdvice] = useState(false);

  // Demo employees data
  const [employees] = useState<Employee[]>([
    {
      id: '1',
      name: isRTL ? 'أحمد محمد' : 'Ahmed Mohammed',
      position: isRTL ? 'مطور برمجيات أول' : 'Senior Software Developer',
      department: 'IT',
      currentScore: 78,
      potential: 75,
      performance: 78,
      components: { kpi: 80, mbo: 75, bsc: 78, continuous: 79, assessment: 77, rating360: 78 },
      quadrant: 'medium-high'
    },
    {
      id: '2',
      name: isRTL ? 'فاطمة علي' : 'Fatima Ali',
      position: isRTL ? 'مديرة المشاريع' : 'Project Manager',
      department: 'Operations',
      currentScore: 72,
      potential: 80,
      performance: 72,
      components: { kpi: 70, mbo: 74, bsc: 72, continuous: 73, assessment: 75, rating360: 71 },
      quadrant: 'high-medium'
    }
  ]);

  // Default weights
  const [weights, setWeights] = useState({
    kpi: 30,
    mbo: 20,
    bsc: 10,
    continuous: 10,
    assessment: 10,
    rating360: 20
  });

  // Scenario adjustments
  const [adjustments, setAdjustments] = useState({
    kpi: 0,
    mbo: 0,
    bsc: 0,
    continuous: 0,
    assessment: 0,
    rating360: 0
  });

  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);

  const selectedEmp = employees.find(emp => emp.id === selectedEmployee);

  const calculateScore = (components: any, currentWeights: any) => {
    return Math.round(
      Object.entries(currentWeights).reduce((sum, [key, weight]) => {
        return sum + (components[key] * (weight as number) / 100);
      }, 0)
    );
  };

  const getQuadrant = (potential: number, performance: number) => {
    if (performance >= 80 && potential >= 80) return 'high-high';
    if (performance >= 80 && potential < 80) return 'high-medium';
    if (performance < 80 && potential >= 80) return 'medium-high';
    return 'medium-medium';
  };

  const getQuadrantLabel = (quadrant: string) => {
    switch (quadrant) {
      case 'high-high': return isRTL ? 'قادة المستقبل' : 'Future Leaders';
      case 'high-medium': return isRTL ? 'قادة حاليون' : 'Current Leaders';
      case 'medium-high': return isRTL ? 'نجوم صاعدة' : 'Rising Stars';
      case 'medium-medium': return isRTL ? 'مؤدون قويون' : 'Solid Performers';
      default: return isRTL ? 'غير محدد' : 'Unknown';
    }
  };

  const handleAdjustmentChange = (component: string, value: number) => {
    setAdjustments(prev => ({
      ...prev,
      [component]: value
    }));
  };

  const handleWeightChange = (component: string, value: number) => {
    setWeights(prev => ({
      ...prev,
      [component]: value
    }));
  };

  const handleRunSimulation = () => {
    if (!selectedEmp) return;

    setIsSimulating(true);

    setTimeout(() => {
      const adjustedComponents = Object.entries(selectedEmp.components).reduce((acc, [key, value]) => {
        acc[key] = Math.max(0, Math.min(100, value + adjustments[key as keyof typeof adjustments]));
        return acc;
      }, {} as any);

      const newScore = calculateScore(adjustedComponents, weights);
      const newQuadrant = getQuadrant(selectedEmp.potential, newScore);

      const scenario: Scenario = {
        id: Date.now().toString(),
        name: `${isRTL ? 'سيناريو' : 'Scenario'} ${scenarios.length + 1}`,
        description: isRTL ? 'محاكاة تعديلات النتائج والأوزان' : 'Simulation with score and weight adjustments',
        changes: { ...adjustments },
        weightChanges: { ...weights },
        predictedScore: newScore,
        predictedQuadrant: newQuadrant,
        impact: newScore > selectedEmp.currentScore ? 'positive' : newScore < selectedEmp.currentScore ? 'negative' : 'neutral',
        createdAt: new Date().toISOString(),
        status: 'draft'
      };

      setCurrentScenario(scenario);
      setIsSimulating(false);
    }, 1500);
  };

  const handleGetAIAdvice = () => {
    setShowAIAdvice(true);
  };

  const handleSaveScenario = () => {
    if (currentScenario) {
      setScenarios(prev => [...prev, { ...currentScenario, status: 'saved' }]);
      console.log('Scenario saved');
    }
  };

  const handleShareScenario = () => {
    if (currentScenario) {
      const shareableLink = `${window.location.origin}/smart-evaluations/scenario/${currentScenario.id}`;
      console.log('Shareable link:', shareableLink);
      navigator.clipboard.writeText(shareableLink);
    }
  };

  const handleResetSimulation = () => {
    setAdjustments({
      kpi: 0,
      mbo: 0,
      bsc: 0,
      continuous: 0,
      assessment: 0,
      rating360: 0
    });
    setWeights({
      kpi: 30,
      mbo: 20,
      bsc: 10,
      continuous: 10,
      assessment: 10,
      rating360: 20
    });
    setCurrentScenario(null);
    setShowAIAdvice(false);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return TrendingUp;
      case 'negative': return TrendingDown;
      default: return Target;
    }
  };

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {isRTL ? 'محاكي ماذا لو' : 'What-If Simulator'}
          </h2>
          <p className="text-muted-foreground">
            {isRTL ? 'محاكاة تغييرات النتائج والأوزان لرؤية التأثير المحتمل' : 'Simulate score and weight changes to see potential impact'}
          </p>
        </div>
        
        <div className="flex gap-3">
          <select 
            value={selectedEmployee} 
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.name} - {emp.position}
              </option>
            ))}
          </select>
          <Button onClick={handleResetSimulation} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            {isRTL ? 'إعادة تعيين' : 'Reset'}
          </Button>
        </div>
      </div>

      {selectedEmp && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current State */}
          <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                {isRTL ? 'الحالة الحالية' : 'Current State'}
              </CardTitle>
              <CardDescription>{selectedEmp.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {selectedEmp.currentScore}
                  </div>
                  <Badge variant="outline">{getQuadrantLabel(selectedEmp.quadrant)}</Badge>
                </div>
                
                <div className="space-y-3">
                  {Object.entries(selectedEmp.components).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium uppercase">{key}</span>
                        <span className="text-sm text-muted-foreground">{value}</span>
                      </div>
                      <Progress value={value} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Simulation Results */}
          <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-primary" />
                {isRTL ? 'نتائج المحاكاة' : 'Simulation Results'}
              </CardTitle>
              <CardDescription>
                {currentScenario ? (isRTL ? 'النتائج المتوقعة' : 'Predicted Results') : (isRTL ? 'قم بتشغيل المحاكاة' : 'Run simulation to see results')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSimulating ? (
                <div className="text-center py-8">
                  <div className="animate-spin mb-4">
                    <Brain className="w-8 h-8 text-primary mx-auto" />
                  </div>
                  <p className="text-muted-foreground">{isRTL ? 'جاري المحاكاة...' : 'Running simulation...'}</p>
                </div>
              ) : currentScenario ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${getImpactColor(currentScenario.impact)}`}>
                      {currentScenario.predictedScore}
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {React.createElement(getImpactIcon(currentScenario.impact), { 
                        className: `w-4 h-4 ${getImpactColor(currentScenario.impact)}` 
                      })}
                      <span className={`text-sm font-medium ${getImpactColor(currentScenario.impact)}`}>
                        {currentScenario.predictedScore - selectedEmp.currentScore > 0 ? '+' : ''}
                        {currentScenario.predictedScore - selectedEmp.currentScore}
                      </span>
                    </div>
                    <Badge variant="outline">{getQuadrantLabel(currentScenario.predictedQuadrant)}</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {Object.entries(selectedEmp.components).map(([key, value]) => {
                      const adjustment = adjustments[key as keyof typeof adjustments];
                      const adjustedValue = Math.max(0, Math.min(100, value + adjustment));
                      
                      return (
                        <div key={key} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium uppercase">{key}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">{value}</span>
                              <ArrowRight className="w-3 h-3 text-muted-foreground" />
                              <span className={`text-sm font-medium ${adjustment !== 0 ? getImpactColor(adjustment > 0 ? 'positive' : 'negative') : 'text-muted-foreground'}`}>
                                {adjustedValue}
                              </span>
                            </div>
                          </div>
                          <Progress value={adjustedValue} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {isRTL ? 'قم بتعديل القيم أدناه ثم اضغط "تشغيل المحاكاة"' : 'Adjust values below and click "Run Simulation"'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Simulation Controls */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            {isRTL ? 'ضوابط المحاكاة' : 'Simulation Controls'}
          </CardTitle>
          <CardDescription>
            {isRTL ? 'قم بتعديل نتائج المكونات والأوزان لرؤية التأثير' : 'Adjust component scores and weights to see impact'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Component Adjustments */}
            <div>
              <h3 className="font-semibold mb-4">{isRTL ? 'تعديلات النتائج' : 'Score Adjustments'}</h3>
              <div className="space-y-4">
                {Object.entries(adjustments).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label className="flex justify-between">
                      <span className="uppercase font-medium">{key}</span>
                      <span className={`text-sm ${value > 0 ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
                        {value > 0 ? '+' : ''}{value}
                      </span>
                    </Label>
                    <Slider
                      value={[value]}
                      onValueChange={(values) => handleAdjustmentChange(key, values[0])}
                      min={-20}
                      max={20}
                      step={1}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Weight Adjustments */}
            <div>
              <h3 className="font-semibold mb-4">{isRTL ? 'تعديلات الأوزان' : 'Weight Adjustments'}</h3>
              <div className="space-y-4">
                {Object.entries(weights).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label className="flex justify-between">
                      <span className="uppercase font-medium">{key}</span>
                      <span className="text-sm text-muted-foreground">{value}%</span>
                    </Label>
                    <Slider
                      value={[value]}
                      onValueChange={(values) => handleWeightChange(key, values[0])}
                      min={0}
                      max={50}
                      step={5}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'إجمالي الأوزان' : 'Total Weight'}: {Object.values(weights).reduce((sum, w) => sum + w, 0)}%
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t">
            <Button 
              onClick={handleRunSimulation} 
              disabled={isSimulating}
              className="gap-2"
            >
              <PlayCircle className="w-4 h-4" />
              {isSimulating ? (isRTL ? 'جاري التشغيل...' : 'Running...') : (isRTL ? 'تشغيل المحاكاة' : 'Run Simulation')}
            </Button>
            
            {currentScenario && (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleGetAIAdvice}
                  className="gap-2"
                >
                  <Brain className="w-4 h-4" />
                  {isRTL ? 'نصيحة الذكاء الاصطناعي' : 'AI Advice'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleSaveScenario}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isRTL ? 'حفظ السيناريو' : 'Save Scenario'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleShareScenario}
                  className="gap-2"
                >
                  <Share className="w-4 h-4" />
                  {isRTL ? 'مشاركة' : 'Share'}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI Advice */}
      {showAIAdvice && currentScenario && selectedEmp && (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Lightbulb className="w-5 h-5" />
              {isRTL ? 'نصيحة الذكاء الاصطناعي' : 'AI Advisor Recommendations'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-blue-800">
              <div className="p-4 bg-white/60 rounded-lg">
                <h4 className="font-semibold mb-2">{isRTL ? 'لتحريك هذا الموظف إلى "مؤد قوي"' : 'To move this employee to "Solid Performer"'}:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• {isRTL ? 'زيادة نتيجة KPI بنسبة 8%' : 'Increase KPI score by 8%'}</li>
                  <li>• {isRTL ? 'أو تحسين التعاون بـ +0.4' : 'OR improve Collaboration by +0.4'}</li>
                  <li>• {isRTL ? 'التركيز على تطوير مهارات التواصل' : 'Focus on communication skills development'}</li>
                </ul>
              </div>
              
              <div className="p-4 bg-white/60 rounded-lg">
                <h4 className="font-semibold mb-2">{isRTL ? 'المسار الأمثل للتطوير' : 'Optimal Development Path'}:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• {isRTL ? 'الأولوية العالية: تحسين نتيجة 360' : 'High Priority: Improve 360 score'}</li>
                  <li>• {isRTL ? 'الأولوية المتوسطة: تدريب على القيادة' : 'Medium Priority: Leadership training'}</li>
                  <li>• {isRTL ? 'المدى الطويل: مشاريع عبر الفرق' : 'Long-term: Cross-team projects'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Saved Scenarios */}
      {scenarios.length > 0 && (
        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Save className="w-5 h-5 text-primary" />
              {isRTL ? 'السيناريوهات المحفوظة' : 'Saved Scenarios'}
            </CardTitle>
            <CardDescription>
              {isRTL ? `${scenarios.length} سيناريو محفوظ` : `${scenarios.length} saved scenarios`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scenarios.map((scenario) => (
                <div key={scenario.id} className="p-4 border border-border rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{scenario.name}</h4>
                      <p className="text-sm text-muted-foreground">{scenario.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getImpactColor(scenario.impact)}>
                        {scenario.predictedScore}
                      </Badge>
                      <Badge variant="outline">
                        {scenario.status === 'saved' ? (isRTL ? 'محفوظ' : 'Saved') : 
                         scenario.status === 'shared' ? (isRTL ? 'مشارك' : 'Shared') : 
                         isRTL ? 'مسودة' : 'Draft'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};