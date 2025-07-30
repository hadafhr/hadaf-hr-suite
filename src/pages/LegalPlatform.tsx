import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Scale, Building2, FileText, Brain, Bell, Shield, 
  Upload, Plus, Home, Settings, User, Menu, X,
  MessageCircle, CheckCircle, AlertTriangle
} from 'lucide-react';

const LegalPlatform: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const sidebarItems = [
    { id: 'overview', label: 'نظرة عامة', icon: Home },
    { id: 'labor-cases', label: 'القضايا العمالية', icon: Building2 },
    { id: 'commercial-cases', label: 'القضايا التجارية', icon: FileText },
    { id: 'ai-assistant', label: 'المساعد الذكي AI', icon: Brain },
    { id: 'documents', label: 'المستندات', icon: FileText },
    { id: 'alerts', label: 'التنبيهات القانونية', icon: Bell }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Scale className="h-8 w-8" style={{ color: '#4CB898' }} />
              <div>
                <h1 className="text-xl font-bold text-black">منصة الشؤون القانونية</h1>
                <p className="text-sm text-gray-600">Legal Affairs Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse bg-gray-100 px-3 py-1 rounded-full">
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">أحمد المحمد</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <Home className="h-5 w-5" />
                العودة للرئيسية
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200">
          <div className="p-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#4CB898] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-[#4CB898] to-[#4CB898]/80 text-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-2">مرحباً بك في منصة الشؤون القانونية</h2>
              <p className="text-lg opacity-90">إدارة ذكية ومتكاملة لجميع الشؤون القانونية لمنشأتك</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">القضايا النشطة</p>
                      <p className="text-2xl font-bold" style={{ color: '#4CB898' }}>12</p>
                    </div>
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">المستندات</p>
                      <p className="text-2xl font-bold text-black">45</p>
                    </div>
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">التنبيهات</p>
                      <p className="text-2xl font-bold text-red-600">3</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">نسبة الامتثال</p>
                      <p className="text-2xl font-bold text-green-600">98%</p>
                    </div>
                    <Shield className="h-8 w-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>الإجراءات السريعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                    <Brain className="h-8 w-8 mb-2" style={{ color: '#4CB898' }} />
                    <span>استشارة ذكية</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                    <FileText className="h-8 w-8 text-black mb-2" />
                    <span>منشئ المستندات</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                    <Upload className="h-8 w-8 text-black mb-2" />
                    <span>رفع مستندات جديدة</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                    <Shield className="h-8 w-8 text-black mb-2" />
                    <span>مدقق الامتثال</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Supabase Integration Notice */}
            <Card>
              <CardHeader>
                <CardTitle>🚀 تفعيل الوظائف المتقدمة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-2">يتطلب ربط Supabase لتفعيل:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• حفظ وإدارة القضايا والمستندات</li>
                    <li>• المساعد القانوني الذكي المدعوم بالـ AI</li>
                    <li>• نظام التنبيهات التلقائية</li>
                    <li>• تخزين الملفات والمستندات</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LegalPlatform;