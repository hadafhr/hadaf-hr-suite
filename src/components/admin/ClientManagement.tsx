import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Building2,
  Users,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Crown,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

interface Client {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  employees: number;
  plan: 'basic' | 'professional' | 'enterprise' | 'enterprise+';
  status: 'active' | 'suspended' | 'pending' | 'trial';
  joinDate: string;
  lastLogin: string;
  monthlyRevenue: number;
  industry: string;
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'شركة الراجحي للتقنية',
    contactPerson: 'أحمد الراجحي',
    email: 'ahmed@alrajhi-tech.com',
    phone: '+966501234567',
    employees: 2500,
    plan: 'enterprise+',
    status: 'active',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-10',
    monthlyRevenue: 25000,
    industry: 'تقنية المعلومات'
  },
  {
    id: '2',
    name: 'مؤسسة النور التجارية',
    contactPerson: 'فاطمة النور',
    email: 'fatima@alnoor.com.sa',
    phone: '+966507654321',
    employees: 150,
    plan: 'professional',
    status: 'active',
    joinDate: '2023-03-20',
    lastLogin: '2024-01-09',
    monthlyRevenue: 5500,
    industry: 'التجارة'
  },
  {
    id: '3',
    name: 'شركة المستقبل للاستشارات',
    contactPerson: 'محمد المستقبل',
    email: 'mohammed@future-consulting.sa',
    phone: '+966509876543',
    employees: 75,
    plan: 'basic',
    status: 'trial',
    joinDate: '2024-01-05',
    lastLogin: '2024-01-08',
    monthlyRevenue: 0,
    industry: 'استشارات'
  }
];

export const ClientManagement: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isViewClientOpen, setIsViewClientOpen] = useState(false);

  const getPlanBadge = (plan: string) => {
    const variants = {
      'basic': 'secondary',
      'professional': 'default',
      'enterprise': 'destructive',
      'enterprise+': 'outline'
    };
    
    const labels = {
      'basic': isArabic ? 'أساسي' : 'Basic',
      'professional': isArabic ? 'احترافي' : 'Professional',
      'enterprise': isArabic ? 'مؤسسي' : 'Enterprise',
      'enterprise+': isArabic ? 'مؤسسي+' : 'Enterprise+'
    };
    
    return (
      <Badge variant={variants[plan as keyof typeof variants] as any}>
        {labels[plan as keyof typeof labels]}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'default',
      'suspended': 'destructive',
      'pending': 'secondary',
      'trial': 'outline'
    };
    
    const labels = {
      'active': isArabic ? 'نشط' : 'Active',
      'suspended': isArabic ? 'معلق' : 'Suspended',
      'pending': isArabic ? 'معلق' : 'Pending',
      'trial': isArabic ? 'تجريبي' : 'Trial'
    };
    
    return (
      <Badge variant={variants[status as keyof typeof variants] as any}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setIsViewClientOpen(true);
  };

  const handleSuspendClient = (clientId: string) => {
    toast.success(isArabic ? 'تم تعليق العميل بنجاح' : 'Client suspended successfully');
  };

  const handleActivateClient = (clientId: string) => {
    toast.success(isArabic ? 'تم تفعيل العميل بنجاح' : 'Client activated successfully');
  };

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{isArabic ? 'إدارة العملاء' : 'Client Management'}</h2>
          <p className="text-muted-foreground">
            {isArabic ? 'إدارة العملاء والاشتراكات والحسابات' : 'Manage clients, subscriptions, and accounts'}
          </p>
        </div>
        <Button onClick={() => setIsAddClientOpen(true)} className="bg-primary">
          <Plus className="h-4 w-4 mr-2" />
          {isArabic ? 'عميل جديد' : 'New Client'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{mockClients.length}</p>
                <p className="text-sm text-muted-foreground">{isArabic ? 'إجمالي العملاء' : 'Total Clients'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{mockClients.filter(c => c.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">{isArabic ? 'عملاء نشطون' : 'Active Clients'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">
                  {mockClients.reduce((sum, client) => sum + client.employees, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">{isArabic ? 'إجمالي الموظفين' : 'Total Employees'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {mockClients.reduce((sum, client) => sum + client.monthlyRevenue, 0).toLocaleString()} ر.س
                </p>
                <p className="text-sm text-muted-foreground">{isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={isArabic ? 'البحث عن العملاء...' : 'Search clients...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={isArabic ? 'تصفية بالحالة' : 'Filter by status'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isArabic ? 'جميع الحالات' : 'All Statuses'}</SelectItem>
                <SelectItem value="active">{isArabic ? 'نشط' : 'Active'}</SelectItem>
                <SelectItem value="suspended">{isArabic ? 'معلق' : 'Suspended'}</SelectItem>
                <SelectItem value="pending">{isArabic ? 'معلق' : 'Pending'}</SelectItem>
                <SelectItem value="trial">{isArabic ? 'تجريبي' : 'Trial'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isArabic ? 'العميل' : 'Client'}</TableHead>
                <TableHead>{isArabic ? 'المسؤول' : 'Contact Person'}</TableHead>
                <TableHead>{isArabic ? 'الموظفين' : 'Employees'}</TableHead>
                <TableHead>{isArabic ? 'الخطة' : 'Plan'}</TableHead>
                <TableHead>{isArabic ? 'الحالة' : 'Status'}</TableHead>
                <TableHead>{isArabic ? 'الإيرادات' : 'Revenue'}</TableHead>
                <TableHead>{isArabic ? 'الإجراءات' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-muted-foreground">{client.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{client.contactPerson}</div>
                      <div className="text-sm text-muted-foreground">{client.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{client.employees.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getPlanBadge(client.plan)}</TableCell>
                  <TableCell>{getStatusBadge(client.status)}</TableCell>
                  <TableCell>
                    {client.monthlyRevenue > 0 
                      ? `${client.monthlyRevenue.toLocaleString()} ر.س`
                      : isArabic ? 'تجريبي' : 'Trial'
                    }
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewClient(client)}>
                          <Eye className="h-4 w-4 mr-2" />
                          {isArabic ? 'عرض التفاصيل' : 'View Details'}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          {isArabic ? 'تعديل' : 'Edit'}
                        </DropdownMenuItem>
                        {client.status === 'active' ? (
                          <DropdownMenuItem onClick={() => handleSuspendClient(client.id)}>
                            <AlertCircle className="h-4 w-4 mr-2" />
                            {isArabic ? 'تعليق' : 'Suspend'}
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleActivateClient(client.id)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {isArabic ? 'تفعيل' : 'Activate'}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Client Details Dialog */}
      <Dialog open={isViewClientOpen} onOpenChange={setIsViewClientOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isArabic ? 'تفاصيل العميل' : 'Client Details'}</DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">{isArabic ? 'اسم الشركة' : 'Company Name'}</Label>
                  <p className="text-sm text-muted-foreground">{selectedClient.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">{isArabic ? 'المسؤول' : 'Contact Person'}</Label>
                  <p className="text-sm text-muted-foreground">{selectedClient.contactPerson}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">{isArabic ? 'البريد الإلكتروني' : 'Email'}</Label>
                  <p className="text-sm text-muted-foreground">{selectedClient.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">{isArabic ? 'الهاتف' : 'Phone'}</Label>
                  <p className="text-sm text-muted-foreground">{selectedClient.phone}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">{isArabic ? 'عدد الموظفين' : 'Employees'}</Label>
                  <p className="text-sm text-muted-foreground">{selectedClient.employees.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">{isArabic ? 'الخطة' : 'Plan'}</Label>
                  <div className="mt-1">{getPlanBadge(selectedClient.plan)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">{isArabic ? 'تاريخ الانضمام' : 'Join Date'}</Label>
                  <p className="text-sm text-muted-foreground">{selectedClient.joinDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">{isArabic ? 'آخر تسجيل دخول' : 'Last Login'}</Label>
                  <p className="text-sm text-muted-foreground">{selectedClient.lastLogin}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};