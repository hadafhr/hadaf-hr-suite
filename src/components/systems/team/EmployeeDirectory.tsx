import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, Grid, List, Eye, Edit, Mail, Phone } from 'lucide-react';

interface TeamMember {
  id: string;
  employeeNumber: string;
  name: string;
  position: string;
  department: string;
  status: string;
  level: string;
  email: string;
  phone: string;
  performanceScore: number;
  attendanceRate: number;
}

interface EmployeeDirectoryProps {
  members: TeamMember[];
  onSelectEmployee: (employee: TeamMember) => void;
}

const EmployeeDirectory: React.FC<EmployeeDirectoryProps> = ({ members, onSelectEmployee }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Terminated': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'Active': 'نشط',
      'On Leave': 'في إجازة',
      'Inactive': 'غير نشط',
      'Terminated': 'منتهي الخدمة'
    };
    return statusMap[status] || status;
  };

  const getDepartmentText = (dept: string) => {
    const deptMap: { [key: string]: string } = {
      'IT': 'تقنية المعلومات',
      'HR': 'الموارد البشرية',
      'Finance': 'المالية',
      'Marketing': 'التسويق',
      'Operations': 'العمليات',
      'Sales': 'المبيعات'
    };
    return deptMap[dept] || dept;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="البحث عن الموظفين..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="تصفية حسب..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الموظفين</SelectItem>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="on-leave">في إجازة</SelectItem>
              <SelectItem value="it">تقنية المعلومات</SelectItem>
              <SelectItem value="hr">الموارد البشرية</SelectItem>
              <SelectItem value="finance">المالية</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Employee Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="relative mx-auto w-20 h-20">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="" alt={member.name} />
                      <AvatarFallback className="text-lg">
                        {member.name.split(' ')[0]?.[0]}{member.name.split(' ')[1]?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-muted-foreground text-sm">{member.position}</p>
                    <p className="text-muted-foreground text-xs">{getDepartmentText(member.department)}</p>
                  </div>

                  <div className="flex justify-center">
                    <Badge variant="secondary" className={getStatusColor(member.status)}>
                      {getStatusText(member.status)}
                    </Badge>
                  </div>

                  <div className="flex justify-center gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onSelectEmployee(member)}
                    >
                      <Eye className="h-4 w-4 ml-1" />
                      عرض
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {members.map((member) => (
                <div key={member.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="" alt={member.name} />
                        <AvatarFallback>
                          {member.name.split(' ')[0]?.[0]}{member.name.split(' ')[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.position}</p>
                        <p className="text-xs text-muted-foreground">{getDepartmentText(member.department)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className={getStatusColor(member.status)}>
                        {getStatusText(member.status)}
                      </Badge>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onSelectEmployee(member)}
                        >
                          <Eye className="h-4 w-4 ml-1" />
                          عرض
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
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

export default EmployeeDirectory;