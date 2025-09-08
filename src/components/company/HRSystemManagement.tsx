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
  DollarSign,
  Target,
  AlertCircle,
  Building2,
  UserCheck,
  ClipboardList,
  Heart,
  Zap,
  Award,
  BookOpen,
  Globe,
  Home,
  Map,
  MessageCircle,
  Phone,
  Search,
  Star,
  CheckCircle,
  Building,
  TrendingUp,
  Network,
  Workflow,
  Archive,
  Download,
  Briefcase,
  Database,
  Headphones
} from 'lucide-react';

export const HRSystemManagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          نظام إدارة الموارد البشرية المتكامل
        </h1>
        <p className="text-gray-600 mb-6">
          النظام الشامل والمتقدم لإدارة الموظفين والفريق
        </p>
        
        <div className="flex justify-center gap-3">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6">
            <Download className="h-4 w-4 ml-2" />
            تصدير
          </Button>
          <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 px-6">
            <Settings className="h-4 w-4 ml-2" />
            نظام متطور
          </Button>
        </div>
      </div>

      {/* HR System Modules Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Settings className="h-5 w-5 text-gray-600" />
            <Clock className="h-5 w-5 text-gray-600" />
            <BarChart3 className="h-5 w-5 text-gray-600" />
            <Shield className="h-5 w-5 text-gray-600" />
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
              لوحة التحكم
            </Button>
            <Button size="sm" variant="outline" className="text-gray-600 hover:bg-gray-50">
              خطة التحديث
            </Button>
            <Button size="sm" variant="outline" className="text-gray-600 hover:bg-gray-50">
              تخصيص
            </Button>
          </div>
        </div>

        {/* System Modules Grid - 8 columns */}
        <div className="grid grid-cols-8 gap-4">
          {/* Row 1 */}
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-blue-50 transition-colors border">
            <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم فريق العمل</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-purple-50 transition-colors border">
            <Calendar className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم الإجازات والغيابات</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-green-50 transition-colors border">
            <Heart className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم جودة الإنتاج</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-orange-50 transition-colors border">
            <Building className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم محجور الحوارات</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-teal-50 transition-colors border">
            <Phone className="h-6 w-6 text-teal-600 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم التواصل الداخلي</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-indigo-50 transition-colors border">
            <FileText className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم الاطلاعات الإدارية</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-red-50 transition-colors border">
            <Shield className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم السلامة المهنية</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-pink-50 transition-colors border">
            <Heart className="h-6 w-6 text-pink-600 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم الخدمات الاجتماعية</span>
          </div>

          {/* Row 2 */}
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-cyan-50 transition-colors border">
            <Clock className="h-6 w-6 text-cyan-600 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم الحضور والانصراف</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-violet-50 transition-colors border">
            <UserCheck className="h-6 w-6 text-violet-600 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم خدمات الموظفين</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-amber-50 transition-colors border">
            <AlertCircle className="h-6 w-6 text-amber-600 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم الإجازات والتنمية</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-lime-50 transition-colors border">
            <Calendar className="h-6 w-6 text-lime-600 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم الإجازات</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-emerald-50 transition-colors border">
            <DollarSign className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم الرواتب والأجور</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-rose-50 transition-colors border">
            <Network className="h-6 w-6 text-rose-600 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم التكامل والربط</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-yellow-50 transition-colors border">
            <Zap className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم التطوير المؤسسي</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-blue-50 transition-colors border">
            <Heart className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم الخدمات الاجتماعية</span>
          </div>

          {/* Row 3 */}
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-purple-50 transition-colors border">
            <Archive className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم جميع الأنواع</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-green-50 transition-colors border">
            <Briefcase className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم الشؤون القانونية</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors border">
            <BookOpen className="h-6 w-6 text-gray-600 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم التدريب والتأهيل</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-indigo-50 transition-colors border">
            <Star className="h-6 w-6 text-indigo-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم إدارة المواهب</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-teal-50 transition-colors border">
            <Users className="h-6 w-6 text-teal-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم التوظيف والتعيين</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-red-50 transition-colors border">
            <Target className="h-6 w-6 text-red-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم التقييم</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-orange-50 transition-colors border">
            <Building2 className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم الاجتماعات</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors border">
            <Database className="h-6 w-6 text-gray-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم المعلومات والحلول</span>
          </div>

          {/* Row 4 */}
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-blue-50 transition-colors border">
            <Workflow className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم الاجتماعات</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-purple-50 transition-colors border">
            <Award className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم التوثيق الإلكتروني</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-green-50 transition-colors border">
            <ClipboardList className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم المواءم والمتابعة</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-orange-50 transition-colors border">
            <MessageCircle className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم الطلبات والإشعارات</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-teal-50 transition-colors border">
            <Database className="h-6 w-6 text-teal-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم الذكاء الاصطناعي</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-indigo-50 transition-colors border">
            <Building2 className="h-6 w-6 text-indigo-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم التقارير الشاملة</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-red-50 transition-colors border">
            <Map className="h-6 w-6 text-red-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">قسم التسع الإداري</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors border">
            <Settings className="h-6 w-6 text-gray-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700">الإعدادات العامة</span>
          </div>
        </div>
      </div>

      {/* Dashboard Control Panel */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold text-teal-600 flex items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              لوحة التحكم الشاملة
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-teal-600 border-teal-600">
                آخر تحديث 0.4.FPV
              </Badge>
              <Button size="sm" variant="outline" className="text-gray-600 hover:bg-gray-50">
                تحديث
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            نظرة شاملة على جميع أنشطة وعمليات النظام (22 قسم)
          </p>
        </CardHeader>
      </Card>
    </div>
  );
};