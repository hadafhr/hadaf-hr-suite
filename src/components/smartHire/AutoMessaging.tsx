import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Plus, Edit, Trash2, Send, Bot, Clock, Users, CheckCircle, AlertCircle, Settings } from 'lucide-react';

export const AutoMessaging = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState([
    {
      id: '1',
      name: 'رسالة ترحيب',
      type: 'welcome',
      subject: 'مرحباً بك - تم استلام طلبك',
      content: 'مرحباً {{name}}، شكراً لك على التقديم لوظيفة {{position}}.',
      trigger: 'automatic',
      isActive: true,
      sentCount: 143
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي القوالب</p>
                <p className="text-2xl font-bold text-blue-600">{templates.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            قوالب الرسائل
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              قالب جديد
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {templates.map((template) => (
              <div key={template.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{template.name}</h4>
                    <p className="text-sm text-muted-foreground">{template.subject}</p>
                  </div>
                  <div className="flex gap-2">
                    <Switch checked={template.isActive} />
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};