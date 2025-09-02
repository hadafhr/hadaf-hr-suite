import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings, Construction, Heart, Clock, Star } from 'lucide-react';

interface QualityOfLifeSystemProps {
  onBack?: () => void;
}

export const QualityOfLifeSystem: React.FC<QualityOfLifeSystemProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            className="hover:bg-[#009F87]/10 border-[#009F87]/20"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Heart className="h-8 w-8 text-[#009F87]" />
              جودة الحياة
            </h1>
            <p className="text-gray-600 mt-1">نظام إدارة جودة الحياة الوظيفية للموظفين</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Settings className="h-4 w-4" />
          الإعدادات
        </Button>
      </div>

      {/* Under Development Section */}
      <div className="flex items-center justify-center min-h-[600px]">
        <Card className="w-full max-w-2xl text-center border-2 border-dashed border-[#009F87]/30 bg-white/80 backdrop-blur">
          <CardHeader className="pb-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Construction className="h-20 w-20 text-[#009F87] animate-pulse" />
                <div className="absolute -top-2 -right-2">
                  <Heart className="h-8 w-8 text-red-500 animate-bounce" />
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
              قيد التطوير
            </CardTitle>
            <p className="text-lg text-gray-600">
              نظام جودة الحياة الوظيفية
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-[#009F87]/10 to-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">الميزات القادمة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-[#009F87]" />
                  <span className="text-gray-700">برامج الرفاهية والصحة</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#009F87]" />
                  <span className="text-gray-700">مرونة أوقات العمل</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-[#009F87]" />
                  <span className="text-gray-700">الدعم النفسي والاجتماعي</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-[#009F87]" />
                  <span className="text-gray-700">برامج التوازن بين العمل والحياة</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 font-medium">
                🚧 هذا القسم تحت التطوير حالياً وسيتم إطلاقه قريباً
              </p>
            </div>

            <div className="pt-4">
              <p className="text-gray-500 text-sm">
                سيتم إشعارك فور اكتمال تطوير هذا النظام
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};