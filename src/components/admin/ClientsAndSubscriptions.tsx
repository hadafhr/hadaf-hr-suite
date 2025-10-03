import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Crown } from 'lucide-react';
import { ClientManagement } from './ClientManagement';
import { SubscriptionManagement } from './SubscriptionManagement';
import { useTranslation } from 'react-i18next';

export const ClientsAndSubscriptions: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('clients');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {isArabic ? 'العملاء والاشتراكات' : 'Clients & Subscriptions'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isArabic ? 'إدارة شاملة للعملاء واشتراكاتهم' : 'Comprehensive management of clients and their subscriptions'}
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/40 backdrop-blur-xl border border-border">
          <TabsTrigger 
            value="clients" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent data-[state=active]:to-accent data-[state=active]:text-black text-white"
          >
            <Building2 className="h-4 w-4 mr-2" />
            {isArabic ? 'العملاء' : 'Clients'}
          </TabsTrigger>
          <TabsTrigger 
            value="subscriptions"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent data-[state=active]:to-accent data-[state=active]:text-black text-white"
          >
            <Crown className="h-4 w-4 mr-2" />
            {isArabic ? 'الاشتراكات' : 'Subscriptions'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="mt-6">
          <ClientManagement />
        </TabsContent>

        <TabsContent value="subscriptions" className="mt-6">
          <SubscriptionManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};
