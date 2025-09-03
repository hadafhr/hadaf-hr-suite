import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  GitBranch, Building2, Users, Crown, 
  ChevronDown, ChevronRight, Eye, Edit,
  ZoomIn, ZoomOut, Download, Maximize,
  User, Target, Settings
} from 'lucide-react';

const OrganizationalChart = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [zoomLevel, setZoomLevel] = useState(100);
  const [expandedNodes, setExpandedNodes] = useState(['ceo', 'it', 'hr', 'finance', 'marketing', 'sales']);

  const orgStructure = {
    id: 'ceo',
    name: isRTL ? 'الرئيس التنفيذي' : 'Chief Executive Officer',
    person: isRTL ? 'عبدالله محمد الراشد' : 'Abdullah Mohammed Al-Rashid',
    level: 0,
    employees: 500,
    children: [
      {
        id: 'it',
        name: isRTL ? 'إدارة تقنية المعلومات' : 'IT Department',
        person: isRTL ? 'أحمد محمد الحلي' : 'Ahmed Mohammed Al-Hali',
        level: 1,
        employees: 85,
        children: [
          {
            id: 'it-dev',
            name: isRTL ? 'وحدة التطوير' : 'Development Unit',
            person: isRTL ? 'محمد علي السالم' : 'Mohammed Ali Al-Salem',
            level: 2,
            employees: 32
          },
          {
            id: 'it-security',
            name: isRTL ? 'وحدة الأمن السيبراني' : 'Cybersecurity Unit',
            person: isRTL ? 'فاطمة أحمد الزهراني' : 'Fatima Ahmed Al-Zahrani',
            level: 2,
            employees: 18
          },
          {
            id: 'it-support',
            name: isRTL ? 'وحدة الدعم التقني' : 'Technical Support Unit',
            person: isRTL ? 'خالد سعد العتيبي' : 'Khalid Saad Al-Otaibi',
            level: 2,
            employees: 25
          },
          {
            id: 'it-infra',
            name: isRTL ? 'وحدة البنية التحتية' : 'Infrastructure Unit',
            person: isRTL ? 'عبدالله محمد القحطاني' : 'Abdullah Mohammed Al-Qahtani',
            level: 2,
            employees: 10
          }
        ]
      },
      {
        id: 'hr',
        name: isRTL ? 'إدارة الموارد البشرية' : 'Human Resources',
        person: isRTL ? 'فاطمة أحمد محمود' : 'Fatima Ahmed Mahmoud',
        level: 1,
        employees: 65,
        children: [
          {
            id: 'hr-recruit',
            name: isRTL ? 'وحدة التوظيف' : 'Recruitment Unit',
            person: isRTL ? 'نورا علي الزهراني' : 'Nora Ali Al-Zahrani',
            level: 2,
            employees: 25
          },
          {
            id: 'hr-training',
            name: isRTL ? 'وحدة التدريب' : 'Training Unit',
            person: isRTL ? 'سارة عبدالرحمن الشمري' : 'Sarah Abdulrahman Al-Shammari',
            level: 2,
            employees: 20
          },
          {
            id: 'hr-payroll',
            name: isRTL ? 'وحدة الرواتب' : 'Payroll Unit',
            person: isRTL ? 'علي حسن المطيري' : 'Ali Hassan Al-Mutairi',
            level: 2,
            employees: 20
          }
        ]
      },
      {
        id: 'finance',
        name: isRTL ? 'الإدارة المالية' : 'Finance Department',
        person: isRTL ? 'خالد سعد العتيبي' : 'Khalid Saad Al-Otaibi',
        level: 1,
        employees: 45,
        children: [
          {
            id: 'finance-acc',
            name: isRTL ? 'وحدة المحاسبة' : 'Accounting Unit',
            person: isRTL ? 'عبدالرحمن محمد الجهني' : 'Abdulrahman Mohammed Al-Jehani',
            level: 2,
            employees: 20
          },
          {
            id: 'finance-treasury',
            name: isRTL ? 'وحدة الخزينة' : 'Treasury Unit',
            person: isRTL ? 'لطيفة أحمد البلوي' : 'Latifa Ahmed Al-Balawi',
            level: 2,
            employees: 25
          }
        ]
      },
      {
        id: 'marketing',
        name: isRTL ? 'إدارة التسويق' : 'Marketing Department',
        person: isRTL ? 'نورا علي الزهراني' : 'Nora Ali Al-Zahrani',
        level: 1,
        employees: 78,
        children: [
          {
            id: 'marketing-digital',
            name: isRTL ? 'وحدة التسويق الرقمي' : 'Digital Marketing Unit',
            person: isRTL ? 'سارة عبدالرحمن الشمري' : 'Sarah Abdulrahman Al-Shammari',
            level: 2,
            employees: 22
          },
          {
            id: 'marketing-traditional',
            name: isRTL ? 'وحدة التسويق التقليدي' : 'Traditional Marketing Unit',
            person: isRTL ? 'علي حسن المطيري' : 'Ali Hassan Al-Mutairi',
            level: 2,
            employees: 15
          },
          {
            id: 'marketing-pr',
            name: isRTL ? 'وحدة العلاقات العامة' : 'Public Relations Unit',
            person: isRTL ? 'منى سالم الغامدي' : 'Mona Salem Al-Ghamdi',
            level: 2,
            employees: 12
          },
          {
            id: 'marketing-analysis',
            name: isRTL ? 'وحدة تحليل السوق' : 'Market Analysis Unit',
            person: isRTL ? 'يوسف أحمد الحربي' : 'Youssef Ahmed Al-Harbi',
            level: 2,
            employees: 18
          },
          {
            id: 'marketing-brand',
            name: isRTL ? 'وحدة إدارة العلامة التجارية' : 'Brand Management Unit',
            person: isRTL ? 'ريم محمد العمري' : 'Reem Mohammed Al-Omari',
            level: 2,
            employees: 11
          }
        ]
      },
      {
        id: 'sales',
        name: isRTL ? 'إدارة المبيعات' : 'Sales Department',
        person: isRTL ? 'عبدالله محمد القحطاني' : 'Abdullah Mohammed Al-Qahtani',
        level: 1,
        employees: 92,
        children: [
          {
            id: 'sales-direct',
            name: isRTL ? 'وحدة المبيعات المباشرة' : 'Direct Sales Unit',
            person: isRTL ? 'أحمد سالم الدوسري' : 'Ahmed Salem Al-Dosari',
            level: 2,
            employees: 35
          },
          {
            id: 'sales-ecommerce',
            name: isRTL ? 'وحدة المبيعات الإلكترونية' : 'E-commerce Unit',
            person: isRTL ? 'هند عبدالعزيز النجار' : 'Hind Abdulaziz Al-Najjar',
            level: 2,
            employees: 28
          },
          {
            id: 'sales-customer',
            name: isRTL ? 'وحدة خدمة العملاء' : 'Customer Service Unit',
            person: isRTL ? 'نادية علي الشهري' : 'Nadia Ali Al-Shehri',
            level: 2,
            employees: 29
          }
        ]
      },
      {
        id: 'operations',
        name: isRTL ? 'إدارة العمليات' : 'Operations Department',
        person: isRTL ? 'سارة عبدالرحمن الشمري' : 'Sarah Abdulrahman Al-Shammari',
        level: 1,
        employees: 56,
        children: [
          {
            id: 'operations-quality',
            name: isRTL ? 'وحدة الجودة' : 'Quality Unit',
            person: isRTL ? 'محمد عبدالله الخالدي' : 'Mohammed Abdullah Al-Khalidi',
            level: 2,
            employees: 28
          },
          {
            id: 'operations-logistics',
            name: isRTL ? 'وحدة اللوجستيات' : 'Logistics Unit',
            person: isRTL ? 'عائشة سالم الغامدي' : 'Aisha Salem Al-Ghamdi',
            level: 2,
            employees: 28
          }
        ]
      }
    ]
  };

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId) 
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleExportChart = () => {
    console.log('تصدير المخطط التنظيمي');
  };

  const renderNode = (node, parentId = null) => {
    const isExpanded = expandedNodes.includes(node.id);
    const hasChildren = node.children && node.children.length > 0;
    
    const getNodeColor = (level) => {
      switch (level) {
        case 0: return 'from-primary to-primary-glow'; // CEO
        case 1: return 'from-primary/80 to-primary-glow/80'; // Department heads
        case 2: return 'from-muted-foreground/60 to-muted-foreground/40'; // Unit heads
        default: return 'from-muted/60 to-muted/40';
      }
    };

    const getNodeIcon = (level) => {
      switch (level) {
        case 0: return Crown;
        case 1: return Building2;
        case 2: return Target;
        default: return User;
      }
    };

    const NodeIcon = getNodeIcon(node.level);

    return (
      <div key={node.id} className="flex flex-col items-center">
        {/* العقدة */}
        <Card className={`group hover:shadow-glow transition-all duration-500 border border-border/20 bg-white/95 backdrop-blur-sm overflow-hidden relative ${
          node.level === 0 ? 'w-80' : node.level === 1 ? 'w-72' : 'w-64'
        }`}>
          {/* خلفية متحركة */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardContent className={`${node.level === 0 ? 'p-6' : 'p-4'} relative z-10`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`${node.level === 0 ? 'w-14 h-14' : 'w-12 h-12'} bg-gradient-to-br ${getNodeColor(node.level)} rounded-2xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                <NodeIcon className={`${node.level === 0 ? 'h-7 w-7' : 'h-6 w-6'} text-white`} />
              </div>
              <div className="flex-1">
                <h3 className={`${node.level === 0 ? 'text-lg' : 'text-base'} font-bold text-foreground group-hover:text-primary transition-colors duration-300`}>
                  {node.name}
                </h3>
                <p className="text-sm text-muted-foreground">{node.person}</p>
              </div>
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8"
                  onClick={() => toggleNode(node.id)}
                >
                  {isExpanded ? 
                    <ChevronDown className="h-4 w-4 text-primary" /> : 
                    <ChevronRight className="h-4 w-4 text-primary" />
                  }
                </Button>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className={`${node.level === 0 ? 'text-2xl' : 'text-xl'} font-bold text-primary`}>
                    {node.employees}
                  </p>
                  <p className="text-xs text-muted-foreground">{isRTL ? 'موظف' : 'Employees'}</p>
                </div>
                {node.level === 0 && (
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">6</p>
                    <p className="text-xs text-muted-foreground">{isRTL ? 'إدارة' : 'Departments'}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 text-primary hover:bg-primary/10">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 text-foreground hover:bg-muted/20">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {node.level === 0 && (
              <div className="mt-4 p-3 bg-primary/5 rounded-xl">
                <p className="text-sm text-primary font-medium text-center">
                  {isRTL ? 'الإدارة العليا والقيادة التنفيذية' : 'Executive Leadership & Top Management'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* الخطوط والأطفال */}
        {hasChildren && isExpanded && (
          <div className="mt-8">
            {/* الخط العمودي */}
            <div className="w-px h-12 bg-primary/30 mx-auto"></div>
            
            {/* الخط الأفقي */}
            <div className="flex items-center justify-center">
              <div className={`h-px bg-primary/30 ${node.children.length > 1 ? 'w-full' : 'w-24'}`}></div>
            </div>

            {/* العقد الفرعية */}
            <div className={`flex ${node.children.length > 3 ? 'flex-wrap justify-center' : 'justify-center'} gap-8 mt-12`}>
              {node.children.map((child, index) => (
                <div key={child.id} className="flex flex-col items-center">
                  {/* الخط العمودي للطفل */}
                  <div className="w-px h-12 bg-primary/30"></div>
                  {renderNode(child, node.id)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* شريط الأدوات */}
      <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center">
                <GitBranch className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{isRTL ? 'المخطط التنظيمي التفاعلي' : 'Interactive Organizational Chart'}</h3>
                <p className="text-muted-foreground">{isRTL ? 'العرض البصري للهيكل التنظيمي الكامل' : 'Visual representation of the complete organizational structure'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-muted/20 rounded-lg p-1">
                <Button variant="ghost" size="sm" onClick={handleZoomOut} disabled={zoomLevel <= 50}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="px-2 text-sm font-medium text-foreground">{zoomLevel}%</span>
                <Button variant="ghost" size="sm" onClick={handleZoomIn} disabled={zoomLevel >= 200}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm" className="border-border/30 hover:border-primary/50">
                <Maximize className="h-4 w-4 ml-2" />
                {isRTL ? 'ملء الشاشة' : 'Fullscreen'}
              </Button>
              <Button 
                className="bg-gradient-to-r from-primary to-primary-glow text-white shadow-soft hover:shadow-glow transition-all duration-300"
                onClick={handleExportChart}
              >
                <Download className="h-4 w-4 ml-2" />
                {isRTL ? 'تصدير المخطط' : 'Export Chart'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft text-center">
          <CardContent className="p-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mx-auto mb-2">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <p className="text-lg font-bold text-foreground">1</p>
            <p className="text-xs text-muted-foreground">{isRTL ? 'رئيس تنفيذي' : 'CEO'}</p>
          </CardContent>
        </Card>

        <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft text-center">
          <CardContent className="p-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mx-auto mb-2">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <p className="text-lg font-bold text-foreground">6</p>
            <p className="text-xs text-muted-foreground">{isRTL ? 'إدارة رئيسية' : 'Main Departments'}</p>
          </CardContent>
        </Card>

        <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft text-center">
          <CardContent className="p-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mx-auto mb-2">
              <Target className="h-5 w-5 text-white" />
            </div>
            <p className="text-lg font-bold text-foreground">19</p>
            <p className="text-xs text-muted-foreground">{isRTL ? 'وحدة فرعية' : 'Sub Units'}</p>
          </CardContent>
        </Card>

        <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft text-center">
          <CardContent className="p-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mx-auto mb-2">
              <Users className="h-5 w-5 text-white" />
            </div>
            <p className="text-lg font-bold text-foreground">421</p>
            <p className="text-xs text-muted-foreground">{isRTL ? 'إجمالي الموظفين' : 'Total Employees'}</p>
          </CardContent>
        </Card>

        <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft text-center">
          <CardContent className="p-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mx-auto mb-2">
              <GitBranch className="h-5 w-5 text-white" />
            </div>
            <p className="text-lg font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground">{isRTL ? 'مستوى إداري' : 'Management Levels'}</p>
          </CardContent>
        </Card>
      </div>

      {/* المخطط التنظيمي */}
      <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft overflow-auto">
        <CardContent className="p-8">
          <div 
            className="inline-block min-w-full"
            style={{ 
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.3s ease'
            }}
          >
            <div className="flex justify-center">
              {renderNode(orgStructure)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationalChart;