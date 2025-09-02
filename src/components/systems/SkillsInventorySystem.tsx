import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, Brain, Users, Target, Download, Plus, Search, Filter, Calendar, Building, Award, TrendingUp,
  BarChart3, PieChart, Activity, Zap, Eye, Settings, Bell, UserCheck, Sparkles, Archive, Edit, Trash2,
  Share, Lock, Unlock, AlertCircle, Info, UserPlus, Phone, Mail, Crown, Users2, Database, RefreshCw,
  Server, FileText, BookOpen, GraduationCap, Star, CheckCircle2, AlertTriangle, Clock, Upload, Camera,
  User, Briefcase, MapPin, Calendar as CalendarIcon, MessageSquare, ThumbsUp, Percent, TrendingDown,
  Code, Heart, Lightbulb, Shield, Zap as ZapIcon, Cpu, Palette, Globe, LineChart, BarChart
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart as RechartsBarChart, Bar } from 'recharts';

interface SkillsInventorySystemProps {
  onBack: () => void;
}

export const SkillsInventorySystem: React.FC<SkillsInventorySystemProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير مخزون المهارات كملف PDF",
    });
  };

  const renderHeader = () => (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border/50">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/boud-pattern-bg.jpg')] opacity-5"></div>
      <div className="relative p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="sm" onClick={onBack} className="hover:bg-primary/10">
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">مخزون المهارات</h1>
                <p className="text-muted-foreground text-lg mt-1">
                  منظومة شاملة لإدارة وتتبع مهارات الموظفين مع تحليل الفجوات والتوصيات التدريبية والتقارير التفصيلية
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 ml-2" />
              تصدير التقرير
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 ml-2" />
              طباعة
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 ml-2" />
              مهارة جديدة
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderHeader()}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-muted/50 p-1 h-auto">
            <TabsTrigger value="dashboard" className="flex flex-col gap-1 py-3">
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">لوحة التحكم</span>
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex flex-col gap-1 py-3">
              <Users className="h-4 w-4" />
              <span className="text-xs">مهارات الموظفين</span>
            </TabsTrigger>
            <TabsTrigger value="add-skill" className="flex flex-col gap-1 py-3">
              <Plus className="h-4 w-4" />
              <span className="text-xs">إضافة مهارة</span>
            </TabsTrigger>
            <TabsTrigger value="gap-analysis" className="flex flex-col gap-1 py-3">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">تحليل الفجوات</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="flex flex-col gap-1 py-3">
              <GraduationCap className="h-4 w-4" />
              <span className="text-xs">التدريب والتطوير</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex flex-col gap-1 py-3">
              <FileText className="h-4 w-4" />
              <span className="text-xs">التقارير</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex flex-col gap-1 py-3">
              <Settings className="h-4 w-4" />
              <span className="text-xs">الإعدادات</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <Card><CardContent className="p-6"><h2 className="text-xl font-bold">مخزون المهارات - لوحة التحكم</h2></CardContent></Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};