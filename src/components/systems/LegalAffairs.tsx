import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Scale, FileText, AlertTriangle, CheckCircle, Clock, Users, Search } from 'lucide-react';

interface LegalCase {
  id: string;
  title: string;
  type: 'عمالي' | 'تجاري' | 'مدني' | 'إداري';
  status: 'جديد' | 'قيد المراجعة' | 'في المحكمة' | 'مغلق';
  priority: 'عالي' | 'متوسط' | 'منخفض';
  assignedLawyer: string;
  createdDate: string;
  nextHearing?: string;
  description: string;
  relatedEmployees?: string[];
}

interface LegalAffairsProps {
  onBack: () => void;
}

export const LegalAffairs: React.FC<LegalAffairsProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const legalCases: LegalCase[] = [
    {
      id: 'LC001',
      title: 'نزاع عمالي - إنهاء خدمة',
      type: 'عمالي',
      status: 'قيد المراجعة',
      priority: 'عالي',
      assignedLawyer: 'المحامي أحمد السالم',
      createdDate: '2024-03-15',
      nextHearing: '2024-04-10',
      description: 'نزاع حول إنهاء خدمة موظف وحقوقه المالية',
      relatedEmployees: ['أحمد محمد العلي']
    },
    {
      id: 'LC002',
      title: 'مراجعة عقد عمل جماعي',
      type: 'عمالي',
      status: 'جديد',
      priority: 'متوسط',
      assignedLawyer: 'المحامية فاطمة الخالد',
      createdDate: '2024-03-20',
      description: 'مراجعة وتحديث العقد الجماعي للموظفين',
      relatedEmployees: ['جميع الموظفين']
    },
    {
      id: 'LC003',
      title: 'قضية تأمينات اجتماعية',
      type: 'إداري',
      status: 'في المحكمة',
      priority: 'عالي',
      assignedLawyer: 'المحامي محمد الأحمد',
      createdDate: '2024-02-28',
      nextHearing: '2024-04-05',
      description: 'نزاع مع التأمينات الاجتماعية حول مساهمات الشركة'
    },
    {
      id: 'LC004',
      title: 'استشارة قانونية - سياسات HR',
      type: 'إداري',
      status: 'مغلق',
      priority: 'منخفض',
      assignedLawyer: 'المحامية سارا العتيبي',
      createdDate: '2024-01-15',
      description: 'استشارة حول تطوير سياسات الموارد البشرية الجديدة'
    }
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      'جديد': 'bg-blue-100 text-blue-800 border-blue-200',
      'قيد المراجعة': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'في المحكمة': 'bg-orange-100 text-orange-800 border-orange-200',
      'مغلق': 'bg-green-100 text-green-800 border-green-200'
    };
    return config[status as keyof typeof config] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadge = (priority: string) => {
    const config = {
      'عالي': 'bg-red-100 text-red-800 border-red-200',
      'متوسط': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'منخفض': 'bg-green-100 text-green-800 border-green-200'
    };
    return config[priority as keyof typeof config] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'جديد':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'قيد المراجعة':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'في المحكمة':
        return <Scale className="h-4 w-4 text-orange-600" />;
      case 'مغلق':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredCases = legalCases.filter(legalCase => {
    const matchesSearch = legalCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         legalCase.assignedLawyer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || legalCase.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const activeCases = legalCases.filter(c => c.status !== 'مغلق').length;
  const highPriorityCases = legalCases.filter(c => c.priority === 'عالي').length;
  const upcomingHearings = legalCases.filter(c => c.nextHearing).length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="hover:bg-[#009F87]/10"
        >
          <ArrowLeft className="h-4 w-4 ml-2" />
          العودة
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#009F87]/10 rounded-lg">
            <Scale className="h-6 w-6 text-[#009F87]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#009F87]">الشؤون القانونية</h1>
            <p className="text-muted-foreground">إدارة القضايا القانونية والاستشارات</p>
          </div>
        </div>
        <div className="mr-auto">
          <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
            <FileText className="h-4 w-4 ml-2" />
            إضافة قضية جديدة
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Scale className="h-6 w-6 text-[#009F87]" />
            </div>
            <div className="text-2xl font-bold text-[#009F87] mb-1">{legalCases.length}</div>
            <div className="text-sm text-muted-foreground">إجمالي القضايا</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-1">{activeCases}</div>
            <div className="text-sm text-muted-foreground">قضايا نشطة</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-red-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600 mb-1">{highPriorityCases}</div>
            <div className="text-sm text-muted-foreground">أولوية عالية</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Scale className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600 mb-1">{upcomingHearings}</div>
            <div className="text-sm text-muted-foreground">جلسات قادمة</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث في القضايا القانونية..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={selectedFilter} 
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-[#009F87]/20 rounded-lg px-3 py-2 focus:border-[#009F87] w-full md:w-48"
            >
              <option value="all">جميع الحالات</option>
              <option value="جديد">جديد</option>
              <option value="قيد المراجعة">قيد المراجعة</option>
              <option value="في المحكمة">في المحكمة</option>
              <option value="مغلق">مغلق</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Legal Cases */}
      <div className="space-y-4">
        {filteredCases.map((legalCase) => (
          <Card key={legalCase.id} className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#009F87]/10 rounded-lg">
                    {getStatusIcon(legalCase.status)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{legalCase.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{legalCase.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>المحامي المكلف: {legalCase.assignedLawyer}</span>
                      <span>•</span>
                      <span>تاريخ الإنشاء: {legalCase.createdDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={getStatusBadge(legalCase.status)}>
                    {legalCase.status}
                  </Badge>
                  <Badge className={getPriorityBadge(legalCase.priority)}>
                    أولوية {legalCase.priority}
                  </Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-medium text-blue-900 mb-1">نوع القضية</div>
                  <div className="text-blue-700">{legalCase.type}</div>
                </div>
                
                {legalCase.nextHearing && (
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="font-medium text-orange-900 mb-1">الجلسة القادمة</div>
                    <div className="text-orange-700">{legalCase.nextHearing}</div>
                  </div>
                )}
                
                {legalCase.relatedEmployees && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="font-medium text-green-900 mb-1">الموظفون المعنيون</div>
                    <div className="text-green-700 flex items-center">
                      <Users className="h-4 w-4 ml-1" />
                      {legalCase.relatedEmployees.length} موظف
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                  عرض التفاصيل
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-blue-600 hover:text-white">
                  تحديث الحالة
                </Button>
                {legalCase.nextHearing && (
                  <Button variant="outline" size="sm" className="hover:bg-orange-600 hover:text-white">
                    إضافة للتقويم
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
          <CardContent className="p-8 text-center">
            <Scale className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">لا توجد قضايا</h3>
            <p className="text-muted-foreground">لم يتم العثور على قضايا تطابق معايير البحث المحددة</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};