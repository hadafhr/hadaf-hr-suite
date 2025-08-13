import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Scale,
  Grid,
  Users,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Check,
  X,
  Download,
  RotateCcw,
  AlertCircle,
  Target
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  currentScore: number;
  proposedScore: number;
  potential: number;
  performance: number;
  quadrant: string;
  justification: string;
  status: 'pending' | 'approved' | 'rejected';
  manager: string;
}

export const CalibrationWorkspace = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedTeam, setSelectedTeam] = useState('IT');
  const [calibrationMode, setCalibrationMode] = useState<'grid' | 'ninebox'>('grid');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [justificationText, setJustificationText] = useState('');

  // Demo calibration data
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: isRTL ? 'أحمد محمد' : 'Ahmed Mohammed',
      position: isRTL ? 'مطور برمجيات أول' : 'Senior Software Developer',
      department: 'IT',
      currentScore: 85,
      proposedScore: 85,
      potential: 80,
      performance: 85,
      quadrant: 'high-high',
      justification: '',
      status: 'pending',
      manager: isRTL ? 'سارة أحمد' : 'Sarah Ahmed'
    },
    {
      id: '2',
      name: isRTL ? 'فاطمة علي' : 'Fatima Ali',
      position: isRTL ? 'مطور واجهات' : 'Frontend Developer',
      department: 'IT',
      currentScore: 78,
      proposedScore: 80,
      potential: 75,
      performance: 78,
      quadrant: 'medium-high',
      justification: '',
      status: 'pending',
      manager: isRTL ? 'سارة أحمد' : 'Sarah Ahmed'
    },
    {
      id: '3',
      name: isRTL ? 'محمد حسن' : 'Mohammed Hassan',
      position: isRTL ? 'محلل أنظمة' : 'Systems Analyst',
      department: 'IT',
      currentScore: 72,
      proposedScore: 75,
      potential: 70,
      performance: 72,
      quadrant: 'medium-medium',
      justification: 'Improved collaboration skills and project delivery',
      status: 'approved',
      manager: isRTL ? 'سارة أحمد' : 'Sarah Ahmed'
    }
  ]);

  const teams = ['IT', 'Sales', 'Operations', 'Finance'];
  
  const nineBoxQuadrants = [
    { x: 0, y: 2, label: isRTL ? 'مخزون موهبة' : 'Talent Pool', color: 'bg-blue-100' },
    { x: 1, y: 2, label: isRTL ? 'نجوم صاعدة' : 'Rising Stars', color: 'bg-green-100' },
    { x: 2, y: 2, label: isRTL ? 'قادة المستقبل' : 'Future Leaders', color: 'bg-emerald-100' },
    { x: 0, y: 1, label: isRTL ? 'خبراء أساسيون' : 'Core Contributors', color: 'bg-yellow-100' },
    { x: 1, y: 1, label: isRTL ? 'مؤدون قويون' : 'Solid Performers', color: 'bg-orange-100' },
    { x: 2, y: 1, label: isRTL ? 'مواهب رئيسية' : 'Key Talent', color: 'bg-green-200' },
    { x: 0, y: 0, label: isRTL ? 'يحتاجون تطوير' : 'Development Needed', color: 'bg-red-100' },
    { x: 1, y: 0, label: isRTL ? 'مؤدون متوسطون' : 'Inconsistent Performers', color: 'bg-amber-100' },
    { x: 2, y: 0, label: isRTL ? 'قادة حاليون' : 'Current Leaders', color: 'bg-emerald-200' }
  ];

  const handleScoreChange = (employeeId: string, newScore: number) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === employeeId 
        ? { 
            ...emp, 
            proposedScore: newScore,
            status: newScore !== emp.currentScore ? 'pending' : 'approved'
          } 
        : emp
    ));
  };

  const handleJustificationSubmit = (employeeId: string) => {
    if (!justificationText.trim()) return;
    
    setEmployees(prev => prev.map(emp => 
      emp.id === employeeId 
        ? { ...emp, justification: justificationText, status: 'approved' }
        : emp
    ));
    setJustificationText('');
    setSelectedEmployee(null);
  };

  const handleApprovalBatch = () => {
    setEmployees(prev => prev.map(emp => ({ ...emp, status: 'approved' as const })));
    console.log('Batch approval completed');
  };

  const handleExportResults = () => {
    console.log('Exporting calibration results...');
  };

  const handleRevertChanges = () => {
    setEmployees(prev => prev.map(emp => ({ 
      ...emp, 
      proposedScore: emp.currentScore,
      status: 'approved' as const,
      justification: ''
    })));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return { variant: 'default' as const, label: isRTL ? 'موافق عليه' : 'Approved' };
      case 'rejected': return { variant: 'destructive' as const, label: isRTL ? 'مرفوض' : 'Rejected' };
      default: return { variant: 'secondary' as const, label: isRTL ? 'في انتظار' : 'Pending' };
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getQuadrantPosition = (potential: number, performance: number) => {
    const potentialLevel = potential >= 80 ? 2 : potential >= 70 ? 1 : 0;
    const performanceLevel = performance >= 80 ? 2 : performance >= 70 ? 1 : 0;
    return { x: performanceLevel, y: potentialLevel };
  };

  const filteredEmployees = employees.filter(emp => emp.department === selectedTeam);

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {isRTL ? 'مساحة عمل المعايرة' : 'Calibration Workspace'}
          </h2>
          <p className="text-muted-foreground">
            {isRTL ? 'معايرة التقييمات والنتائج النهائية' : 'Calibrate ratings and finalize scores'}
          </p>
        </div>
        
        <div className="flex gap-3">
          <select 
            value={selectedTeam} 
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            {teams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
          <Button 
            variant={calibrationMode === 'grid' ? 'default' : 'outline'}
            onClick={() => setCalibrationMode('grid')}
            className="gap-2"
          >
            <Grid className="w-4 h-4" />
            {isRTL ? 'شبكة' : 'Grid'}
          </Button>
          <Button 
            variant={calibrationMode === 'ninebox' ? 'default' : 'outline'}
            onClick={() => setCalibrationMode('ninebox')}
            className="gap-2"
          >
            <Target className="w-4 h-4" />
            {isRTL ? '9-صندوق' : '9-Box'}
          </Button>
        </div>
      </div>

      {/* Calibration Interface */}
      <Tabs value={calibrationMode} onValueChange={(value) => setCalibrationMode(value as 'grid' | 'ninebox')}>
        <TabsContent value="grid">
          <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" />
                {isRTL ? 'شبكة المعايرة' : 'Calibration Grid'}
              </CardTitle>
              <CardDescription>
                {isRTL ? `معايرة ${filteredEmployees.length} موظف في فريق ${selectedTeam}` : `Calibrating ${filteredEmployees.length} employees in ${selectedTeam} team`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className={`text-${isRTL ? 'right' : 'left'} py-3 font-semibold text-muted-foreground`}>
                        {isRTL ? 'الموظف' : 'Employee'}
                      </th>
                      <th className={`text-${isRTL ? 'right' : 'left'} py-3 font-semibold text-muted-foreground`}>
                        {isRTL ? 'النتيجة الحالية' : 'Current Score'}
                      </th>
                      <th className={`text-${isRTL ? 'right' : 'left'} py-3 font-semibold text-muted-foreground`}>
                        {isRTL ? 'النتيجة المقترحة' : 'Proposed Score'}
                      </th>
                      <th className={`text-${isRTL ? 'right' : 'left'} py-3 font-semibold text-muted-foreground`}>
                        {isRTL ? 'التغيير' : 'Change'}
                      </th>
                      <th className={`text-${isRTL ? 'right' : 'left'} py-3 font-semibold text-muted-foreground`}>
                        {isRTL ? 'الحالة' : 'Status'}
                      </th>
                      <th className={`text-${isRTL ? 'right' : 'left'} py-3 font-semibold text-muted-foreground`}>
                        {isRTL ? 'الإجراءات' : 'Actions'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => {
                      const scoreDiff = employee.proposedScore - employee.currentScore;
                      const statusBadge = getStatusBadge(employee.status);
                      
                      return (
                        <tr key={employee.id} className="border-b border-border hover:bg-accent/30">
                          <td className="py-4">
                            <div>
                              <p className="font-medium text-foreground">{employee.name}</p>
                              <p className="text-sm text-muted-foreground">{employee.position}</p>
                            </div>
                          </td>
                          <td className="py-4">
                            <span className={`text-lg font-semibold ${getScoreColor(employee.currentScore)}`}>
                              {employee.currentScore}
                            </span>
                          </td>
                          <td className="py-4">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={employee.proposedScore}
                              onChange={(e) => handleScoreChange(employee.id, parseInt(e.target.value) || 0)}
                              className="w-20"
                            />
                          </td>
                          <td className="py-4">
                            {scoreDiff !== 0 && (
                              <div className="flex items-center gap-1">
                                {scoreDiff > 0 ? (
                                  <TrendingUp className="w-4 h-4 text-green-600" />
                                ) : (
                                  <TrendingDown className="w-4 h-4 text-red-600" />
                                )}
                                <span className={scoreDiff > 0 ? 'text-green-600' : 'text-red-600'}>
                                  {scoreDiff > 0 ? '+' : ''}{scoreDiff}
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="py-4">
                            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                          </td>
                          <td className="py-4">
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => {
                                  setSelectedEmployee(employee);
                                  setJustificationText(employee.justification);
                                }}
                                className="gap-1"
                              >
                                <MessageSquare className="w-3 h-3" />
                                {isRTL ? 'مبرر' : 'Justify'}
                              </Button>
                              {employee.status === 'pending' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleJustificationSubmit(employee.id)}
                                  className="gap-1"
                                >
                                  <Check className="w-3 h-3" />
                                  {isRTL ? 'موافقة' : 'Approve'}
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ninebox">
          <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                {isRTL ? 'عرض 9-صندوق' : '9-Box View'}
              </CardTitle>
              <CardDescription>
                {isRTL ? 'الإمكانات مقابل الأداء' : 'Potential vs Performance Matrix'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 aspect-square max-w-2xl mx-auto">
                {nineBoxQuadrants.map((quadrant, index) => {
                  const employeesInQuadrant = filteredEmployees.filter(emp => {
                    const pos = getQuadrantPosition(emp.potential, emp.performance);
                    return pos.x === quadrant.x && pos.y === quadrant.y;
                  });

                  return (
                    <div 
                      key={index}
                      className={`${quadrant.color} p-4 rounded-lg border-2 border-border/20 min-h-[120px]`}
                    >
                      <h4 className="font-semibold text-sm mb-2">{quadrant.label}</h4>
                      <div className="space-y-1">
                        {employeesInQuadrant.map(emp => (
                          <div 
                            key={emp.id}
                            className="bg-white/80 p-2 rounded text-xs cursor-pointer hover:bg-white"
                            onClick={() => setSelectedEmployee(emp)}
                          >
                            <p className="font-medium">{emp.name}</p>
                            <p className="text-muted-foreground">{emp.proposedScore}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Axis Labels */}
              <div className="flex justify-between items-center mt-4 max-w-2xl mx-auto">
                <div className="text-sm text-muted-foreground">
                  {isRTL ? 'أداء منخفض' : 'Low Performance'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {isRTL ? 'أداء عالي' : 'High Performance'}
                </div>
              </div>
              <div className="flex flex-col items-center mt-2">
                <div className="text-sm text-muted-foreground -rotate-90 origin-center">
                  {isRTL ? 'إمكانات عالية' : 'High Potential'}
                </div>
                <div className="text-sm text-muted-foreground -rotate-90 origin-center mt-8">
                  {isRTL ? 'إمكانات منخفضة' : 'Low Potential'}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleApprovalBatch} className="gap-2">
              <Check className="w-4 h-4" />
              {isRTL ? 'موافقة مجمعة' : 'Approve Batch'}
            </Button>
            <Button variant="outline" onClick={handleExportResults} className="gap-2">
              <Download className="w-4 h-4" />
              {isRTL ? 'تصدير النتائج' : 'Export Results'}
            </Button>
            <Button variant="outline" onClick={handleRevertChanges} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              {isRTL ? 'التراجع عن التغييرات' : 'Revert Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Justification Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-card border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                {isRTL ? 'تبرير التغيير' : 'Justification Required'}
              </CardTitle>
              <CardDescription>
                {selectedEmployee.name} • {isRTL ? 'تغيير النتيجة' : 'Score Change'}: {selectedEmployee.currentScore} → {selectedEmployee.proposedScore}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{isRTL ? 'سبب التعديل' : 'Reason for Adjustment'}</Label>
                <Textarea
                  value={justificationText}
                  onChange={(e) => setJustificationText(e.target.value)}
                  placeholder={isRTL ? 'اكتب سبب تعديل النتيجة...' : 'Enter reason for score adjustment...'}
                  rows={3}
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => handleJustificationSubmit(selectedEmployee.id)}
                  disabled={!justificationText.trim()}
                  className="gap-2"
                >
                  <Check className="w-4 h-4" />
                  {isRTL ? 'حفظ وموافقة' : 'Save & Approve'}
                </Button>
                <Button variant="outline" onClick={() => setSelectedEmployee(null)}>
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};