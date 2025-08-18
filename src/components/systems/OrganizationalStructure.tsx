import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Network, Users, Building2, Target, Plus, Edit } from 'lucide-react';

interface Organization {
  id: string;
  name: string;
  type: 'إدارة' | 'قسم' | 'وحدة' | 'فريق';
  parentId?: string;
  managerId: string;
  managerName: string;
  employeeCount: number;
  level: number;
  children?: Organization[];
}

interface OrganizationalStructureProps {
  onBack: () => void;
}

export const OrganizationalStructure: React.FC<OrganizationalStructureProps> = ({ onBack }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  
  const organizationData: Organization = {
    id: 'CEO',
    name: 'المدير التنفيذي',
    type: 'إدارة',
    managerId: 'EMP001',
    managerName: 'أحمد محمد الرئيس',
    employeeCount: 245,
    level: 0,
    children: [
      {
        id: 'HR',
        name: 'إدارة الموارد البشرية',
        type: 'إدارة',
        parentId: 'CEO',
        managerId: 'EMP002',
        managerName: 'فاطمة أحمد العلي',
        employeeCount: 15,
        level: 1,
        children: [
          {
            id: 'RECRUIT',
            name: 'قسم التوظيف',
            type: 'قسم',
            parentId: 'HR',
            managerId: 'EMP003',
            managerName: 'محمد سالم الخالد',
            employeeCount: 5,
            level: 2
          },
          {
            id: 'PAYROLL',
            name: 'قسم الرواتب',
            type: 'قسم',
            parentId: 'HR',
            managerId: 'EMP004',
            managerName: 'سارة عبدالله النصر',
            employeeCount: 4,
            level: 2
          }
        ]
      },
      {
        id: 'IT',
        name: 'إدارة تقنية المعلومات',
        type: 'إدارة',
        parentId: 'CEO',
        managerId: 'EMP005',
        managerName: 'عبدالرحمن يوسف التميمي',
        employeeCount: 25,
        level: 1,
        children: [
          {
            id: 'DEV',
            name: 'قسم التطوير',
            type: 'قسم',
            parentId: 'IT',
            managerId: 'EMP006',
            managerName: 'نوال أحمد الشمري',
            employeeCount: 15,
            level: 2
          },
          {
            id: 'SUPPORT',
            name: 'قسم الدعم التقني',
            type: 'قسم',
            parentId: 'IT',
            managerId: 'EMP007',
            managerName: 'خالد محمد البلوي',
            employeeCount: 8,
            level: 2
          }
        ]
      },
      {
        id: 'FIN',
        name: 'إدارة المالية',
        type: 'إدارة',
        parentId: 'CEO',
        managerId: 'EMP008',
        managerName: 'عبدالله يوسف الخالد',
        employeeCount: 18,
        level: 1,
        children: [
          {
            id: 'ACC',
            name: 'قسم المحاسبة',
            type: 'قسم',
            parentId: 'FIN',
            managerId: 'EMP009',
            managerName: 'منى سعد العتيبي',
            employeeCount: 10,
            level: 2
          }
        ]
      }
    ]
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'إدارة': 'bg-purple-100 text-purple-800 border-purple-200',
      'قسم': 'bg-blue-100 text-blue-800 border-blue-200',
      'وحدة': 'bg-green-100 text-green-800 border-green-200',
      'فريق': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const renderOrganizationNode = (node: Organization, isRoot = false) => {
    const isSelected = selectedNode === node.id;
    
    return (
      <div key={node.id} className="space-y-4">
        <Card 
          className={`bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all cursor-pointer ${
            isSelected ? 'ring-2 ring-[#009F87] shadow-lg' : ''
          }`}
          onClick={() => setSelectedNode(isSelected ? null : node.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isRoot ? 'bg-[#009F87]/10' : 'bg-blue-100'}`}>
                  {isRoot ? (
                    <Target className="h-5 w-5 text-[#009F87]" />
                  ) : (
                    <Building2 className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{node.name}</h3>
                  <p className="text-sm text-muted-foreground">{node.managerName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getTypeColor(node.type)}>
                  {node.type}
                </Badge>
                <Badge variant="outline">
                  <Users className="h-3 w-3 ml-1" />
                  {node.employeeCount}
                </Badge>
              </div>
            </div>
            
            {isSelected && (
              <div className="space-y-3 border-t pt-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-[#009F87]/5 p-2 rounded text-center">
                    <div className="font-semibold text-[#009F87]">{node.employeeCount}</div>
                    <div className="text-xs text-muted-foreground">عدد الموظفين</div>
                  </div>
                  <div className="bg-blue-50 p-2 rounded text-center">
                    <div className="font-semibold text-blue-600">{node.children?.length || 0}</div>
                    <div className="text-xs text-muted-foreground">الأقسام التابعة</div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 ml-1" />
                    تحرير
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Plus className="h-4 w-4 ml-1" />
                    إضافة قسم
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Render Children */}
        {node.children && node.children.length > 0 && (
          <div className={`mr-8 space-y-4 ${node.level === 0 ? 'border-r-2 border-[#009F87]/20 pr-6' : 'border-r-2 border-gray-200 pr-6'}`}>
            {node.children.map(child => renderOrganizationNode(child))}
          </div>
        )}
      </div>
    );
  };

  const getTotalStats = (node: Organization): { departments: number; employees: number } => {
    let departments = 1;
    let employees = node.employeeCount;
    
    if (node.children) {
      node.children.forEach(child => {
        const childStats = getTotalStats(child);
        departments += childStats.departments;
        employees += childStats.employees;
      });
    }
    
    return { departments: departments - 1, employees }; // -1 to exclude root
  };

  const stats = getTotalStats(organizationData);

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
            <Network className="h-6 w-6 text-[#009F87]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#009F87]">الهيكل التنظيمي</h1>
            <p className="text-muted-foreground">عرض وإدارة الهيكل التنظيمي للشركة</p>
          </div>
        </div>
        <div className="mr-auto">
          <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
            <Plus className="h-4 w-4 ml-2" />
            إضافة وحدة تنظيمية
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#009F87] mb-1">{stats.departments}</div>
            <div className="text-sm text-muted-foreground">إجمالي الوحدات</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{stats.employees}</div>
            <div className="text-sm text-muted-foreground">إجمالي الموظفين</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">3</div>
            <div className="text-sm text-muted-foreground">المستويات الإدارية</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">15</div>
            <div className="text-sm text-muted-foreground">متوسط حجم القسم</div>
          </CardContent>
        </Card>
      </div>

      {/* Organization Chart */}
      <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#009F87]">
            <Network className="h-6 w-6" />
            الهيكل التنظيمي التفاعلي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {renderOrganizationNode(organizationData, true)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};