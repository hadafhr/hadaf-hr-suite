import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Filter, 
  Eye, 
  Grid,
  List,
  Mail,
  Phone,
  Calendar,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Edit,
  User
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  nameAr: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  manager: string;
  status: 'active' | 'on_leave' | 'terminated';
  joinDate: string;
  yearsInCompany: number;
  profilePicture?: string;
  performanceScore: number;
  attendanceRate: number;
  tasks: number;
  completedTasks: number;
  salary: number;
  leaveBalance: number;
  role: 'employee' | 'manager' | 'hr_admin';
  skills: string[];
  certifications: string[];
  riskScore?: number;
  burnoutRisk?: 'low' | 'medium' | 'high';
}

interface EmployeeDirectoryProps {
  employees: Employee[];
  onViewProfile: (employee: Employee) => void;
  onChatWithEmployee?: (employee: Employee) => void;
  onEditEmployee?: (employee: Employee) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterDepartment: string;
  setFilterDepartment: (dept: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  departments: string[];
  statuses: { value: string; label: string }[];
  getStatusBadge: (status: string) => React.ReactNode;
  getBurnoutRiskColor: (risk: string) => string;
  userRole: 'employee' | 'manager' | 'hr_admin';
}

const EmployeeDirectory: React.FC<EmployeeDirectoryProps> = ({
  employees,
  onViewProfile,
  onChatWithEmployee,
  onEditEmployee,
  searchTerm,
  setSearchTerm,
  filterDepartment,
  setFilterDepartment,
  filterStatus,
  setFilterStatus,
  viewMode,
  setViewMode,
  departments,
  statuses,
  getStatusBadge,
  getBurnoutRiskColor,
  userRole
}) => {

  const EmployeeCard = ({ employee }: { employee: Employee }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border border-slate-200/60">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Profile Picture */}
          <Avatar className="h-16 w-16 ring-2 ring-primary/20">
            <AvatarImage src={employee.profilePicture} alt={employee.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
              {employee.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-1">{employee.name}</h3>
                <p className="text-primary font-medium mb-1">{employee.position}</p>
                <p className="text-slate-600 text-sm">{employee.department}</p>
              </div>
              {getStatusBadge(employee.status)}
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-slate-700">الأداء</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={employee.performanceScore} className="flex-1 h-2" />
                  <span className="text-sm font-bold text-slate-900">{employee.performanceScore}%</span>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-slate-700">الحضور</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={employee.attendanceRate} className="flex-1 h-2" />
                  <span className="text-sm font-bold text-slate-900">{employee.attendanceRate}%</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center bg-blue-50 rounded-lg p-2">
                <div className="text-lg font-bold text-blue-600">{employee.completedTasks}/{employee.tasks}</div>
                <div className="text-xs text-blue-800">المهام</div>
              </div>
              <div className="text-center bg-green-50 rounded-lg p-2">
                <div className="text-lg font-bold text-green-600">{employee.leaveBalance}</div>
                <div className="text-xs text-green-800">رصيد الإجازات</div>
              </div>
              <div className="text-center bg-purple-50 rounded-lg p-2">
                <div className="text-lg font-bold text-purple-600">{employee.yearsInCompany}</div>
                <div className="text-xs text-purple-800">سنة خدمة</div>
              </div>
            </div>

            {/* AI Insights */}
            {employee.burnoutRisk && (
              <div className={`text-xs font-medium mb-3 p-2 rounded-lg ${
                employee.burnoutRisk === 'high' ? 'bg-red-50 text-red-700' :
                employee.burnoutRisk === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                'bg-green-50 text-green-700'
              }`}>
                <AlertTriangle className="h-3 w-3 inline mr-1" />
                مخاطر الإرهاق: {employee.burnoutRisk === 'high' ? 'عالية' : employee.burnoutRisk === 'medium' ? 'متوسطة' : 'منخفضة'}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button 
                onClick={() => onViewProfile(employee)}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <Eye className="h-4 w-4 mr-2" />
                عرض الملف
              </Button>
              
              {(userRole === 'hr_admin' || userRole === 'manager') && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="px-3"
                    onClick={() => onChatWithEmployee?.(employee)}
                    title="بدء محادثة"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="px-3"
                    onClick={() => onEditEmployee?.(employee)}
                    title="تعديل الملف"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EmployeeRow = ({ employee }: { employee: Employee }) => (
    <Card className="mb-2 hover:shadow-md transition-all duration-200 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Profile */}
          <Avatar className="h-12 w-12">
            <AvatarImage src={employee.profilePicture} alt={employee.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {employee.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          {/* Basic Info */}
          <div className="flex-1 grid grid-cols-6 gap-4 items-center">
            <div>
              <div className="font-medium text-slate-900">{employee.name}</div>
              <div className="text-sm text-slate-600">{employee.position}</div>
            </div>
            
            <div className="text-sm text-slate-600">{employee.department}</div>
            
            <div>{getStatusBadge(employee.status)}</div>
            
            <div className="text-center">
              <div className="text-sm font-medium">{employee.performanceScore}%</div>
              <Progress value={employee.performanceScore} className="h-1 w-16 mx-auto" />
            </div>
            
            <div className="text-center">
              <div className="text-sm font-medium">{employee.attendanceRate}%</div>
              <Progress value={employee.attendanceRate} className="h-1 w-16 mx-auto" />
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                onClick={() => onViewProfile(employee)}
                size="sm"
                variant="outline"
              >
                <Eye className="h-4 w-4" />
              </Button>
              
              {(userRole === 'hr_admin' || userRole === 'manager') && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onChatWithEmployee?.(employee)}
                    title="بدء محادثة"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEditEmployee?.(employee)}
                    title="تعديل الملف"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/60">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="البحث بالاسم، البريد الإلكتروني، أو المنصب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 bg-white/60 border-slate-200"
              />
            </div>
            
            {/* Filters */}
            <div className="flex items-center gap-3">
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-[180px] bg-white/60">
                  <SelectValue placeholder="جميع الأقسام" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأقسام</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px] bg-white/60">
                  <SelectValue placeholder="جميع الحالات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* View Toggle */}
              <div className="flex items-center bg-slate-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="px-3"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <div className="text-slate-600">
          عرض {employees.length} موظف
        </div>
        
        {/* AI Insights Summary */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>{employees.filter(e => e.burnoutRisk === 'low').length} منخفض المخاطر</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>{employees.filter(e => e.burnoutRisk === 'medium').length} متوسط المخاطر</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>{employees.filter(e => e.burnoutRisk === 'high').length} عالي المخاطر</span>
          </div>
        </div>
      </div>

      {/* Employee List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {employees.map(employee => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {/* List Header */}
          <Card className="bg-slate-100/80">
            <CardContent className="p-4">
              <div className="grid grid-cols-6 gap-4 text-sm font-medium text-slate-700">
                <div>الموظف</div>
                <div>القسم</div>
                <div>الحالة</div>
                <div className="text-center">الأداء</div>
                <div className="text-center">الحضور</div>
                <div className="text-center">الإجراءات</div>
              </div>
            </CardContent>
          </Card>
          
          {employees.map(employee => (
            <EmployeeRow key={employee.id} employee={employee} />
          ))}
        </div>
      )}
      
      {/* Empty State */}
      {employees.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <User className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-600 mb-2">لا توجد نتائج</h3>
            <p className="text-slate-500">جرب تعديل معايير البحث أو الفلترة</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeeDirectory;