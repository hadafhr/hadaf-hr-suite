import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoudLayout } from '@/components/layout/BoudLayout';
import { TeamWorkforce } from '@/pages/TeamWorkforce';

const ComprehensiveEmployeeManagement = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('team');

  const handleBack = () => {
    navigate(-1);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'team':
        return <TeamWorkforce />;
      case 'dashboard':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-4">لوحة التحكم الرئيسية</h2>
            <p className="text-text-muted">مرحباً بك في نظام إدارة الموارد البشرية المتكامل</p>
          </div>
        );
      case 'recruitment':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-4">قسم التوظيف</h2>
            <p className="text-text-muted">إدارة عمليات التوظيف والاستقطاب</p>
          </div>
        );
      case 'attendance':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-4">قسم الحضور والانصراف</h2>
            <p className="text-text-muted">متابعة وإدارة حضور الموظفين</p>
          </div>
        );
      case 'leaves':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-4">قسم الإجازات</h2>
            <p className="text-text-muted">إدارة طلبات الإجازات والموافقات</p>
          </div>
        );
      case 'payroll':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-4">قسم الرواتب</h2>
            <p className="text-text-muted">إدارة الرواتب والمكافآت</p>
          </div>
        );
      case 'training':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-4">قسم التدريب والتطوير</h2>
            <p className="text-text-muted">إدارة برامج التدريب والتطوير المهني</p>
          </div>
        );
      case 'performance':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-4">قسم تقييم الأداء</h2>
            <p className="text-text-muted">متابعة وتقييم أداء الموظفين</p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-4">قسم التقارير</h2>
            <p className="text-text-muted">إنتاج التقارير والإحصائيات</p>
          </div>
        );
      case 'organization':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-4">قسم الهيكل التنظيمي</h2>
            <p className="text-text-muted">إدارة الهيكل التنظيمي للشركة</p>
          </div>
        );
      case 'documents':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-4">قسم إدارة الوثائق</h2>
            <p className="text-text-muted">إدارة وثائق الموظفين والشركة</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-4">الإعدادات</h2>
            <p className="text-text-muted">إعدادات النظام والتخصيص</p>
          </div>
        );
      default:
        return (
          <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-4">قسم {activeSection}</h2>
            <p className="text-text-muted">هذا القسم قيد التطوير...</p>
          </div>
        );
    }
  };

  return (
    <BoudLayout
      title="نظام إدارة الموارد البشرية المتكامل"
      onBack={handleBack}
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
    >
      {renderContent()}
    </BoudLayout>
  );
};

export default ComprehensiveEmployeeManagement;