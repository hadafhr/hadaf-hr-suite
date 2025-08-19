import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Award, 
  Download, 
  Eye, 
  Send, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  User,
  GraduationCap,
  FileText,
  Mail,
  CheckCircle,
  Clock,
  Star,
  Share2,
  Printer
} from 'lucide-react';

interface Certificate {
  id: string;
  recipientName: string;
  recipientEmail: string;
  courseName: string;
  completionDate: Date;
  issueDate: Date;
  certificateNumber: string;
  grade: number;
  status: 'issued' | 'pending' | 'revoked';
  templateId: string;
  templateName: string;
  instructorName: string;
  validUntil?: Date;
  verificationCode: string;
  downloadCount: number;
}

interface CertificateTemplate {
  id: string;
  name: string;
  description: string;
  type: 'completion' | 'achievement' | 'participation';
  design: string;
  backgroundColor: string;
  textColor: string;
  logoUrl: string;
  isActive: boolean;
}

export const CertificateManager: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState<'certificates' | 'templates' | 'bulk'>('certificates');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Sample certificates data
  const certificates: Certificate[] = [
    {
      id: '1',
      recipientName: 'أحمد محمد علي',
      recipientEmail: 'ahmed.mohamed@company.com',
      courseName: 'أساسيات إدارة المشاريع',
      completionDate: new Date('2024-02-28'),
      issueDate: new Date('2024-03-01'),
      certificateNumber: 'CERT-2024-001',
      grade: 87,
      status: 'issued',
      templateId: '1',
      templateName: 'شهادة إتمام أساسية',
      instructorName: 'د. محمد الأحمد',
      verificationCode: 'VER-ABC123',
      downloadCount: 3
    },
    {
      id: '2',
      recipientName: 'فاطمة عبد الرحمن',
      recipientEmail: 'fatima.abdulrahman@company.com',
      courseName: 'التسويق الرقمي المتقدم',
      completionDate: new Date('2024-02-15'),
      issueDate: new Date('2024-02-16'),
      certificateNumber: 'CERT-2024-002',
      grade: 94,
      status: 'issued',
      templateId: '2',
      templateName: 'شهادة التميز',
      instructorName: 'أ. سارة المطيري',
      verificationCode: 'VER-DEF456',
      downloadCount: 1
    },
    {
      id: '3',
      recipientName: 'عبد الله سعد',
      recipientEmail: 'abdullah.saad@company.com',
      courseName: 'البرمجة بـ React',
      completionDate: new Date('2024-03-10'),
      issueDate: new Date('2024-03-10'),
      certificateNumber: 'CERT-2024-003',
      grade: 76,
      status: 'pending',
      templateId: '1',
      templateName: 'شهادة إتمام أساسية',
      instructorName: 'م. أحمد العتيبي',
      verificationCode: 'VER-GHI789',
      downloadCount: 0
    }
  ];

  // Sample certificate templates
  const templates: CertificateTemplate[] = [
    {
      id: '1',
      name: 'شهادة إتمام أساسية',
      description: 'تصميم أساسي لشهادات إتمام الدورات',
      type: 'completion',
      design: 'classic',
      backgroundColor: '#ffffff',
      textColor: '#1a365d',
      logoUrl: '/company-logo.png',
      isActive: true
    },
    {
      id: '2',
      name: 'شهادة التميز',
      description: 'تصميم مميز للمتدربين المتفوقين',
      type: 'achievement',
      design: 'premium',
      backgroundColor: '#f7fafc',
      textColor: '#2d3748',
      logoUrl: '/company-logo.png',
      isActive: true
    },
    {
      id: '3',
      name: 'شهادة المشاركة',
      description: 'شهادة للمشاركة في الفعاليات والورش',
      type: 'participation',
      design: 'modern',
      backgroundColor: '#edf2f7',
      textColor: '#4a5568',
      logoUrl: '/company-logo.png',
      isActive: false
    }
  ];

  // Filter certificates
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      issued: { 
        text: isRTL ? 'مُصدرة' : 'Issued', 
        className: 'bg-green-500/10 text-green-500 border-green-500/20' 
      },
      pending: { 
        text: isRTL ? 'معلقة' : 'Pending', 
        className: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' 
      },
      revoked: { 
        text: isRTL ? 'مُلغاة' : 'Revoked', 
        className: 'bg-red-500/10 text-red-500 border-red-500/20' 
      }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      completion: { 
        text: isRTL ? 'إتمام' : 'Completion', 
        className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' 
      },
      achievement: { 
        text: isRTL ? 'تميز' : 'Achievement', 
        className: 'bg-purple-500/10 text-purple-500 border-purple-500/20' 
      },
      participation: { 
        text: isRTL ? 'مشاركة' : 'Participation', 
        className: 'bg-orange-500/10 text-orange-500 border-orange-500/20' 
      }
    };
    return typeConfig[type as keyof typeof typeConfig];
  };

  const handleDownloadCertificate = (certificate: Certificate) => {
    // Simulate certificate download
    console.log('Downloading certificate:', certificate.certificateNumber);
    // In real implementation, this would generate and download the PDF
  };

  const handleSendCertificate = (certificate: Certificate) => {
    // Simulate sending certificate via email
    console.log('Sending certificate to:', certificate.recipientEmail);
  };

  const handleBulkIssue = () => {
    // Simulate bulk certificate issuance
    console.log('Bulk issuing certificates');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            {isRTL ? 'إدارة الشهادات' : 'Certificate Management'}
          </h2>
          <p className="text-muted-foreground">
            {isRTL ? 'إنشاء وإدارة وتوزيع شهادات التدريب الإلكترونية' : 'Create, manage and distribute digital training certificates'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            {isRTL ? 'قالب جديد' : 'New Template'}
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Award className="h-4 w-4 mr-2" />
            {isRTL ? 'إصدار شهادة' : 'Issue Certificate'}
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {isRTL ? 'إجمالي الشهادات' : 'Total Certificates'}
                </p>
                <p className="text-2xl font-bold text-foreground">342</p>
                <p className="text-xs text-green-500 mt-1">
                  {isRTL ? '+23 هذا الشهر' : '+23 this month'}
                </p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {isRTL ? 'الشهادات المُصدرة' : 'Issued Certificates'}
                </p>
                <p className="text-2xl font-bold text-green-500">289</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {isRTL ? '84.5% من الإجمالي' : '84.5% of total'}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {isRTL ? 'معلقة' : 'Pending'}
                </p>
                <p className="text-2xl font-bold text-yellow-500">38</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {isRTL ? 'تحتاج مراجعة' : 'Needs review'}
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {isRTL ? 'التحميلات' : 'Downloads'}
                </p>
                <p className="text-2xl font-bold text-blue-500">756</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {isRTL ? 'هذا الشهر' : 'This month'}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Download className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8" dir={isRTL ? 'rtl' : 'ltr'}>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'certificates'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
            }`}
          >
            <Award className="h-4 w-4 inline mr-2" />
            {isRTL ? 'الشهادات' : 'Certificates'}
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'templates'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
            }`}
          >
            <FileText className="h-4 w-4 inline mr-2" />
            {isRTL ? 'القوالب' : 'Templates'}
          </button>
          <button
            onClick={() => setActiveTab('bulk')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bulk'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
            }`}
          >
            <GraduationCap className="h-4 w-4 inline mr-2" />
            {isRTL ? 'الإصدار المجمع' : 'Bulk Issue'}
          </button>
        </nav>
      </div>

      {/* Certificates Tab */}
      {activeTab === 'certificates' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={isRTL ? 'البحث في الشهادات...' : 'Search certificates...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-border bg-card"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                {isRTL ? 'الكل' : 'All'}
              </Button>
              <Button
                variant={statusFilter === 'issued' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('issued')}
              >
                {isRTL ? 'مُصدرة' : 'Issued'}
              </Button>
              <Button
                variant={statusFilter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('pending')}
              >
                {isRTL ? 'معلقة' : 'Pending'}
              </Button>
            </div>
          </div>

          {/* Certificates List */}
          <div className="space-y-4">
            {filteredCertificates.map((certificate) => {
              const statusBadge = getStatusBadge(certificate.status);
              
              return (
                <Card key={certificate.id} className="border-border bg-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                          <Award className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg">{certificate.recipientName}</h3>
                            <Badge className={`${statusBadge.className} text-xs`}>
                              {statusBadge.text}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{certificate.courseName}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">{isRTL ? 'رقم الشهادة:' : 'Certificate #:'}</span>
                              <p className="font-medium">{certificate.certificateNumber}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">{isRTL ? 'تاريخ الإكمال:' : 'Completion Date:'}</span>
                              <p className="font-medium">{certificate.completionDate.toLocaleDateString()}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">{isRTL ? 'الدرجة:' : 'Grade:'}</span>
                              <p className="font-medium flex items-center gap-1">
                                {certificate.grade}%
                                {certificate.grade >= 90 && <Star className="h-4 w-4 text-yellow-500" />}
                              </p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">{isRTL ? 'التحميلات:' : 'Downloads:'}</span>
                              <p className="font-medium">{certificate.downloadCount}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Dialog open={showPreview && selectedCertificate?.id === certificate.id} 
                               onOpenChange={(open) => {
                                 setShowPreview(open);
                                 if (!open) setSelectedCertificate(null);
                               }}>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedCertificate(certificate)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              {isRTL ? 'معاينة' : 'Preview'}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{isRTL ? 'معاينة الشهادة' : 'Certificate Preview'}</DialogTitle>
                            </DialogHeader>
                            <CertificatePreview certificate={certificate} />
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownloadCertificate(certificate)}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          {isRTL ? 'تحميل' : 'Download'}
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSendCertificate(certificate)}
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          {isRTL ? 'إرسال' : 'Send'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => {
              const typeBadge = getTypeBadge(template.type);
              
              return (
                <Card key={template.id} className="border-border bg-card hover:shadow-lg transition-shadow">
                  <div 
                    className="h-32 rounded-t-lg border-b border-border"
                    style={{ backgroundColor: template.backgroundColor }}
                  >
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center" style={{ color: template.textColor }}>
                        <Award className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-sm font-medium">{isRTL ? 'معاينة القالب' : 'Template Preview'}</p>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                      </div>
                      <Badge className={`${typeBadge.className} text-xs`}>
                        {typeBadge.text}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{isRTL ? 'التصميم:' : 'Design:'}</span>
                        <span className="capitalize">{template.design}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{isRTL ? 'الحالة:' : 'Status:'}</span>
                        <Badge variant={template.isActive ? 'default' : 'secondary'} className="text-xs">
                          {template.isActive ? (isRTL ? 'نشط' : 'Active') : (isRTL ? 'غير نشط' : 'Inactive')}
                        </Badge>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          {isRTL ? 'معاينة' : 'Preview'}
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <FileText className="h-3 w-3 mr-1" />
                          {isRTL ? 'تحرير' : 'Edit'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Bulk Issue Tab */}
      {activeTab === 'bulk' && (
        <Card className="p-6 border-border bg-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            {isRTL ? 'الإصدار المجمع للشهادات' : 'Bulk Certificate Issuance'}
          </h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {isRTL ? 'اختر الدورة' : 'Select Course'}
                </label>
                <select className="w-full p-3 border border-border rounded-lg bg-card">
                  <option>{isRTL ? 'أساسيات إدارة المشاريع' : 'Project Management Fundamentals'}</option>
                  <option>{isRTL ? 'التسويق الرقمي المتقدم' : 'Advanced Digital Marketing'}</option>
                  <option>{isRTL ? 'البرمجة بـ React' : 'React Programming'}</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {isRTL ? 'قالب الشهادة' : 'Certificate Template'}
                </label>
                <select className="w-full p-3 border border-border rounded-lg bg-card">
                  <option>{isRTL ? 'شهادة إتمام أساسية' : 'Basic Completion Certificate'}</option>
                  <option>{isRTL ? 'شهادة التميز' : 'Excellence Certificate'}</option>
                  <option>{isRTL ? 'شهادة المشاركة' : 'Participation Certificate'}</option>
                </select>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-3">
                {isRTL 
                  ? 'سيتم إصدار شهادات لـ 45 متدرب أكملوا الدورة بنجاح (درجة 70% أو أكثر)'
                  : 'Certificates will be issued to 45 learners who completed the course successfully (70% or higher)'
                }
              </p>
              <div className="flex gap-3">
                <Button onClick={handleBulkIssue} className="bg-primary hover:bg-primary/90">
                  <Award className="h-4 w-4 mr-2" />
                  {isRTL ? 'إصدار جميع الشهادات' : 'Issue All Certificates'}
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  {isRTL ? 'معاينة القائمة' : 'Preview List'}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

// Certificate Preview Component
const CertificatePreview: React.FC<{ certificate: Certificate }> = ({ certificate }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="space-y-6">
      {/* Certificate Design */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-8 text-center">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-center gap-4">
            <Award className="h-12 w-12 text-primary" />
            <div>
              <h2 className="text-2xl font-bold text-primary">
                {isRTL ? 'شهادة إتمام' : 'Certificate of Completion'}
              </h2>
              <p className="text-sm text-muted-foreground">BOUD HR Training Platform</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <p className="text-lg">
              {isRTL 
                ? 'تشهد هذه الشهادة بأن'
                : 'This is to certify that'
              }
            </p>
            <h3 className="text-3xl font-bold text-foreground">{certificate.recipientName}</h3>
            <p className="text-lg">
              {isRTL 
                ? `قد أكمل بنجاح دورة "${certificate.courseName}"`
                : `has successfully completed the course "${certificate.courseName}"`
              }
            </p>
            
            {/* Grade */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-lg font-semibold">
                {isRTL ? `الدرجة: ${certificate.grade}%` : `Grade: ${certificate.grade}%`}
              </span>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border pt-6">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium">{certificate.instructorName}</p>
                <p className="text-muted-foreground">{isRTL ? 'المدرب' : 'Instructor'}</p>
              </div>
              <div>
                <p className="font-medium">{certificate.completionDate.toLocaleDateString()}</p>
                <p className="text-muted-foreground">{isRTL ? 'تاريخ الإكمال' : 'Date of Completion'}</p>
              </div>
              <div>
                <p className="font-medium">{certificate.certificateNumber}</p>
                <p className="text-muted-foreground">{isRTL ? 'رقم الشهادة' : 'Certificate Number'}</p>
              </div>
            </div>
          </div>

          {/* Verification */}
          <div className="text-xs text-muted-foreground">
            {isRTL 
              ? `رمز التحقق: ${certificate.verificationCode}`
              : `Verification Code: ${certificate.verificationCode}`
            }
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-3">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          {isRTL ? 'تحميل PDF' : 'Download PDF'}
        </Button>
        <Button variant="outline">
          <Share2 className="h-4 w-4 mr-2" />
          {isRTL ? 'مشاركة' : 'Share'}
        </Button>
        <Button variant="outline">
          <Printer className="h-4 w-4 mr-2" />
          {isRTL ? 'طباعة' : 'Print'}
        </Button>
      </div>
    </div>
  );
};