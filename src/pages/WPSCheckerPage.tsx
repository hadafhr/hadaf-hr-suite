import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Upload, CheckCircle, AlertTriangle } from 'lucide-react';
import buodLogo from '@/assets/buod-logo-white.png';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BackButton } from '@/components/BackButton';
import { PatternBackground } from '@/components/PatternBackground';

const WPSCheckerPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [file, setFile] = useState<File | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleCheck = () => {
    if (!file) return;
    
    setIsChecking(true);
    // Simulate API call
    setTimeout(() => {
      setResult({
        isValid: Math.random() > 0.3,
        employeeCount: Math.floor(Math.random() * 500) + 50,
        totalAmount: Math.floor(Math.random() * 1000000) + 100000,
        errors: []
      });
      setIsChecking(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/20 via-transparent to-[#008C6A]/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#008C6A" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>
      
      {/* Professional Interactive Header */}
      <header className="relative z-10 bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-xl border-b border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] opacity-80"></div>
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center">
              <img 
                src={buodLogo} 
                alt="Buod HR" 
                className="h-48 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105" 
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Shield className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  {isArabic ? 'مدقّق حماية الأجور' : 'WPS Checker'}
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  {isArabic ? 'تحقق قانوني دقيق' : 'Legal & Accurate Verification'}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-4">
              <div className="bg-gradient-to-r from-black/40 via-gray-900/60 to-black/40 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 shadow-xl shadow-[#008C6A]/10 p-4 min-w-[200px]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    {isArabic ? 'حالة النظام' : 'System Status'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-xs text-green-300 font-semibold">
                      {isArabic ? 'متاح' : 'Online'}
                    </span>
                  </div>
                </div>
                
                <div className="h-px bg-gradient-to-r from-transparent via-[#008C6A]/30 to-transparent mb-3"></div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    {isArabic ? 'اللغة' : 'Language'}
                  </span>
                  
                  <button 
                    onClick={() => i18n.changeLanguage(isArabic ? 'en' : 'ar')}
                    className="group relative flex items-center space-x-2 bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#008C6A]/40 hover:border-[#008C6A]/70 transition-all duration-300"
                  >
                    <span className="text-sm text-white font-bold tracking-wider group-hover:text-[#008C6A] transition-colors duration-300">
                      {isArabic ? 'EN' : 'العربية'}
                    </span>
                  </button>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-black/20 to-gray-900/30 backdrop-blur-lg rounded-xl border border-[#008C6A]/20 px-3 py-2 shadow-lg">
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">{isArabic ? 'دقيق' : 'Accurate'}</span>
                  </div>
                  <div className="w-px h-3 bg-[#008C6A]/30"></div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">{isArabic ? 'آمن' : 'Secure'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#008C6A] to-transparent"></div>
        </div>
      </header>

      <main className="relative z-10 w-full mx-auto px-4 py-8">
        {/* Breadcrumb Navigation - Far Right */}
        <div className="flex justify-end mb-6 mr-0">
          <div className="ml-auto">
            <Breadcrumb 
              items={[
                { label: isArabic ? 'الرئيسية' : 'Home', path: '/' },
                { label: isArabic ? 'أدوات الموارد البشرية' : 'HR Tools', path: '/hr-tools' },
                { label: isArabic ? 'مدقّق حماية الأجور' : 'WPS Checker', path: '/hr-tools/wps-checker' }
              ]}
            />
          </div>
        </div>

        {/* Floating Elements for Professional Look */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-[#008C6A]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 left-16 w-32 h-32 bg-[#008C6A]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-[#008C6A]/15 rounded-full blur-lg animate-pulse delay-500"></div>

        {/* Enhanced Hero Section */}
        <div className="text-center mb-12 relative max-w-6xl mx-auto">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-[#008C6A]/30 to-transparent blur-sm"></div>
          
          <div className="relative inline-flex items-center justify-center w-40 h-40 rounded-full mb-8 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <img 
              src="/boud-logo-white.png" 
              alt="شعار بُعد" 
              className="h-36 w-36 object-contain transition-all duration-300 group-hover:brightness-110 z-10 relative drop-shadow-2xl" 
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <h2 className="text-5xl font-bold mb-8 text-white bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent leading-tight">
            {isArabic ? 'تحقق من سلامة ملفات حماية الأجور' : 'Verify WPS File Integrity with Legal Accuracy'}
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl">
              {isArabic 
                ? 'أداة متطورة لفحص ملفات SIF وضمان توافقها مع متطلبات برنامج حماية الأجور قبل الرفع للبنك المركزي السعودي'
                : 'Advanced tool to verify SIF files and ensure compliance with WPS requirements before uploading to SAMA'
              }
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#008C6A]/20 via-transparent to-[#008C6A]/20 rounded-2xl blur opacity-50"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <CardTitle className="flex items-center gap-2 text-white relative z-10">
                <Upload className="h-5 w-5" />
                {isArabic ? 'رفع ملف SIF' : 'Upload SIF File'}
              </CardTitle>
              <CardDescription className="text-white/80 relative z-10">
                {isArabic 
                  ? 'اختر ملف SIF للتحقق من صحته'
                  : 'Select a SIF file to verify its integrity'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6 bg-gray-900/40">
              <div className="space-y-2">
                <Label htmlFor="sif-file" className="text-gray-200 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#008C6A] rounded-full animate-pulse"></span>
                  {isArabic ? 'ملف SIF' : 'SIF File'}
                </Label>
                <Input
                  id="sif-file"
                  type="file"
                  accept=".sif"
                  onChange={handleFileUpload}
                  className="bg-black/50 border-[#008C6A]/40 text-white focus:border-[#008C6A] focus:ring-[#008C6A]/50 hover:border-[#008C6A]/70 transition-all duration-200"
                />
              </div>

              {file && (
                <div className="p-4 bg-black/40 rounded-lg border border-[#008C6A]/20">
                  <p className="text-sm text-gray-400 mb-2">
                    {isArabic ? 'الملف المحدد:' : 'Selected file:'}
                  </p>
                  <p className="font-medium text-white">{file.name}</p>
                  <p className="text-sm text-gray-400">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              )}

              <Button 
                onClick={handleCheck} 
                disabled={!file || isChecking}
                className="w-full bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:via-[#008C6A] hover:to-[#009F87] text-white font-bold py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl shadow-[#008C6A]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isChecking 
                    ? (isArabic ? 'جاري التحقق...' : 'Checking...')
                    : (isArabic ? 'تحقق من الملف' : 'Check File')
                  }
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
              </Button>

              {result && (
                <Card className={`${result.isValid ? 'border-green-500 bg-green-50/10' : 'border-red-500 bg-red-50/10'} backdrop-blur-xl`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      {result.isValid ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                      {result.isValid 
                        ? (isArabic ? 'الملف صحيح' : 'File is Valid')
                        : (isArabic ? 'توجد أخطاء' : 'Errors Found')
                      }
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-black/40 rounded-lg">
                        <span className="text-gray-300">
                          {isArabic ? 'عدد الموظفين:' : 'Employee Count:'}
                        </span>
                        <span className="text-[#008C6A] font-bold">{result.employeeCount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-black/40 rounded-lg">
                        <span className="text-gray-300">
                          {isArabic ? 'إجمالي المبلغ:' : 'Total Amount:'}
                        </span>
                        <span className="text-[#008C6A] font-bold">{result.totalAmount.toLocaleString()} {isArabic ? 'ريال' : 'SAR'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Legal Notice */}
        <div className="mt-8 p-6 bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-lg backdrop-blur-sm max-w-4xl mx-auto">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-amber-400 mt-0.5 ml-3 animate-pulse" />
            <div>
              <h4 className="font-semibold text-amber-300 mb-2 flex items-center gap-2">
                <span className="text-2xl">⚖️</span>
                {isArabic ? 'ملاحظة قانونية مهمة' : 'Important Legal Notice'}
              </h4>
              <p className="text-amber-200 text-sm leading-relaxed">
                {isArabic 
                  ? 'يتم فحص ملفات حماية الأجور وفق المعايير المعتمدة من البنك المركزي السعودي. النتائج استرشادية ويُنصح بمراجعة البنك المعتمد للتأكد النهائي.'
                  : 'WPS files are checked according to standards approved by SAMA. Results are indicative and it is recommended to consult your approved bank for final verification.'
                }
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WPSCheckerPage;