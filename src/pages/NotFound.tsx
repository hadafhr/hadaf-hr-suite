import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowRight } from "lucide-react";
import { BoudLogo } from "@/components/BoudLogo";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <BackButton />
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <BoudLogo variant="icon" size="md" />
                <span className="font-bold text-xl text-foreground hidden sm:block">بُعد</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
              <Search className="h-12 w-12 text-primary" />
            </div>
          </div>

          {/* Error Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                الصفحة غير موجودة
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. 
                ربما تم نقل الصفحة أو حذفها أو أنك أدخلت رابط خاطئ.
              </p>
            </div>

            {/* Current Path */}
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">
                المسار المطلوب: 
                <code className="mx-2 px-2 py-1 bg-background rounded text-primary font-mono">
                  {location.pathname}
                </code>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                onClick={() => window.location.href = '/'}
                className="flex items-center justify-center gap-2 flex-1"
              >
                <Home className="h-4 w-4" />
                العودة للصفحة الرئيسية
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => window.history.back()}
                className="flex items-center justify-center gap-2 flex-1"
              >
                العودة للصفحة السابقة
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              صفحات قد تهمك:
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <a href="/hr-tools" className="text-primary hover:text-primary/80 transition-colors">
                أدوات الموارد البشرية
              </a>
              <a href="/solutions" className="text-primary hover:text-primary/80 transition-colors">
                حلولنا
              </a>
              <a href="/pricing" className="text-primary hover:text-primary/80 transition-colors">
                احسب اشتراكك
              </a>
              <a href="/contact" className="text-primary hover:text-primary/80 transition-colors">
                تواصل معنا
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <BoudLogo variant="icon" size="sm" />
              <span className="text-sm text-muted-foreground">
                © 2024 منصة بُعد لإدارة الموارد البشرية
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              جميع الحقوق محفوظة
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
