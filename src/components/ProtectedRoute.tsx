import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg font-medium">جاري التحقق من صحة تسجيل الدخول...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    // إعادة توجيه للمستخدم إلى صفحة تسجيل الدخول مع حفظ الصفحة المطلوبة
    return <Navigate to="/employee-login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};