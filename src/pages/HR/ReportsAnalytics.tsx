import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { ReportGenerator } from '@/components/reporting/ReportGenerator';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  FileText, 
  Download,
  Calendar,
  Users,
  CheckCircle
} from 'lucide-react';

export const ReportsAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for overview
  const overviewStats = {
    totalReports: 156,
    scheduledReports: 25,
    automatedReports: 42,
    customReports: 89,
    dashboards: 8,
    dataPoints: 15420
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">نظام التقارير والتحليلات الشامل</h1>
          <p className="text-gray-600">إدارة متكاملة للتقارير والتحليلات مع ربط بجميع أنظمة الموارد البشرية والبيانات</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
          <ReportGenerator />
        </div>
      </div>
    </div>
  );
};