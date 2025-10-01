import React from 'react';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { SmartLegalAffairs } from '@/components/legal/SmartLegalAffairs';
import { Scale } from 'lucide-react';

export const LegalAffairs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">نظام إدارة الشؤون القانونية الذكي</h1>
          <p className="text-gray-600">منظومة متطورة لإدارة الشؤون القانونية تستخدم الذكاء الاصطناعي لمراجعة العقود وإدارة القضايا مع التقارير الفورية والامتثال</p>
        </div>

        {/* Main Smart System Content */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
          <SmartLegalAffairs />
        </div>
      </div>
    </div>
  );
};