import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { SmartEvaluations } from '@/components/evaluation/SmartEvaluations';
import { 
  Target, 
  Users, 
  Award, 
  TrendingUp, 
  BarChart3,
  Star,
  FileText,
  CheckCircle
} from 'lucide-react';

export const PerformanceEvaluationSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for overview
  const overviewStats = {
    totalEvaluations: 145,
    completedEvaluations: 112,
    pendingEvaluations: 33,
    averageScore: 4.2,
    topPerformers: 28,
    improvementNeeded: 15
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
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#ffffff' }}>نظام تقييم الأداء الذكي الشامل</h1>
          <p style={{ color: '#e8e4e0' }}>إدارة متكاملة لتقييم الأداء والكفاءات مع ربط بأنظمة التطوير والمكافآت والترقيات</p>
        </div>

        {/* Main Content */}
        <div className="rounded-xl border p-6" style={{ background: '#1a1a1a', borderColor: '#cfcbcb' }}>
          <SmartEvaluations />
        </div>
      </div>
    </div>
  );
};