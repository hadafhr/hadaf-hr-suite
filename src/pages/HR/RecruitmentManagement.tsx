import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SystemHeader } from '@/components/shared/SystemHeader';
import SmartHire from '@/pages/SmartHire';
import { 
  Users, 
  UserPlus, 
  Search, 
  TrendingUp, 
  BarChart3,
  Target,
  FileText,
  CheckCircle
} from 'lucide-react';

export const RecruitmentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for overview
  const overviewStats = {
    activeJobs: 25,
    totalApplications: 185,
    shortlisted: 45,
    interviews: 28,
    hired: 12,
    rejections: 98
  };

  return (
    <div className="min-h-screen p-6" style={{ background: '#000000', color: '#ffffff' }}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#ffffff' }}>نظام التوظيف الذكي الشامل</h1>
          <p style={{ color: '#e8e4e0' }}>إدارة متكاملة للتوظيف والاستقطاب مع ربط بأنظمة تقييم المرشحين والمقابلات</p>
        </div>

        {/* Main Content */}
        <div className="rounded-xl border p-6" style={{ background: '#1a1a1a', borderColor: '#cfcbcb' }}>
          <SmartHire />
        </div>
      </div>
    </div>
  );
};