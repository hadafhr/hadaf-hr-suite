import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Network, 
  Users, 
  Target, 
  TrendingUp, 
  Bot, 
  BarChart3, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Save, 
  Download, 
  Upload, 
  RefreshCw,
  Building2,
  Workflow,
  GitBranch,
  Zap,
  Calendar,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  Settings,
  ArrowRight,
  ArrowDown,
  Expand,
  Shrink,
  Move,
  Copy,
  History,
  Search,
  Filter,
  PieChart,
  BarChart,
  LineChart,
  Activity,
  Award,
  Star,
  Link,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';

interface OrganizationalDevelopmentProps {
  onBack: () => void;
}

interface OrganizationalUnit {
  id: string;
  name: string;
  level: number;
  parentId: string | null;
  managerId: string | null;
  managerName: string;
  employeeCount: number;
  type: 'department' | 'section' | 'unit' | 'team';
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  kpis: string[];
  children: OrganizationalUnit[];
  position: { x: number; y: number };
  status: 'active' | 'proposed' | 'inactive';
  createdAt: string;
  lastModified: string;
}

interface GapAnalysis {
  id: string;
  unitId: string;
  gapType: 'skill' | 'resource' | 'position' | 'process';
  description: string;
  currentState: string;
  idealState: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  recommendations: string[];
  estimatedCost: number;
  timeToResolve: string;
  status: 'identified' | 'in_progress' | 'resolved';
}

interface AIRecommendation {
  id: string;
  type: 'restructure' | 'optimize' | 'merge' | 'split' | 'eliminate';
  title: string;
  description: string;
  targetUnits: string[];
  expectedBenefit: string;
  implementationComplexity: 'low' | 'medium' | 'high';
  costSavings: number;
  timeline: string;
  risks: string[];
  confidence: number;
}

