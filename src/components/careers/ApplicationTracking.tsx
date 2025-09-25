import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Clock, MapPin, Building2, FileText, Mail, Phone, Calendar, Eye, CheckCircle, XCircle, AlertCircle, User, Briefcase } from 'lucide-react';
import { useCareers } from '@/hooks/useCareers';
import { useToast } from '@/hooks/use-toast';

export const ApplicationTracking: React.FC = () => {
  const { fetchUserApplications, userApplications, loading } = useCareers();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { label: string; variant: any; icon: React.ReactNode } } = {
      'pending': { 
        label: 'قيد المراجعة', 
        variant: 'default', 
        icon: <Clock className="w-4 h-4" />
      },
      'reviewing': { 
        label: 'قيد المراجعة التفصيلية', 
        variant: 'secondary', 
        icon: <Eye className="w-4 h-4" />
      },
      'interview_scheduled': { 
        label: 'مقابلة مجدولة', 
        variant: 'outline', 
        icon: <Calendar className="w-4 h-4" />
      },
      'interview_completed': { 
        label: 'مقابلة مكتملة', 
        variant: 'secondary', 
        icon: <CheckCircle className="w-4 h-4" />
      },
      'accepted': { 
        label: 'مقبول', 
        variant: 'default', 
        icon: <CheckCircle className="w-4 h-4" />
      },
      'rejected': { 
        label: 'مرفوض', 
        variant: 'destructive', 
        icon: <XCircle className="w-4 h-4" />
      }
    };
    
    return statusMap[status] || { label: status, variant: 'default', icon: <AlertCircle className="w-4 h-4" /> };
  };

  const getStatusProgress = (status: string) => {
    const progressMap: { [key: string]: number } = {
      'pending': 20,
      'reviewing': 40,
      'interview_scheduled': 60,
      'interview_completed': 80,
      'accepted': 100,
      'rejected': 0
    };
    return progressMap[status] || 0;
  };

  const getJobTypeName = (type: string) => {
    const types: { [key: string]: string } = {
      'full_time': 'دوام كامل',
      'part_time': 'دوام جزئي',
      'contract': 'عقد مؤقت',
      'internship': 'تدريب'
    };
    return types[type] || type;
  };

  const handleSearch = async () => {
    if (!email.trim()) {
      toast({
        title: "خطأ في البحث",
        description: "يرجى إدخال البريد الإلكتروني",
        variant: "destructive"
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "خطأ في البحث",
        description: "يرجى إدخال بريد إلكتروني صالح",
        variant: "destructive"
      });
      return;
    }

    setSearchPerformed(true);
    await fetchUserApplications(email);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 relative">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/20 via-transparent to-[#008C6A]/10"></div>
      </div>
      
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-4xl font-bold mb-4 text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">متابعة طلبات التوظيف</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          تابع حالة طلباتك المقدمة للوظائف في بُعد HR
        </p>
      </div>

      {/* نموذج البحث */}
      <Card className="max-w-2xl mx-auto mb-8 bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-xl relative z-10">
        <CardHeader>
          <CardTitle className="text-center text-white">البحث عن طلباتك</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              type="email"
              placeholder="أدخل البريد الإلكتروني المستخدم في التقديم"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-black/20 border-[#008C6A]/30 text-white placeholder:text-gray-400 focus:border-[#008C6A]"
              dir="ltr"
            />
            <Button 
              onClick={handleSearch} 
              disabled={loading}
              className="bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white hover:from-[#009F87] hover:to-[#008C6A] hover:scale-105 transition-all duration-300"
            >
              {loading ? 'جاري البحث...' : 'بحث'}
            </Button>
          </div>
          
          <div className="mt-4 p-4 bg-[#008C6A]/10 rounded-lg border border-[#008C6A]/20 backdrop-blur-sm">
            <h4 className="font-medium mb-2 flex items-center text-white">
              <Mail className="w-4 h-4 mr-2 text-[#008C6A]" />
              ملاحظة مهمة:
            </h4>
            <p className="text-sm text-gray-300">
              أدخل نفس البريد الإلكتروني الذي استخدمته عند التقديم على الوظائف. 
              ستظهر جميع طلباتك المقدمة مع تفاصيل كل حالة.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* النتائج */}
      {searchPerformed && (
        <div className="relative z-10">
          {loading ? (
            <div className="grid gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="animate-pulse bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30">
                  <CardContent className="p-6">
                    <div className="h-6 bg-[#008C6A]/20 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-[#008C6A]/10 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-[#008C6A]/10 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : userApplications.length === 0 ? (
            <Card className="text-center py-12 bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-xl">
              <CardContent>
                <FileText className="w-16 h-16 text-[#008C6A] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">لا توجد طلبات</h3>
                <p className="text-gray-300">
                  لم نجد أي طلبات توظيف مرتبطة بهذا البريد الإلكتروني
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4 bg-black/20 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/10 hover:scale-105 transition-all duration-300"
                  onClick={() => window.location.href = '/careers'}
                >
                  استعراض الوظائف المتاحة
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-white">طلباتك ({userApplications.length})</h2>
                <p className="text-gray-300">
                  إليك تفاصيل جميع طلبات التوظيف المقدمة
                </p>
              </div>

              {userApplications.map((application) => {
                const statusInfo = getStatusBadge(application.status);
                const progress = getStatusProgress(application.status);

                return (
                  <Card key={application.id} className="bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 hover:scale-105 transition-all duration-300 hover:border-[#008C6A]/50 shadow-xl">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 text-white">
                            {application.job_opening?.title}
                          </CardTitle>
                          <div className="flex flex-wrap gap-4 text-gray-300">
                            <div className="flex items-center">
                              <Building2 className="w-4 h-4 mr-1 text-[#008C6A]" />
                              <span>{application.job_opening?.department?.name}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1 text-[#008C6A]" />
                              <span>{application.job_opening?.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1 text-[#008C6A]" />
                              <span>{getJobTypeName(application.job_opening?.job_type)}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant={statusInfo.variant} className="flex items-center gap-1 bg-[#008C6A]/20 text-[#008C6A] border border-[#008C6A]/30">
                          {statusInfo.icon}
                          {statusInfo.label}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        {/* شريط التقدم */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-white">مرحلة التقييم</span>
                            <span className="text-sm text-gray-300">{progress}%</span>
                          </div>
                          <Progress 
                            value={progress} 
                            className={`h-2 bg-black/20 ${application.status === 'rejected' ? 'bg-red-900/20' : ''}`}
                          />
                        </div>

                        <Separator className="bg-[#008C6A]/30" />

                        {/* تفاصيل الطلب */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-[#008C6A]" />
                            <span className="font-medium ml-1 text-white">الاسم:</span>
                            <span className="text-gray-300">{application.applicant_name}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-[#008C6A]" />
                            <span className="font-medium ml-1 text-white">تاريخ التقديم:</span>
                            <span className="text-gray-300">{new Date(application.applied_at).toLocaleDateString('ar-SA')}</span>
                          </div>

                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-[#008C6A]" />
                            <span className="font-medium ml-1 text-white">البريد الإلكتروني:</span>
                            <span className="text-gray-300">{application.applicant_email}</span>
                          </div>

                          {application.applicant_phone && (
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-[#008C6A]" />
                              <span className="font-medium ml-1 text-white">الهاتف:</span>
                              <span dir="ltr" className="text-gray-300">{application.applicant_phone}</span>
                            </div>
                          )}
                        </div>

                        {/* رسالة تحفيزية إن وجدت */}
                        {application.cover_letter && (
                          <div>
                            <Separator className="mb-4 bg-[#008C6A]/30" />
                            <h4 className="font-medium mb-2 text-white">الرسالة التحفيزية:</h4>
                            <p className="text-gray-300 text-sm bg-black/20 border border-[#008C6A]/20 p-3 rounded">
                              {application.cover_letter}
                            </p>
                          </div>
                        )}

                        {/* معلومات إضافية بناءً على الحالة */}
                        {application.status === 'interview_scheduled' && (
                          <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-300 mb-2 flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              مقابلة مجدولة
                            </h4>
                            <p className="text-blue-200 text-sm">
                              تم جدولة مقابلة لك. سيتم التواصل معك قريباً لتحديد الموعد والمكان.
                            </p>
                          </div>
                        )}

                        {application.status === 'accepted' && (
                          <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                            <h4 className="font-medium text-green-300 mb-2 flex items-center">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              تهانينا! تم قبولك
                            </h4>
                            <p className="text-green-200 text-sm">
                              تم قبولك في هذه الوظيفة. سيتم التواصل معك من قسم الموارد البشرية لبدء إجراءات التعيين.
                            </p>
                          </div>
                        )}

                        {application.status === 'rejected' && (
                          <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                            <h4 className="font-medium text-red-300 mb-2 flex items-center">
                              <XCircle className="w-4 h-4 mr-2" />
                              لم يتم القبول
                            </h4>
                            <p className="text-red-200 text-sm">
                              نشكرك على اهتمامك بالانضمام إلينا. نتمنى لك التوفيق في مسيرتك المهنية.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* روابط مفيدة */}
              <Card className="bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-white">هل تحتاج مساعدة؟</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="bg-black/20 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/10 hover:scale-105 transition-all duration-300" onClick={() => window.location.href = '/careers'}>
                      <Briefcase className="w-4 h-4 mr-2" />
                      استعراض وظائف أخرى
                    </Button>
                    <Button variant="outline" className="bg-black/20 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/10 hover:scale-105 transition-all duration-300" onClick={() => window.location.href = '/contact'}>
                      <Mail className="w-4 h-4 mr-2" />
                      تواصل معنا
                    </Button>
                    <Button variant="outline" className="bg-black/20 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/10 hover:scale-105 transition-all duration-300" onClick={() => window.location.href = '/hr-tools'}>
                      <FileText className="w-4 h-4 mr-2" />
                      أدوات الموارد البشرية
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};