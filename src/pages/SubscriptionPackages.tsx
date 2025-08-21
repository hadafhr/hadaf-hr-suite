import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Check, 
  Star, 
  Users, 
  Calculator,
  ArrowLeft,
  Crown,
  Zap,
  Shield,
  Loader2,
  Building2,
  Sparkles
} from 'lucide-react';
import { BackButton } from '@/components/BackButton';
import { BoudLogo } from '@/components/BoudLogo';

interface Package {
  id: string;
  package_name: string;
  package_name_en?: string;
  description?: string;
  price_monthly: number;
  price_yearly: number;
  max_employees: number;
  features: any; // Will handle Json type from database
  is_active: boolean;
}

const SubscriptionPackages: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [employeeCount, setEmployeeCount] = useState<number>(10);
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);

  // Fetch packages from database
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('boud_subscription_packages')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly');

      if (error) throw error;

      setPackages(data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast({
        title: "خطأ في جلب البيانات",
        description: "تعذر جلب باقات الاشتراك",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (packageId: string) => {
    if (!companyName || !contactEmail) {
      toast({
        title: "بيانات مفقودة",
        description: "يرجى إدخال اسم الشركة والبريد الإلكتروني",
        variant: "destructive"
      });
      return;
    }

    if (employeeCount <= 0) {
      toast({
        title: "عدد الموظفين غير صحيح",
        description: "يرجى إدخال عدد الموظفين الصحيح",
        variant: "destructive"
      });
      return;
    }

    try {
      setProcessingPayment(true);

      console.log('Creating checkout session...');

      const { data, error } = await supabase.functions.invoke('create-subscription-checkout', {
        body: {
          packageId,
          billingCycle,
          companyName,
          employeeCount,
          contactEmail,
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log('Checkout session created:', data);

      // Redirect to Stripe checkout
      if (data.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('رابط الدفع غير متوفر');
      }

    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "خطأ في إنشاء الاشتراك",
        description: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
        variant: "destructive"
      });
    } finally {
      setProcessingPayment(false);
    }
  };

  const calculatePrice = (pkg: Package) => {
    const basePrice = billingCycle === 'monthly' ? pkg.price_monthly : pkg.price_yearly;
    const totalPrice = basePrice * employeeCount;
    return totalPrice;
  };

  const calculateSavings = (pkg: Package) => {
    const monthlyTotal = pkg.price_monthly * 12 * employeeCount;
    const yearlyTotal = pkg.price_yearly * employeeCount;
    return monthlyTotal - yearlyTotal;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="text-center">
              <Loader2 className="animate-spin h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">جاري تحميل الباقات...</h3>
              <p className="text-muted-foreground">يرجى الانتظار</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <BackButton />
            <BoudLogo size="md" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container mx-auto px-6 text-center">
          <div className="space-y-4 max-w-4xl mx-auto">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 ml-1" />
              اختر الباقة المناسبة لشركتك
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold">
              باقات <span className="text-primary">بُعد HR</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              اختر الباقة التي تناسب حجم شركتك واحتياجاتك، مع إمكانية الترقية أو التخصيص في أي وقت
            </p>
          </div>
        </div>
      </section>

      {/* Configuration Section */}
      <section className="py-8 bg-card border-b">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>تخصيص اشتراكك</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-6">
                {/* Company Info */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">اسم الشركة *</Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="أدخل اسم شركتك"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">البريد الإلكتروني *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="your@company.com"
                      required
                    />
                  </div>
                </div>

                {/* Employee Count */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="employeeCount">عدد الموظفين</Label>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <Input
                        id="employeeCount"
                        type="number"
                        min="1"
                        max="1000"
                        value={employeeCount}
                        onChange={(e) => setEmployeeCount(parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      يمكنك تعديل العدد لاحقاً
                    </p>
                  </div>
                </div>

                {/* Billing Cycle */}
                <div className="space-y-4">
                  <Label>دورة الفوترة</Label>
                  <RadioGroup
                    value={billingCycle}
                    onValueChange={(value) => setBillingCycle(value as 'monthly' | 'yearly')}
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="yearly" id="yearly" />
                      <Label htmlFor="yearly" className="flex items-center gap-2">
                        سنوي 
                        <Badge variant="secondary" className="text-xs">وفر 15%</Badge>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly">شهري</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg, index) => {
              const isPopular = index === 1; // Middle package as popular
              const totalPrice = calculatePrice(pkg);
              const savings = billingCycle === 'yearly' ? calculateSavings(pkg) : 0;
              
              return (
                <Card 
                  key={pkg.id} 
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                    isPopular 
                      ? 'border-primary shadow-lg ring-2 ring-primary/20' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary/80 text-white text-center py-2 text-sm font-medium">
                      <Star className="w-4 h-4 inline mr-1" />
                      الأكثر شعبية
                    </div>
                  )}
                  
                  <CardHeader className={`text-center pb-4 ${isPopular ? 'pt-12' : 'pt-6'}`}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      {index === 0 && <Building2 className="w-8 h-8 text-blue-600" />}
                      {index === 1 && <Users className="w-8 h-8 text-primary" />}
                      {index === 2 && <Crown className="w-8 h-8 text-amber-600" />}
                    </div>
                    <CardTitle className="text-2xl font-bold">{pkg.package_name}</CardTitle>
                    <p className="text-muted-foreground">{pkg.description}</p>
                    
                    <div className="pt-4">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold">{totalPrice.toFixed(0)}</span>
                        <span className="text-lg text-muted-foreground">ريال</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً'} • {employeeCount} موظف
                      </p>
                      {savings > 0 && (
                        <p className="text-sm text-green-600 font-medium mt-1">
                          وفر {savings.toFixed(0)} ريال سنوياً
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {(Array.isArray(pkg.features) ? pkg.features : []).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="pt-6">
                      <Button 
                        className={`w-full ${
                          isPopular 
                            ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                            : ''
                        }`}
                        variant={isPopular ? 'default' : 'outline'}
                        onClick={() => handleSubscribe(pkg.id)}
                        disabled={processingPayment || employeeCount > pkg.max_employees}
                      >
                        {processingPayment ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            جاري المعالجة...
                          </>
                        ) : (
                          'اشترك الآن'
                        )}
                      </Button>
                      {employeeCount > pkg.max_employees && (
                        <p className="text-sm text-orange-600 mt-2 text-center">
                          هذه الباقة تدعم حتى {pkg.max_employees} موظف
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Section */}
          <div className="text-center mt-16 p-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border">
            <h3 className="text-2xl font-bold mb-4">تحتاج باقة مخصصة؟</h3>
            <p className="text-muted-foreground mb-6">
              تواصل معنا لتصميم باقة تناسب احتياجاتك الخاصة ومتطلبات شركتك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/chat-messaging')}>
                تواصل مع فريق المبيعات
              </Button>
              <Button variant="outline" onClick={() => navigate('/service-calculator')}>
                احسب التكلفة المخصصة
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionPackages;