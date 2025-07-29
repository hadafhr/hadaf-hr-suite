import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  Clock, 
  CheckCircle,
  Users,
  Settings
} from 'lucide-react';

interface MessageTemplate {
  id: string;
  name: string;
  type: 'initial_screening' | 'interview_invitation' | 'rejection' | 'acceptance';
  subject: string;
  content: string;
  channels: ('email' | 'sms')[];
}

interface SentMessage {
  id: string;
  applicantId: string;
  applicantName: string;
  templateId: string;
  templateName: string;
  channels: ('email' | 'sms')[];
  sentAt: string;
  status: 'sent' | 'delivered' | 'failed';
}

export const AutoMessaging: React.FC = () => {
  const [templates, setTemplates] = React.useState<MessageTemplate[]>([
    {
      id: '1',
      name: 'رسالة الترشيح المبدئي',
      type: 'initial_screening',
      subject: 'تم قبول طلبك - {job_title}',
      content: 'مرحباً {applicant_name},\n\nنشكر لك التقديم على وظيفة {job_title}. يسعدنا إبلاغك بأنك ضمن المرشحين الأوليين، وسنقوم بالتواصل معك قريباً لتحديد موعد المقابلة.\n\nمع أطيب التحيات،\nفريق الموارد البشرية',
      channels: ['email', 'sms']
    },
    {
      id: '2',
      name: 'دعوة للمقابلة',
      type: 'interview_invitation',
      subject: 'دعوة لمقابلة شخصية - {job_title}',
      content: 'مرحباً {applicant_name},\n\nتم تحديد موعد المقابلة الخاصة بك لوظيفة {job_title}:\n\nالتاريخ: {interview_date}\nالوقت: {interview_time}\nالموقع: {interview_location}\nالرابط: {interview_link}\n\nيرجى التأكيد على حضورك.\n\nمع أطيب التحيات،\nفريق الموارد البشرية',
      channels: ['email', 'sms']
    },
    {
      id: '3',
      name: 'رسالة اعتذار',
      type: 'rejection',
      subject: 'شكراً لاهتمامك - {job_title}',
      content: 'مرحباً {applicant_name},\n\nنشكرك على اهتمامك بالانضمام إلى فريقنا. بعد مراجعة دقيقة لطلبك، نأسف لإبلاغك بعدم ترشيحك للمرحلة الحالية.\n\nنتمنى لك التوفيق في مسيرتك المهنية.\n\nمع أطيب التحيات،\nفريق الموارد البشرية',
      channels: ['email']
    }
  ]);

  const [sentMessages, setSentMessages] = React.useState<SentMessage[]>([
    {
      id: '1',
      applicantId: '1',
      applicantName: 'أحمد محمد العتيبي',
      templateId: '1',
      templateName: 'رسالة الترشيح المبدئي',
      channels: ['email', 'sms'],
      sentAt: '2024-01-20 10:30',
      status: 'delivered'
    },
    {
      id: '2',
      applicantId: '2',
      applicantName: 'فاطمة سالم القحطاني',
      templateId: '2',
      templateName: 'دعوة للمقابلة',
      channels: ['email'],
      sentAt: '2024-01-19 14:15',
      status: 'delivered'
    }
  ]);

  const [newTemplateDialog, setNewTemplateDialog] = React.useState(false);
  const [templateForm, setTemplateForm] = React.useState({
    name: '',
    type: 'initial_screening' as MessageTemplate['type'],
    subject: '',
    content: '',
    channels: [] as ('email' | 'sms')[]
  });

  const handleCreateTemplate = () => {
    const newTemplate: MessageTemplate = {
      id: Date.now().toString(),
      name: templateForm.name,
      type: templateForm.type,
      subject: templateForm.subject,
      content: templateForm.content,
      channels: templateForm.channels
    };

    setTemplates(prev => [newTemplate, ...prev]);
    setNewTemplateDialog(false);
    setTemplateForm({
      name: '',
      type: 'initial_screening',
      subject: '',
      content: '',
      channels: []
    });
  };

  const getTypeLabel = (type: MessageTemplate['type']) => {
    switch (type) {
      case 'initial_screening': return 'ترشيح مبدئي';
      case 'interview_invitation': return 'دعوة مقابلة';
      case 'rejection': return 'اعتذار';
      case 'acceptance': return 'قبول';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-500';
      case 'delivered': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">التواصل التلقائي</h2>
          <p className="text-slate-600 dark:text-slate-300">إدارة رسائل التواصل مع المتقدمين</p>
        </div>
        <Dialog open={newTemplateDialog} onOpenChange={setNewTemplateDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              إضافة قالب جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl" dir="rtl">
            <DialogHeader>
              <DialogTitle>إنشاء قالب رسالة جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="template-name">اسم القالب</Label>
                  <Input
                    id="template-name"
                    value={templateForm.name}
                    onChange={(e) => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="مثال: رسالة الترشيح المبدئي"
                  />
                </div>
                <div>
                  <Label htmlFor="template-type">نوع الرسالة</Label>
                  <Select value={templateForm.type} onValueChange={(value: any) => setTemplateForm(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="initial_screening">ترشيح مبدئي</SelectItem>
                      <SelectItem value="interview_invitation">دعوة مقابلة</SelectItem>
                      <SelectItem value="rejection">اعتذار</SelectItem>
                      <SelectItem value="acceptance">قبول</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="template-subject">موضوع الرسالة</Label>
                <Input
                  id="template-subject"
                  value={templateForm.subject}
                  onChange={(e) => setTemplateForm(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="مثال: تم قبول طلبك - {job_title}"
                />
              </div>

              <div>
                <Label htmlFor="template-content">محتوى الرسالة</Label>
                <Textarea
                  id="template-content"
                  value={templateForm.content}
                  onChange={(e) => setTemplateForm(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="استخدم المتغيرات: {applicant_name}, {job_title}, {interview_date}, {interview_time}"
                  rows={6}
                />
                <p className="text-xs text-slate-500 mt-1">
                  المتغيرات المتاحة: {'{applicant_name}'}, {'{job_title}'}, {'{interview_date}'}, {'{interview_time}'}, {'{interview_location}'}, {'{interview_link}'}
                </p>
              </div>

              <div>
                <Label>قنوات الإرسال</Label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={templateForm.channels.includes('email')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTemplateForm(prev => ({ ...prev, channels: [...prev.channels, 'email'] }));
                        } else {
                          setTemplateForm(prev => ({ ...prev, channels: prev.channels.filter(c => c !== 'email') }));
                        }
                      }}
                    />
                    <Mail className="w-4 h-4" />
                    البريد الإلكتروني
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={templateForm.channels.includes('sms')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTemplateForm(prev => ({ ...prev, channels: [...prev.channels, 'sms'] }));
                        } else {
                          setTemplateForm(prev => ({ ...prev, channels: prev.channels.filter(c => c !== 'sms') }));
                        }
                      }}
                    />
                    <MessageSquare className="w-4 h-4" />
                    الرسائل النصية
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setNewTemplateDialog(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleCreateTemplate}>
                  إنشاء القالب
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message Templates */}
        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">قوالب الرسائل</h3>
            <Settings className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-3">
            {templates.map((template) => (
              <div key={template.id} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{template.name}</h4>
                  <Badge className="bg-blue-100 text-blue-800">
                    {getTypeLabel(template.type)}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {template.subject}
                </p>
                <div className="flex items-center gap-2">
                  {template.channels.map((channel) => (
                    <div key={channel} className="flex items-center gap-1 text-xs text-slate-500">
                      {channel === 'email' ? <Mail className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
                      {channel === 'email' ? 'إيميل' : 'SMS'}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Sent Messages */}
        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">الرسائل المرسلة</h3>
            <Send className="w-5 h-5 text-green-600" />
          </div>
          <div className="space-y-3">
            {sentMessages.map((message) => (
              <div key={message.id} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{message.applicantName}</h4>
                  <Badge className={`${getStatusColor(message.status)} text-white`}>
                    {message.status === 'sent' ? 'مرسلة' : message.status === 'delivered' ? 'تم التسليم' : 'فشل'}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {message.templateName}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {message.channels.map((channel) => (
                      <div key={channel} className="flex items-center gap-1 text-xs text-slate-500">
                        {channel === 'email' ? <Mail className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
                        {channel === 'email' ? 'إيميل' : 'SMS'}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    {message.sentAt}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">إجراءات سريعة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            إرسال رسائل جماعية
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            إرسال تأكيد المقابلة
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            إرسال رسائل الترشيح
          </Button>
        </div>
      </Card>
    </div>
  );
};