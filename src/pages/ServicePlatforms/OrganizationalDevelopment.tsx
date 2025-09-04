import React from 'react';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { OrganizationalDevelopmentSmart } from '@/components/organizational-development/OrganizationalDevelopmentSmart';
import { Building2 } from 'lucide-react';

export const OrganizationalDevelopment: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <SystemHeader
          title="نظام التطوير المؤسسي الذكي الشامل"
          description="منظومة متطورة للتطوير المؤسسي تستخدم الذكاء الاصطناعي لقياس الأثر وتحليل السعادة الوظيفية مع التقارير الفورية وBoard Pack"
          icon={<Building2 className="h-12 w-12 text-white" />}
          showBackButton={false}
        />

        {/* Main Smart System Content */}
        <div className="bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg p-6">
          <OrganizationalDevelopmentSmart />
        </div>
      </div>
    </div>
  );
};