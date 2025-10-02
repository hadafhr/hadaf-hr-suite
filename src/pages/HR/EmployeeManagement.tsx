import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { BoudEmployeeManagement } from '@/components/BoudEmployeeManagement';
import { 
  Users, 
  UserPlus, 
  Building, 
  TrendingUp, 
  BarChart3,
  MapPin,
  FileText,
  CheckCircle
} from 'lucide-react';

export const EmployeeManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for overview
  const overviewStats = {
    totalEmployees: 248,
    newEmployees: 15,
    activeEmployees: 230,
    onLeave: 18,
    departments: 8,
    positions: 35
  };

  return (
    <div className="min-h-screen p-6 bg-background text-foreground" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">نظام إدارة شؤون الموظفين الشامل</h1>
          <p className="text-muted-foreground">إدارة متكاملة لبيانات الموظفين والتنظيم الإداري مع ربط بجميع أنظمة الموارد البشرية</p>
        </div>

        {/* Main Content */}
        <div className="rounded-xl border border-border p-6 bg-card">
          <BoudEmployeeManagement />
        </div>
      </div>
    </div>
  );
};