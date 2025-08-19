import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Building2,
  Users,
  Eye,
  ChevronDown,
  ChevronRight,
  Search,
  Filter,
  ZoomIn,
  ZoomOut,
  Download,
  Expand,
  Minimize
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

interface OrganizationalNode {
  employee: Employee;
  children: OrganizationalNode[];
  level: number;
}

interface OrganizationalChartProps {
  employees: Employee[];
  onViewProfile: (employee: Employee) => void;
}

const OrganizationalChart: React.FC<OrganizationalChartProps> = ({
  employees,
  onViewProfile
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewMode, setViewMode] = useState<'tree' | 'compact'>('tree');

  // Build organizational hierarchy
  const organizationalTree = useMemo(() => {
    const employeeMap = new Map<string, Employee>();
    const childrenMap = new Map<string, Employee[]>();

    // Create maps for quick lookup
    employees.forEach(emp => {
      employeeMap.set(emp.name, emp);
      if (!childrenMap.has(emp.manager)) {
        childrenMap.set(emp.manager, []);
      }
      if (emp.manager && emp.manager !== 'الإدارة العليا') {
        const managerEmployees = childrenMap.get(emp.manager) || [];
        managerEmployees.push(emp);
        childrenMap.set(emp.manager, managerEmployees);
      }
    });

    // Build tree structure
    const buildTree = (managerName: string, level: number = 0): OrganizationalNode[] => {
      const children = childrenMap.get(managerName) || [];
      return children.map(child => ({
        employee: child,
        children: buildTree(child.name, level + 1),
        level
      }));
    };

    // Find root managers (those managed by "الإدارة العليا")
    const rootManagers = employees.filter(emp => emp.manager === 'الإدارة العليا');
    
    return rootManagers.map(manager => ({
      employee: manager,
      children: buildTree(manager.name, 1),
      level: 0
    }));
  }, [employees]);

  // Filter by department if selected
  const filteredTree = useMemo(() => {
    if (!selectedDepartment) return organizationalTree;
    
    const filterByDepartment = (nodes: OrganizationalNode[]): OrganizationalNode[] => {
      return nodes
        .filter(node => node.employee.department === selectedDepartment)
        .map(node => ({
          ...node,
          children: filterByDepartment(node.children)
        }));
    };
    
    return filterByDepartment(organizationalTree);
  }, [organizationalTree, selectedDepartment]);

  const departments = [...new Set(employees.map(emp => emp.department))];

  const toggleExpanded = (employeeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(employeeId)) {
      newExpanded.delete(employeeId);
    } else {
      newExpanded.add(employeeId);
    }
    setExpandedNodes(newExpanded);
  };

  const expandAll = () => {
    const allIds = new Set(employees.map(emp => emp.id));
    setExpandedNodes(allIds);
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'border-green-200 bg-green-50';
      case 'on_leave': return 'border-yellow-200 bg-yellow-50';
      case 'terminated': return 'border-red-200 bg-red-50';
      default: return 'border-slate-200 bg-slate-50';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'hr_admin': return '👑';
      case 'manager': return '🎯';
      default: return '👤';
    }
  };

  const EmployeeNode: React.FC<{ node: OrganizationalNode; showChildren?: boolean }> = ({ 
    node, 
    showChildren = true 
  }) => {
    const { employee, children } = node;
    const isExpanded = expandedNodes.has(employee.id);
    const hasChildren = children.length > 0;

    return (
      <div className="flex flex-col items-center">
        {/* Employee Card */}
        <Card className={`w-64 mb-4 hover:shadow-lg transition-all duration-200 ${getStatusColor(employee.status)} border-2`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {/* Profile Picture */}
              <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
                <AvatarImage src={employee.profilePicture} alt={employee.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {employee.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 leading-tight">
                      {getRoleIcon(employee.role)} {employee.name}
                    </h4>
                    <p className="text-xs text-primary font-medium">{employee.position}</p>
                    <p className="text-xs text-slate-600">{employee.department}</p>
                  </div>
                </div>

                {/* Performance Indicators */}
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${
                    employee.performanceScore >= 90 ? 'bg-green-500' :
                    employee.performanceScore >= 70 ? 'bg-blue-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-xs font-medium">{employee.performanceScore}% أداء</span>
                  
                  <div className={`w-2 h-2 rounded-full ${
                    employee.attendanceRate >= 95 ? 'bg-green-500' :
                    employee.attendanceRate >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-xs font-medium">{employee.attendanceRate}% حضور</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <Button 
                    size="sm" 
                    onClick={() => onViewProfile(employee)}
                    className="flex-1 text-xs h-7"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    عرض
                  </Button>
                  
                  {hasChildren && showChildren && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleExpanded(employee.id)}
                      className="px-2 h-7"
                    >
                      {isExpanded ? 
                        <ChevronDown className="h-3 w-3" /> : 
                        <ChevronRight className="h-3 w-3" />
                      }
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Children */}
        {hasChildren && showChildren && isExpanded && (
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-slate-300 transform -translate-x-1/2 -translate-y-4"></div>
            
            {/* Children Container */}
            <div className="flex flex-wrap justify-center gap-8 pt-6">
              {children.map((child) => (
                <div key={child.employee.id} className="relative">
                  {/* Horizontal connection line */}
                  <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-slate-300 transform -translate-x-1/2 -translate-y-6"></div>
                  
                  <EmployeeNode node={child} />
                </div>
              ))}
            </div>
            
            {/* Horizontal connecting line for multiple children */}
            {children.length > 1 && (
              <div 
                className="absolute top-0 h-0.5 bg-slate-300 transform -translate-y-6"
                style={{
                  left: `${(100 / children.length) / 2}%`,
                  right: `${(100 / children.length) / 2}%`,
                }}
              ></div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Compact view component
  const CompactView: React.FC<{ nodes: OrganizationalNode[] }> = ({ nodes }) => (
    <div className="space-y-4">
      {nodes.map(node => (
        <Card key={node.employee.id} className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={node.employee.profilePicture} />
                <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
                  {node.employee.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 grid grid-cols-4 gap-4 items-center">
                <div>
                  <div className="font-medium text-slate-900">
                    {getRoleIcon(node.employee.role)} {node.employee.name}
                  </div>
                  <div className="text-sm text-slate-600">{node.employee.position}</div>
                </div>
                
                <div className="text-sm text-slate-600">{node.employee.department}</div>
                
                <div className="text-sm">
                  <Badge variant={node.employee.status === 'active' ? 'default' : 'secondary'}>
                    {node.employee.status === 'active' ? 'نشط' : 
                     node.employee.status === 'on_leave' ? 'إجازة' : 'منتهي'}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-xs text-slate-600">الأداء: {node.employee.performanceScore}%</div>
                    <div className="text-xs text-slate-600">الحضور: {node.employee.attendanceRate}%</div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onViewProfile(node.employee)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Children in compact view */}
            {node.children.length > 0 && (
              <div className="mt-4 ml-6 border-r-2 border-slate-200 pr-4">
                <CompactView nodes={node.children} />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-slate-900">الهيكل التنظيمي</h2>
              </div>
              
              <Badge variant="outline" className="bg-primary/10">
                {employees.length} موظف
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Department Filter */}
              <select 
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-md text-sm bg-white/60"
              >
                <option value="">جميع الأقسام</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              
              {/* View Mode Toggle */}
              <div className="flex items-center bg-slate-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'tree' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('tree')}
                >
                  شجرة
                </Button>
                <Button
                  variant={viewMode === 'compact' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('compact')}
                >
                  مضغوط
                </Button>
              </div>
              
              {/* Tree Controls */}
              {viewMode === 'tree' && (
                <>
                  <Button variant="outline" size="sm" onClick={expandAll}>
                    <Expand className="h-4 w-4 mr-1" />
                    توسيع الكل
                  </Button>
                  <Button variant="outline" size="sm" onClick={collapseAll}>
                    <Minimize className="h-4 w-4 mr-1" />
                    طي الكل
                  </Button>
                </>
              )}
              
              {/* Zoom Controls for Tree View */}
              {viewMode === 'tree' && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm px-2">{zoomLevel}%</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                تصدير
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Organizational Chart */}
      <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 overflow-auto">
        {viewMode === 'tree' ? (
          <div 
            className="flex justify-center"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            <div className="space-y-8">
              {filteredTree.map(node => (
                <EmployeeNode key={node.employee.id} node={node} />
              ))}
            </div>
          </div>
        ) : (
          <CompactView nodes={filteredTree} />
        )}
        
        {/* Empty State */}
        {filteredTree.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-600 mb-2">لا توجد نتائج</h3>
            <p className="text-slate-500">
              {selectedDepartment ? 
                `لا توجد موظفين في قسم ${selectedDepartment}` : 
                'لا توجد بيانات موظفين لعرضها'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationalChart;