import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Users, Settings } from 'lucide-react';

interface TeamMembersProps {
  onBack: () => void;
}

const TeamMembers = ({ onBack }: TeamMembersProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="bg-card border-border hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            {isRTL ? 'رجوع' : 'Back'}
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {isRTL ? 'فريق العمل' : 'Team Members'}
            </h1>
          </div>
        </div>

        {/* Under Development Content */}
        <Card className="shadow-lg border-border">
          <CardContent className="p-12">
            <div className="text-center space-y-6">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-primary/10 rounded-full">
                  <Settings className="h-16 w-16 text-primary animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </div>
              
              <h2 className="text-4xl font-bold text-foreground mb-4">
                {isRTL ? 'قيد التطوير' : 'Under Development'}
              </h2>
              
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                {isRTL 
                  ? 'نعمل حاليًا على تطوير هذا القسم ليقدم لك أفضل تجربة ممكنة'
                  : 'We are currently working on this section to provide you with the best possible experience'
                }
              </p>
              
              <div className="flex justify-center mt-8">
                <div className="flex space-x-1 rtl:space-x-reverse">
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamMembers;