import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SystemHeader } from '@/components/shared/SystemHeader';
import ComprehensiveDisciplinarySystem from '@/components/disciplinary/ComprehensiveDisciplinarySystem';
import { 
  AlertTriangle, 
  Users, 
  FileText, 
  TrendingUp, 
  BarChart3,
  Clock,
  Shield,
  CheckCircle
} from 'lucide-react';

export const DisciplinarySystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for overview
  const overviewStats = {
    totalCases: 35,
    activeCases: 12,
    resolvedCases: 23,
    pendingInvestigations: 8,
    warningsIssued: 18,
    suspensions: 4
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
          <h1 className="text-3xl font-bold text-black mb-2">نظام الإجراءات التأديبية الشامل</h1>
          <p className="text-gray-600">إدارة متكاملة للإجراءات التأديبية والتحقيقات مع ربط بأنظمة الحضور والأداء</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
          <ComprehensiveDisciplinarySystem />
        </div>
      </div>
    </div>
  );
};