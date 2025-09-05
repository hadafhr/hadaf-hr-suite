import React from 'react';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { SmartLegalAffairs } from '@/components/legal/SmartLegalAffairs';
import { Scale } from 'lucide-react';

export const LegalAffairs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <SystemHeader
          title="نظام إدارة الشؤون القانونية الذكي"
          description="منظومة متطورة لإدارة الشؤون القانونية تستخدم الذكاء الاصطناعي لمراجعة العقود وإدارة القضايا مع التقارير الفورية والامتثال"
          icon={<Scale className="h-12 w-12 text-white" />}
          showBackButton={false}
        />

        {/* Overview Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">القضايا المفتوحة</p>
                <p className="text-3xl font-bold text-primary">12</p>
              </div>
              <Scale className="h-12 w-12 text-primary/20" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600">↗ +2</span>
              <span className="text-muted-foreground ml-1">هذا الشهر</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">القضايا المغلقة</p>
                <p className="text-3xl font-bold text-green-600">47</p>
              </div>
              <Scale className="h-12 w-12 text-green-600/20" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600">↗ +5</span>
              <span className="text-muted-foreground ml-1">هذا الشهر</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">العقود المراجعة</p>
                <p className="text-3xl font-bold text-blue-600">156</p>
              </div>
              <Scale className="h-12 w-12 text-blue-600/20" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600">↗ +18</span>
              <span className="text-muted-foreground ml-1">هذا الشهر</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الاستشارات القانونية</p>
                <p className="text-3xl font-bold text-purple-600">28</p>
              </div>
              <Scale className="h-12 w-12 text-purple-600/20" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600">↗ +4</span>
              <span className="text-muted-foreground ml-1">هذا الشهر</span>
            </div>
          </div>
        </div>

        {/* Main Smart System Content */}
        <div className="bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg p-6">
          <SmartLegalAffairs />
        </div>
      </div>
    </div>
  );
};