export const OrganizationalDevelopment: React.FC<OrganizationalDevelopmentProps> = ({ onBack }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [dragMode, setDragMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false);
  const [isEditUnitOpen, setIsEditUnitOpen] = useState(false);
  const [selectedGap, setSelectedGap] = useState<GapAnalysis | null>(null);

  // Mock organizational structure data
  const [organizationalUnits, setOrganizationalUnits] = useState<OrganizationalUnit[]>([
    {
      id: 'CEO',
      name: 'الرئيس التنفيذي',
      level: 1,
      parentId: null,
      managerId: 'user1',
      managerName: 'محمد السالم',
      employeeCount: 1,
      type: 'department',
      description: 'القيادة العليا والإشراف الاستراتيجي',
      responsibilities: ['وضع الاستراتيجية', 'اتخاذ القرارات الاستراتيجية', 'قيادة الشركة'],
      requiredSkills: ['القيادة', 'التخطيط الاستراتيجي', 'اتخاذ القرارات'],
      kpis: ['العائد على الاستثمار', 'نمو الإيرادات', 'رضا الموظفين'],
      children: [],
      position: { x: 400, y: 50 },
      status: 'active',
      createdAt: '2023-01-01',
      lastModified: '2024-03-15'
    },
    {
      id: 'IT_DEPT',
      name: 'إدارة تقنية المعلومات',
      level: 2,
      parentId: 'CEO',
      managerId: 'user2',
      managerName: 'أحمد التقني',
      employeeCount: 15,
      type: 'department',
      description: 'تطوير وصيانة الأنظمة التقنية',
      responsibilities: ['تطوير الأنظمة', 'الدعم التقني', 'أمن المعلومات'],
      requiredSkills: ['البرمجة', 'إدارة الأنظمة', 'أمن المعلومات'],
      kpis: ['وقت التشغيل', 'رضا المستخدمين', 'سرعة الاستجابة'],
      children: [],
      position: { x: 200, y: 150 },
      status: 'active',
      createdAt: '2023-01-01',
      lastModified: '2024-03-10'
    },
    {
      id: 'HR_DEPT',
      name: 'إدارة الموارد البشرية',
      level: 2,
      parentId: 'CEO',
      managerId: 'user3',
      managerName: 'فاطمة الإنسان',
      employeeCount: 8,
      type: 'department',
      description: 'إدارة شؤون الموظفين والتطوير المؤسسي',
      responsibilities: ['التوظيف', 'التدريب', 'تقييم الأداء', 'الرواتب'],
      requiredSkills: ['إدارة الموارد البشرية', 'التواصل', 'التحليل'],
      kpis: ['معدل الاحتفاظ بالموظفين', 'وقت التوظيف', 'رضا الموظفين'],
      children: [],
      position: { x: 600, y: 150 },
      status: 'active',
      createdAt: '2023-01-01',
      lastModified: '2024-03-12'
    },
    {
      id: 'FINANCE_DEPT',
      name: 'الإدارة المالية',
      level: 2,
      parentId: 'CEO',
      managerId: 'user4',
      managerName: 'عبدالله المالي',
      employeeCount: 12,
      type: 'department',
      description: 'إدارة الشؤون المالية والمحاسبية',
      responsibilities: ['المحاسبة', 'التدقيق', 'التخطيط المالي', 'التقارير'],
      requiredSkills: ['المحاسبة', 'التحليل المالي', 'التدقيق'],
      kpis: ['دقة التقارير المالية', 'وقت إغلاق الحسابات', 'التدفق النقدي'],
      children: [],
      position: { x: 800, y: 150 },
      status: 'active',
      createdAt: '2023-01-01',
      lastModified: '2024-03-08'
    }
  ]);

  // Mock gap analysis data
  const [gapAnalysis, setGapAnalysis] = useState<GapAnalysis[]>([
    {
      id: 'GAP001',
      unitId: 'IT_DEPT',
      gapType: 'skill',
      description: 'نقص في مهارات الذكاء الاصطناعي',
      currentState: '15% من فريق تقنية المعلومات لديه خبرة في الذكاء الاصطناعي',
      idealState: '60% من الفريق يجب أن يكون لديه خبرة في الذكاء الاصطناعي',
      priority: 'high',
      impact: 'تأخير في تطوير المنتجات الذكية',
      recommendations: ['تدريب الفريق الحالي', 'توظيف مطورين متخصصين', 'الشراكة مع مؤسسات تعليمية'],
      estimatedCost: 150000,
      timeToResolve: '6 أشهر',
      status: 'identified'
    },
    {
      id: 'GAP002',
      unitId: 'HR_DEPT',
      gapType: 'resource',
      description: 'نقص في أدوات إدارة المواهب',
      currentState: 'استخدام أدوات تقليدية وعمليات يدوية',
      idealState: 'نظام متكامل لإدارة المواهب والأداء',
      priority: 'medium',
      impact: 'انخفاض كفاءة العمليات وتأخير في اتخاذ القرارات',
      recommendations: ['شراء نظام إدارة المواهب', 'تدريب الفريق', 'تطوير العمليات'],
      estimatedCost: 80000,
      timeToResolve: '4 أشهر',
      status: 'in_progress'
    }
  ]);

  // Mock AI recommendations
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([
    {
      id: 'AI001',
      type: 'optimize',
      title: 'دمج فريق الدعم التقني مع فريق التطوير',
      description: 'تحليل البيانات يظهر أن 40% من مشاكل الدعم التقني مرتبطة بالتطوير',
      targetUnits: ['IT_DEPT'],
      expectedBenefit: 'تحسين وقت الاستجابة بنسبة 35% وتقليل التكاليف',
      implementationComplexity: 'medium',
      costSavings: 200000,
      timeline: '3 أشهر',
      risks: ['مقاومة التغيير', 'الحاجة لإعادة تدريب'],
      confidence: 85
    },
    {
      id: 'AI002',
      type: 'restructure',
      title: 'إنشاء مركز خدمات مشتركة للإدارات المالية والإدارية',
      description: 'تكرار في المهام الإدارية والمالية بين الأقسام المختلفة',
      targetUnits: ['FINANCE_DEPT', 'HR_DEPT'],
      expectedBenefit: 'توحيد العمليات وتحسين الكفاءة',
      implementationComplexity: 'high',
      costSavings: 300000,
      timeline: '6 أشهر',
      risks: ['تعقيد التنفيذ', 'تأثير على العمليات الحالية'],
      confidence: 72
    }
  ]);

  // Statistics
  const stats = {
    totalUnits: organizationalUnits.length,
    totalEmployees: organizationalUnits.reduce((sum, unit) => sum + unit.employeeCount, 0),
    identifiedGaps: gapAnalysis.length,
    aiRecommendations: aiRecommendations.length,
    avgEmployeesPerUnit: Math.round(organizationalUnits.reduce((sum, unit) => sum + unit.employeeCount, 0) / organizationalUnits.length),
    structureEfficiency: 78,
    lastReviewDate: '2024-01-15',
    nextReviewDate: '2024-12-31'
  };

  const renderOrganizationalChart = () => {
    const unitLevels = organizationalUnits.reduce((acc, unit) => {
      if (!acc[unit.level]) acc[unit.level] = [];
      acc[unit.level].push(unit);
      return acc;
    }, {} as Record<number, OrganizationalUnit[]>);

    return (
      <div className="bg-white rounded-lg border p-6 min-h-[600px] relative overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">الهيكل التنظيمي الحالي</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDragMode(!dragMode)}
              className={dragMode ? 'bg-[#009F87] text-white' : ''}
            >
              <Move className="h-4 w-4 ml-2" />
              {dragMode ? 'إيقاف التحرير' : 'تفعيل التحرير'}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير PDF
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {Object.keys(unitLevels).map(level => (
            <div key={level} className="flex flex-wrap gap-4 justify-center">
              {unitLevels[parseInt(level)].map(unit => (
                <Card 
                  key={unit.id}
                  className={`w-64 cursor-pointer transition-all hover:shadow-lg ${
                    selectedUnit === unit.id ? 'ring-2 ring-[#009F87]' : ''
                  } ${
                    dragMode ? 'cursor-move' : 'cursor-pointer'
                  }`}
                  onClick={() => setSelectedUnit(unit.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-sm">{unit.name}</CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {unit.managerName}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={unit.status === 'active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {unit.status === 'active' ? 'نشط' : unit.status === 'proposed' ? 'مقترح' : 'غير نشط'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">عدد الموظفين:</span>
                        <span className="font-medium">{unit.employeeCount}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">النوع:</span>
                        <span className="font-medium">
                          {unit.type === 'department' ? 'إدارة' :
                           unit.type === 'section' ? 'قسم' :
                           unit.type === 'unit' ? 'وحدة' : 'فريق'}
                        </span>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="p-1 h-6">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-1 h-6">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-1 h-6 text-red-500">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>

        {selectedUnit && (
          <div className="fixed bottom-4 right-4 max-w-sm">
            <Card className="bg-white shadow-xl border-[#009F87]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">تفاصيل الوحدة المحددة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                {(() => {
                  const unit = organizationalUnits.find(u => u.id === selectedUnit);
                  if (!unit) return null;
                  return (
                    <>
                      <p><strong>الاسم:</strong> {unit.name}</p>
                      <p><strong>المدير:</strong> {unit.managerName}</p>
                      <p><strong>عدد الموظفين:</strong> {unit.employeeCount}</p>
                      <p><strong>الوصف:</strong> {unit.description}</p>
                      <Button 
                        size="sm" 
                        className="w-full mt-2 bg-[#009F87]"
                        onClick={() => setSelectedUnit(null)}
                      >
                        إغلاق
                      </Button>
                    </>
                  );
                })()}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  };

  const renderGapAnalysis = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">تحليل الفجوات التنظيمية</h3>
          <Button size="sm" className="bg-[#009F87]">
            <Plus className="h-4 w-4 ml-2" />
            إضافة فجوة جديدة
          </Button>
        </div>

        <div className="grid gap-4">
          {gapAnalysis.map(gap => (
            <Card key={gap.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{gap.description}</CardTitle>
                    <CardDescription className="mt-1">
                      الوحدة: {organizationalUnits.find(u => u.id === gap.unitId)?.name}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge 
                      variant={gap.priority === 'high' ? 'destructive' : 
                              gap.priority === 'medium' ? 'default' : 'secondary'}
                    >
                      {gap.priority === 'high' ? 'عالي' : 
                       gap.priority === 'medium' ? 'متوسط' : 'منخفض'}
                    </Badge>
                    <Badge variant="outline">
                      {gap.gapType === 'skill' ? 'مهارات' :
                       gap.gapType === 'resource' ? 'موارد' :
                       gap.gapType === 'position' ? 'منصب' : 'عملية'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">الوضع الحالي</Label>
                    <p className="text-sm text-muted-foreground mt-1">{gap.currentState}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">الوضع المثالي</Label>
                    <p className="text-sm text-muted-foreground mt-1">{gap.idealState}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">التأثير</Label>
                  <p className="text-sm text-muted-foreground mt-1">{gap.impact}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium">التوصيات</Label>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                    {gap.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ArrowRight className="h-3 w-3 mt-1 flex-shrink-0 text-[#009F87]" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>التكلفة المقدرة: {gap.estimatedCost.toLocaleString()} ريال</span>
                    <span>المدة الزمنية: {gap.timeToResolve}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderAIRecommendations = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-[#009F87]" />
            <h3 className="text-lg font-semibold">توصيات الذكاء الاصطناعي</h3>
          </div>
          <Button size="sm" variant="outline" className="hover:bg-[#009F87] hover:text-white">
            <RefreshCw className="h-4 w-4 ml-2" />
            تحديث التوصيات
          </Button>
        </div>

        <div className="grid gap-4">
          {aiRecommendations.map(recommendation => (
            <Card key={recommendation.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Zap className="h-4 w-4 text-[#009F87]" />
                      {recommendation.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {recommendation.description}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge 
                      variant={recommendation.type === 'optimize' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {recommendation.type === 'restructure' ? 'إعادة هيكلة' :
                       recommendation.type === 'optimize' ? 'تحسين' :
                       recommendation.type === 'merge' ? 'دمج' :
                       recommendation.type === 'split' ? 'تقسيم' : 'حذف'}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs">{recommendation.confidence}%</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">الفائدة المتوقعة</Label>
                  <p className="text-sm text-muted-foreground mt-1">{recommendation.expectedBenefit}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">تعقيد التنفيذ</Label>
                    <Badge 
                      variant={recommendation.implementationComplexity === 'high' ? 'destructive' :
                              recommendation.implementationComplexity === 'medium' ? 'default' : 'secondary'}
                      className="mt-1"
                    >
                      {recommendation.implementationComplexity === 'high' ? 'عالي' :
                       recommendation.implementationComplexity === 'medium' ? 'متوسط' : 'منخفض'}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">توفير التكاليف</Label>
                    <p className="text-sm font-semibold text-green-600 mt-1">
                      {recommendation.costSavings.toLocaleString()} ريال
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">المدة الزمنية</Label>
                    <p className="text-sm text-muted-foreground mt-1">{recommendation.timeline}</p>
                  </div>
                </div>

                {recommendation.risks.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">المخاطر المحتملة</Label>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      {recommendation.risks.map((risk, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 mt-1 flex-shrink-0 text-yellow-500" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="text-xs text-muted-foreground">
                    الوحدات المتأثرة: {recommendation.targetUnits.map(unitId => 
                      organizationalUnits.find(u => u.id === unitId)?.name || unitId
                    ).join(', ')}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 ml-2" />
                      مناقشة
                    </Button>
                    <Button size="sm" className="bg-[#009F87]">
                      <CheckCircle2 className="h-4 w-4 ml-2" />
                      قبول التوصية
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderDashboard = () => {
    return (
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-[#009F87] to-[#008072] text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">إجمالي الوحدات</p>
                  <p className="text-2xl font-bold">{stats.totalUnits}</p>
                </div>
                <Building2 className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">إجمالي الموظفين</p>
                  <p className="text-2xl font-bold">{stats.totalEmployees}</p>
                </div>
                <Users className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">الفجوات المحددة</p>
                  <p className="text-2xl font-bold">{stats.identifiedGaps}</p>
                </div>
                <Target className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">توصيات الذكاء الاصطناعي</p>
                  <p className="text-2xl font-bold">{stats.aiRecommendations}</p>
                </div>
                <Bot className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress and Review Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#009F87]" />
                كفاءة الهيكل التنظيمي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">الكفاءة الإجمالية</span>
                  <span className="text-lg font-bold text-[#009F87]">{stats.structureEfficiency}%</span>
                </div>
                <Progress value={stats.structureEfficiency} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">متوسط الموظفين/الوحدة</p>
                  <p className="text-xl font-bold text-green-600">{stats.avgEmployeesPerUnit}</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">المستويات الإدارية</p>
                  <p className="text-xl font-bold text-blue-600">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#009F87]" />
                مراجعة الهيكل التنظيمي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">آخر مراجعة</span>
                  <span className="text-sm font-medium">{stats.lastReviewDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">المراجعة القادمة</span>
                  <span className="text-sm font-medium text-[#009F87]">{stats.nextReviewDate}</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>تم الانتهاء من تحليل الفجوات</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span>في انتظار موافقة الإدارة العليا</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Bell className="h-4 w-4 text-blue-500" />
                  <span>تذكير المراجعة السنوية: 30 يوم</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-[#009F87]" />
              آخر الأنشطة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Edit className="h-4 w-4 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">تحديث إدارة تقنية المعلومات</p>
                  <p className="text-xs text-muted-foreground">تم إضافة 3 موظفين جدد - منذ يومين</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Plus className="h-4 w-4 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">إنشاء وحدة جديدة: فريق الذكاء الاصطناعي</p>
                  <p className="text-xs text-muted-foreground">تم الإنشاء بنجاح - منذ أسبوع</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Target className="h-4 w-4 text-orange-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">تحديد فجوة جديدة في المهارات</p>
                  <p className="text-xs text-muted-foreground">نقص في مهارات الذكاء الاصطناعي - منذ أسبوعين</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#009F87]/5 via-background to-[#009F87]/10">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-[#009F87]/10"
            >
              <ArrowRight className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#009F87]/10 rounded-lg">
                <Network className="h-6 w-6 text-[#009F87]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#009F87]">التطوير والتنظيم المؤسسي</h1>
                <p className="text-sm text-muted-foreground">تصميم وتطوير الهيكل التنظيمي الأمثل</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير التقرير
            </Button>
            <Button size="sm" className="bg-[#009F87]">
              <Plus className="h-4 w-4 ml-2" />
              إضافة وحدة جديدة
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="structure" className="flex items-center gap-2 data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              <Network className="h-4 w-4" />
              الهيكل التنظيمي
            </TabsTrigger>
            <TabsTrigger value="gaps" className="flex items-center gap-2 data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              <Target className="h-4 w-4" />
              تحليل الفجوات
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2 data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              <Bot className="h-4 w-4" />
              توصيات الذكاء الاصطناعي
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {renderDashboard()}
          </TabsContent>

          <TabsContent value="structure" className="space-y-6">
            {renderOrganizationalChart()}
          </TabsContent>

          <TabsContent value="gaps" className="space-y-6">
            {renderGapAnalysis()}
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            {renderAIRecommendations()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};