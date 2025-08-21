import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import { BoudLogo } from './BoudLogo';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const contactMethods = [
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      value: 'info@boud-hr.com',
      description: 'للاستفسارات العامة والدعم',
      action: () => window.open('mailto:info@boud-hr.com')
    },
    {
      icon: Phone,
      title: 'الهاتف',
      value: '+966 11 234 5678',
      description: 'متوفر من السبت للخميس',
      action: () => window.open('tel:+966112345678')
    },
    {
      icon: MessageCircle,
      title: 'واتساب',
      value: '+966 50 123 4567',
      description: 'دردشة مباشرة مع فريق الدعم',
      action: () => window.open('https://wa.me/966501234567')
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BoudLogo variant="icon" size="md" />
          </div>
          <DialogTitle className="text-xl font-bold text-gradient">
            تواصل معنا
          </DialogTitle>
          <p className="text-muted-foreground text-sm mt-2">
            فريقنا جاهز لمساعدتك في أي وقت
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <div
                key={index}
                onClick={method.action}
                className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-sm transition-all cursor-pointer hover:border-primary/50"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <IconComponent className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{method.title}</h4>
                  <p className="text-sm font-medium text-primary">{method.value}</p>
                  <p className="text-xs text-muted-foreground">{method.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* معلومات إضافية */}
        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <Clock className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-sm mb-1">ساعات العمل</h4>
              <p className="text-xs text-muted-foreground">
                السبت - الخميس: 8:00 ص - 6:00 م<br />
                الجمعة: مغلق
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-sm mb-1">العنوان</h4>
              <p className="text-xs text-muted-foreground">
                الرياض، حي الملك فهد<br />
                مبنى الأعمال المتطورة، الطابق 12
              </p>
            </div>
          </div>
        </div>

        <Button 
          onClick={onClose}
          variant="outline" 
          className="w-full mt-4"
        >
          إغلاق
        </Button>
      </DialogContent>
    </Dialog>
  );
};