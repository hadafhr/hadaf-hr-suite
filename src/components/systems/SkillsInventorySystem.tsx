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
    <div className="flex items-center justify-between mb-12 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/20 animate-fade-in">
      <div className="flex items-center gap-6">
        <Button variant="outline" size="sm" onClick={onBack} className="border-gray-300 hover:bg-[#3CB593]/5 hover:border-[#3CB593]/30 hover:text-[#3CB593] transition-all duration-300">
          <ArrowLeft className="h-4 w-4 ml-2" />
          رجوع
        </Button>
        <div className="h-8 w-px bg-gray-300"></div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#3CB593] to-[#2da574] rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            <Brain className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">
              نظام مخزون المهارات المتطور
            </h1>
            <p className="text-gray-600 text-lg">
              منظومة شاملة لإدارة وتتبع مهارات الموظفين مع تحليل الفجوات والتوصيات
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="border-[#3CB593]/30 text-[#3CB593] bg-[#3CB593]/5 px-4 py-2 text-sm font-medium">
          <Brain className="h-4 w-4 ml-2" />
          نظام متقدم
        </Badge>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Download className="h-4 w-4 ml-2" />
          تصدير التقارير
        </Button>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus className="h-4 w-4 ml-2" />
          مهارة جديدة
        </Button>
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