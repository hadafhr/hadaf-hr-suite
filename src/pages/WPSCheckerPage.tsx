import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Upload, CheckCircle, AlertTriangle } from 'lucide-react';
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
    <div className="min-h-screen bg-background">
      <PatternBackground opacity={0.02} size={120} />
      
      <header className="relative z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4 space-x-reverse">
            <BackButton />
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">
              {isArabic ? 'مدقّق حماية الأجور' : 'WPS Checker'}
            </h1>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            {isArabic ? 'تحقق من سلامة ملف SIF' : 'Verify SIF File Integrity'}
          </h2>
          <p className="text-muted-foreground">
            {isArabic 
              ? 'تأكد من صحة ملف حماية الأجور قبل الرفع لبنك ساما'
              : 'Verify WPS file integrity before uploading to SAMA'
            }
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              {isArabic ? 'رفع ملف SIF' : 'Upload SIF File'}
            </CardTitle>
            <CardDescription>
              {isArabic 
                ? 'اختر ملف SIF للتحقق من صحته'
                : 'Select a SIF file to verify its integrity'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sif-file">
                {isArabic ? 'ملف SIF' : 'SIF File'}
              </Label>
              <Input
                id="sif-file"
                type="file"
                accept=".sif"
                onChange={handleFileUpload}
              />
            </div>

            {file && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  {isArabic ? 'الملف المحدد:' : 'Selected file:'}
                </p>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            )}

            <Button 
              onClick={handleCheck} 
              disabled={!file || isChecking}
              className="w-full"
            >
              {isChecking 
                ? (isArabic ? 'جاري التحقق...' : 'Checking...')
                : (isArabic ? 'تحقق من الملف' : 'Check File')
              }
            </Button>

            {result && (
              <Card className={result.isValid ? 'border-green-500' : 'border-red-500'}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
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
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {isArabic ? 'عدد الموظفين:' : 'Employee Count:'}
                      </span>
                      <span>{result.employeeCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {isArabic ? 'إجمالي المبلغ:' : 'Total Amount:'}
                      </span>
                      <span>{result.totalAmount.toLocaleString()} {isArabic ? 'ريال' : 'SAR'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default WPSCheckerPage;