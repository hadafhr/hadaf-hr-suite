import React from 'react';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { SmartLegalAffairs } from '@/components/legal/SmartLegalAffairs';
import { Scale } from 'lucide-react';

export const LegalAffairs: React.FC = () => {
  return (
    <div className="min-h-screen p-6 bg-background text-foreground" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">نظام إدارة الشؤون القانونية الذكي</h1>
          <p className="text-muted-foreground">منظومة متطورة لإدارة الشؤون القانونية تستخدم الذكاء الاصطناعي لمراجعة العقود وإدارة القضايا مع التقارير الفورية والامتثال</p>
        </div>

        {/* Main Smart System Content */}
        <div className="rounded-xl border border-border p-6 bg-card">
          <SmartLegalAffairs />
        </div>
      </div>
    </div>
  );
};