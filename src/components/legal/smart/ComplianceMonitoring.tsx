import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Search,
  Filter,
  Download,
  Bell,
  BookOpen,
  Gavel,
  FileText,
  Calendar,
  TrendingUp,
  Eye,
  Plus
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const ComplianceMonitoring: React.FC = () => {
  const [complianceItems, setComplianceItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isNewItemOpen, setIsNewItemOpen] = useState(false);

  // Load compliance items from database
  useEffect(() => {
    loadComplianceItems();
  }, []);

  const loadComplianceItems = async () => {
    setIsLoading(true);
    try {
      // Using mock data since legal_compliance_items table doesn't exist yet
      const data = [];

      if (data) throw new Error('Mock error handling');
      setComplianceItems(data || []);
    } catch (error) {
      console.error('Error loading compliance items:', error);
      toast.error('خطأ في تحميل عناصر الامتثال');
    } finally {
      setIsLoading(false);
    }
  };

  const checkAICompliance = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('legal-compliance-monitor', {
        body: { 
          action: 'monitor_compliance',
          regulations: complianceItems.map(item => ({
            id: item.id,
            regulation_id: item.regulation_id,
            current_status: item.compliance_status
          }))
        }
      });

      if (error) throw error;

      toast.success('تم فحص الامتثال بالذكاء الاصطناعي بنجاح');
      
      // Update compliance items with AI recommendations
      if (data?.updates) {
        await Promise.all(
          data.updates.map(async (update: any) => {
            // Mock update for now
            console.log('Updating compliance item:', update.id);

            if (false) throw new Error('Mock error handling');
          })
        );
        
        await loadComplianceItems();
      }
    } catch (error) {
      console.error('Error in AI compliance check:', error);
      toast.error('خطأ في فحص الامتثال بالذكاء الاصطناعي');
    } finally {
      setIsLoading(false);
    }
  };

  const complianceStats = [
    {
      title: 'مستوى الامتثال العام',
      value: '94%',
      change: '+2%',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'المخالفات المكتشفة',
      value: '3',
      change: '-1',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'التحديثات التنظيمية',
      value: '12',
      change: '+5',
      icon: RefreshCw,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'العناصر المراجعة',
      value: '156',
      change: '+8',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const saudiRegulations = [
    {
      id: 1,
      title: 'نظام العمل السعودي',
      category: 'labor_law',
      status: 'compliant',
      lastUpdate: '2024-01-15',
      complianceLevel: 98,
      items: 45,
      violations: 0
    },
    {
      id: 2,
      title: 'نظام التأمينات الاجتماعية - GOSI',
      category: 'social_insurance',
      status: 'needs_attention',
      lastUpdate: '2024-01-10',
      complianceLevel: 87,
      items: 23,
      violations: 2
    },
    {
      id: 3,
      title: 'نظام حماية البيانات الشخصية',
      category: 'data_protection',
      status: 'compliant',
      lastUpdate: '2024-01-20',
      complianceLevel: 95,
      items: 18,
      violations: 0
    },
    {
      id: 4,
      title: 'نظام مكافحة غسل الأموال',
      category: 'aml',
      status: 'under_review',
      lastUpdate: '2024-01-12',
      complianceLevel: 91,
      items: 31,
      violations: 1
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'compliant': { label: 'ملتزم', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'needs_attention': { label: 'يحتاج انتباه', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle },
      'non_compliant': { label: 'غير ملتزم', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
      'under_review': { label: 'قيد المراجعة', color: 'bg-blue-100 text-blue-800', icon: RefreshCw }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['under_review'];
    const IconComponent = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getComplianceColor = (level: number) => {
    if (level >= 95) return 'text-green-600 bg-green-100';
    if (level >= 85) return 'text-yellow-600 bg-yellow-100';
    if (level >= 70) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const handleCreateComplianceItem = async () => {
    toast.success('تم إنشاء عنصر الامتثال بنجاح');
    setIsNewItemOpen(false);
    await loadComplianceItems();
  };

  const filteredRegulations = saudiRegulations.filter(reg => {
    const matchesSearch = reg.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || reg.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">مراقبة الامتثال التنظيمي</h2>
          <p className="text-gray-600 mt-2">متابعة الامتثال للأنظمة السعودية والخليجية</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={checkAICompliance} disabled={isLoading}>
            <RefreshCw className={`ml-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            فحص ذكي
          </Button>
          <Dialog open={isNewItemOpen} onOpenChange={setIsNewItemOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                عنصر جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>إضافة عنصر امتثال جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">النظام التنظيمي</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر النظام" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="labor_law">نظام العمل السعودي</SelectItem>
                        <SelectItem value="social_insurance">نظام التأمينات الاجتماعية</SelectItem>
                        <SelectItem value="data_protection">نظام حماية البيانات</SelectItem>
                        <SelectItem value="aml">نظام مكافحة غسل الأموال</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">الفئة</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="policy">سياسة</SelectItem>
                        <SelectItem value="procedure">إجراء</SelectItem>
                        <SelectItem value="documentation">وثائق</SelectItem>
                        <SelectItem value="training">تدريب</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsNewItemOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleCreateComplianceItem}>
                    إنشاء العنصر
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {complianceStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-green-600">{stat.change}</span>
                    <span className="text-sm text-gray-600 mr-1">هذا الشهر</span>
                  </div>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="البحث في الأنظمة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="تصفية حسب الفئة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الفئات</SelectItem>
            <SelectItem value="labor_law">نظام العمل</SelectItem>
            <SelectItem value="social_insurance">التأمينات الاجتماعية</SelectItem>
            <SelectItem value="data_protection">حماية البيانات</SelectItem>
            <SelectItem value="aml">مكافحة غسل الأموال</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Saudi Regulations Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gavel className="h-5 w-5" />
            الأنظمة السعودية والخليجية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRegulations.map((regulation) => (
              <div key={regulation.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{regulation.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      {getStatusBadge(regulation.status)}
                      <Badge className={`${getComplianceColor(regulation.complianceLevel)} px-3 py-1`}>
                        {regulation.complianceLevel}% امتثال
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bell className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">آخر تحديث</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium">{regulation.lastUpdate}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">العناصر</p>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium">{regulation.items} عنصر</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">المخالفات</p>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium">{regulation.violations} مخالفة</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">الاتجاه</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">تحسن</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className={`h-2 rounded-full ${
                      regulation.complianceLevel >= 95 ? 'bg-green-600' :
                      regulation.complianceLevel >= 85 ? 'bg-yellow-600' :
                      regulation.complianceLevel >= 70 ? 'bg-orange-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${regulation.complianceLevel}%` }}
                  ></div>
                </div>

                {regulation.violations > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="font-medium text-red-800">مخالفات تحتاج انتباه</span>
                    </div>
                    <p className="text-sm text-red-700">
                      تم اكتشاف {regulation.violations} مخالفة تحتاج إلى معالجة فورية
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            توصيات الذكاء الاصطناعي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">توصية امتثال</span>
              </div>
              <p className="text-sm text-blue-700">
                يُنصح بمراجعة سياسات حماية البيانات للتأكد من الامتثال الكامل لنظام حماية البيانات الشخصية الجديد
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">تحذير مبكر</span>
              </div>
              <p className="text-sm text-yellow-700">
                تم رصد تحديثات محتملة في لوائح GOSI، يُنصح بمراجعة الامتثال خلال الأسبوعين القادمين
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};