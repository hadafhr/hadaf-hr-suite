import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';

const TestHRTools: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">اختبار أدوات الموارد البشرية</h1>
        <div className="space-y-2">
          <Link to="/hr-tools">
            <Button size="lg" className="w-full">
              <Calculator className="w-5 h-5 ml-2" />
              صفحة أدوات الموارد البشرية
            </Button>
          </Link>
          <Link to="/hr-tools/salary-calculator">
            <Button size="lg" variant="outline" className="w-full">
              حاسبة الرواتب
            </Button>
          </Link>
          <Link to="/hr-tools/nitaqat-calculator">
            <Button size="lg" variant="outline" className="w-full">
              حاسبة النطاقات
            </Button>
          </Link>
          <Link to="/end-of-service-calculator">
            <Button size="lg" variant="outline" className="w-full">
              حاسبة نهاية الخدمة
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestHRTools;