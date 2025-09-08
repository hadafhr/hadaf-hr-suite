import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  Clock, 
  FileText, 
  Settings, 
  BarChart3,
  Shield,
  Database,
  Workflow,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Building2,
  UserCheck,
  ClipboardList,
  DollarSign,
  Heart,
  Zap,
  Award,
  BookOpen,
  Camera,
  Coffee,
  Globe,
  Home,
  Map,
  MessageCircle,
  Phone,
  Search,
  Star,
  Tag,
  Wifi,
  Headphones,
  Monitor,
  Truck
} from 'lucide-react';

export const HRSystemManagement: React.FC = () => {
  const hrModules = [
    { title: "قسم فريق العمل", icon: <Users className="h-6 w-6 text-blue-600" />, color: "hover:bg-blue-50" },
    { title: "قسم الإجازات والغيابات", icon: <Calendar className="h-6 w-6 text-green-600" />, color: "hover:bg-green-50" },
    { title: "قسم جودة الإنتاج", icon: <Target className="h-6 w-6 text-purple-600" />, color: "hover:bg-purple-50" },
    { title: "قسم محجور الحوارات", icon: <MessageCircle className="h-6 w-6 text-orange-600" />, color: "hover:bg-orange-50" },
    { title: "قسم التواصل الداخلي", icon: <Phone className="h-6 w-6 text-teal-600" />, color: "hover:bg-teal-50" },
    { title: "قسم الاطلاعات الإدارية", icon: <FileText className="h-6 w-6 text-indigo-600" />, color: "hover:bg-indigo-50" },
    { title: "قسم السلامة المهنية", icon: <Shield className="h-6 w-6 text-red-600" />, color: "hover:bg-red-50" },
    { title: "قسم الخدمات الاجتماعية", icon: <Heart className="h-6 w-6 text-pink-600" />, color: "hover:bg-pink-50" },
    
    { title: "قسم الحضور والانصراف", icon: <Clock className="h-6 w-6 text-cyan-600" />, color: "hover:bg-cyan-50" },
    { title: "قسم خدمات الموظفين", icon: <UserCheck className="h-6 w-6 text-violet-600" />, color: "hover:bg-violet-50" },
    { title: "قسم التدريبات والتنمية", icon: <BookOpen className="h-6 w-6 text-amber-600" />, color: "hover:bg-amber-50" },
    { title: "قسم الإجازات", icon: <Calendar className="h-6 w-6 text-lime-600" />, color: "hover:bg-lime-50" },
    { title: "قسم الرواتب والأجور", icon: <DollarSign className="h-6 w-6 text-emerald-600" />, color: "hover:bg-emerald-50" },
    { title: "قسم الشكاوى والتظلم", icon: <AlertCircle className="h-6 w-6 text-rose-600" />, color: "hover:bg-rose-50" },
    { title: "قسم التطوير المؤسسي", icon: <Zap className="h-6 w-6 text-yellow-600" />, color: "hover:bg-yellow-50" },
    { title: "قسم المكافآت والحوافز", icon: <Award className="h-6 w-6 text-blue-500" />, color: "hover:bg-blue-50" },
    
    { title: "قسم التقييم", icon: <Star className="h-6 w-6 text-purple-500" />, color: "hover:bg-purple-50" },
    { title: "قسم التوظيف الخارجي", icon: <Globe className="h-6 w-6 text-green-500" />, color: "hover:bg-green-50" },
    { title: "قسم الموارد والمتابعة", icon: <Search className="h-6 w-6 text-gray-600" />, color: "hover:bg-gray-50" },
    { title: "قسم الطلبات والإجراءات", icon: <ClipboardList className="h-6 w-6 text-indigo-500" />, color: "hover:bg-indigo-50" },
    { title: "قسم الأداء الاجتماعي", icon: <Home className="h-6 w-6 text-teal-500" />, color: "hover:bg-teal-50" },
    { title: "قسم التقارير الشاملة", icon: <BarChart3 className="h-6 w-6 text-red-500" />, color: "hover:bg-red-50" },
    { title: "قسم التسع الإداري", icon: <Map className="h-6 w-6 text-orange-500" />, color: "hover:bg-orange-50" },
    { title: "الإعدادات العامة", icon: <Settings className="h-6 w-6 text-gray-500" />, color: "hover:bg-gray-50" }
  ];

  const controlPanelSections = [
    {
      title: "فريق العمل",
      icon: <Users className="h-8 w-8 text-blue-600" />,
      total: "245",
      active: "238", 
      inactive: "7",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      badge: "3 يومياً"
    },
    {
      title: "الإجازات والأنشطار", 
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      total: "12",
      active: "12",
      inactive: "",
      bgColor: "bg-purple-50", 
      borderColor: "border-purple-200",
      badge: ""
    },
    {
      title: "الحضور والانصراف",
      icon: <Clock className="h-8 w-8 text-green-600" />,
      total: "245",
      active: "220",
      inactive: "15", 
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      badge: "10 يومياً"
    },
    {
      title: "التراخيص والمتطلبات",
      icon: <AlertCircle className="h-8 w-8 text-red-600" />,
      total: "2",
      active: "2", 
      inactive: "",
      bgColor: "bg-red-50",
      borderColor: "border-red-200", 
      badge: "2 يومياً"
    },
    {
      title: "الإجازات والعطلات",
      icon: <Calendar className="h-8 w-8 text-orange-600" />,
      total: "45",
      active: "",
      inactive: "",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      badge: "5 يوم"
    },
    {
      title: "الرواتب والأجور", 
      icon: <DollarSign className="h-8 w-8 text-emerald-600" />,
      total: "245",
      active: "",
      inactive: "",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      badge: ""
    },
    {
      title: "الشامل والربط",
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      total: "8", 
      active: "",
      inactive: "",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      badge: "1 يوم"
    },
    {
      title: "التطوير والتنظيم المؤسسي",
      icon: <Zap className="h-8 w-8 text-cyan-600" />,
      total: "15",
      active: "",
      inactive: "",
      bgColor: "bg-cyan-50", 
      borderColor: "border-cyan-200",
      badge: ""
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-foreground">
          نظام إدارة الموارد البشرية المتكامل
        </h1>
        <p className="text-xl text-muted-foreground">
          النظام الشامل والمتقدم لإدارة الموظفين والفريق
        </p>
        
        {/* Action Buttons */}
        <div className="flex justify-center gap-3 mt-6">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            <FileText className="h-4 w-4 mr-2" />
            تصدير
          </Button>
          <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
            <Users className="h-4 w-4 mr-2" />
            إضافة موظف
          </Button>
        </div>
      </div>

      {/* HR Modules Grid */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <Settings className="h-5 w-5 text-gray-600" />
            <Clock className="h-5 w-5 text-gray-600" />
            <BarChart3 className="h-5 w-5 text-gray-600" />
            <Shield className="h-5 w-5 text-gray-600" />
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" className="border-teal-600 text-teal-600">
              لوحة التحكم
            </Button>
            <Button size="sm" variant="outline">
              خطة التحديث
            </Button>
            <Button size="sm" variant="outline">
              تخصيص
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {hrModules.map((module, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg p-4 text-center cursor-pointer transition-all duration-200 ${module.color} border border-gray-200 hover:shadow-md`}
            >
              <div className="flex flex-col items-center space-y-2">
                {module.icon}
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                  {module.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Control Panel */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold text-teal-600">
              لوحة التحكم الشاملة
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-teal-600 border-teal-600">
                آخر تحديث 0.4.FPV
              </Badge>
              <Button size="sm" variant="outline">
                تحديث
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            نظرة شاملة على جميع أنشطة وعمليات النظام (22 قسم)
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {controlPanelSections.map((section, index) => (
              <Card key={index} className={`${section.bgColor} ${section.borderColor} border-2 hover:shadow-lg transition-all duration-300`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    {section.icon}
                    {section.badge && (
                      <Badge variant="destructive" className="text-xs">
                        {section.badge}
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                    {section.title}
                  </h3>
                  
                  <div className="space-y-1 text-xs">
                    {section.total && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">الإجمالي:</span>
                        <span className="font-semibold text-gray-900">{section.total}</span>
                      </div>
                    )}
                    {section.active && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">النشط:</span>
                        <span className="font-semibold text-green-600">{section.active}</span>
                      </div>
                    )}
                    {section.inactive && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">معطل:</span>
                        <span className="font-semibold text-red-600">{section.inactive}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};