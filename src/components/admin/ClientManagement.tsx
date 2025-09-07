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
  DollarSign,
  Loader2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useClientManagement, Client, NewClient } from '@/hooks/useClientManagement';


export const ClientManagement: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isViewClientOpen, setIsViewClientOpen] = useState(false);
  const [newClient, setNewClient] = useState<NewClient>({
    name: '',
    contact_person: '',
    email: '',
    phone: '',
    employees: 0,
    plan: 'basic',
    industry: '',
    monthly_revenue: 0
  });
  
  const { 
    clients, 
    isLoading, 
    error, 
    addClient, 
    suspendClient, 
    activateClient,
    deleteClient
  } = useClientManagement();

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

  const handleSuspendClient = async (clientId: string) => {
    await suspendClient(clientId);
  };

  const handleActivateClient = async (clientId: string) => {
    await activateClient(clientId);
  };

  const handleDeleteClient = async (clientId: string) => {
    if (window.confirm(isArabic ? 'هل أنت متأكد من حذف هذا العميل؟' : 'Are you sure you want to delete this client?')) {
      await deleteClient(clientId);
    }
  };

  const handleAddClient = async () => {
    const success = await addClient(newClient);
    if (success) {
      setIsAddClientOpen(false);
      setNewClient({
        name: '',
        contact_person: '',
        email: '',
        phone: '',
        employees: 0,
        plan: 'basic',
        industry: '',
        monthly_revenue: 0
      });
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contact_person.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">{isArabic ? 'جاري التحميل...' : 'Loading...'}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <span className="ml-2 text-red-500">{error}</span>
      </div>
    );
  }

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
                <p className="text-2xl font-bold">{clients.length}</p>
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
                <p className="text-2xl font-bold">{clients.filter(c => c.status === 'active').length}</p>
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
                  {clients.reduce((sum, client) => sum + client.employees, 0).toLocaleString()}
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
                  {clients.reduce((sum, client) => sum + client.monthly_revenue, 0).toLocaleString()} ر.س
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
                      <div className="font-medium">{client.contact_person}</div>
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
                    {client.monthly_revenue > 0 
                      ? `${client.monthly_revenue.toLocaleString()} ر.س`
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
                        <DropdownMenuItem 
                          onClick={() => handleDeleteClient(client.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          {isArabic ? 'حذف' : 'Delete'}
                        </DropdownMenuItem>
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
                  <p className="text-sm text-muted-foreground">{selectedClient.contact_person}</p>
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
                  <p className="text-sm text-muted-foreground">{selectedClient.join_date}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">{isArabic ? 'آخر تسجيل دخول' : 'Last Login'}</Label>
                  <p className="text-sm text-muted-foreground">{selectedClient.last_login || isArabic ? 'غير متوفر' : 'N/A'}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Client Dialog */}
      <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isArabic ? 'إضافة عميل جديد' : 'Add New Client'}</DialogTitle>
            <DialogDescription>
              {isArabic ? 'أدخل بيانات العميل الجديد' : 'Enter the new client details'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">{isArabic ? 'اسم الشركة' : 'Company Name'}</Label>
              <Input
                id="name"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                placeholder={isArabic ? 'أدخل اسم الشركة' : 'Enter company name'}
              />
            </div>
            
            <div>
              <Label htmlFor="contact_person">{isArabic ? 'المسؤول' : 'Contact Person'}</Label>
              <Input
                id="contact_person"
                value={newClient.contact_person}
                onChange={(e) => setNewClient({ ...newClient, contact_person: e.target.value })}
                placeholder={isArabic ? 'أدخل اسم المسؤول' : 'Enter contact person name'}
              />
            </div>
            
            <div>
              <Label htmlFor="email">{isArabic ? 'البريد الإلكتروني' : 'Email'}</Label>
              <Input
                id="email"
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                placeholder={isArabic ? 'أدخل البريد الإلكتروني' : 'Enter email address'}
              />
            </div>
            
            <div>
              <Label htmlFor="phone">{isArabic ? 'الهاتف' : 'Phone'}</Label>
              <Input
                id="phone"
                value={newClient.phone}
                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                placeholder={isArabic ? 'أدخل رقم الهاتف' : 'Enter phone number'}
              />
            </div>
            
            <div>
              <Label htmlFor="employees">{isArabic ? 'عدد الموظفين' : 'Number of Employees'}</Label>
              <Input
                id="employees"
                type="number"
                value={newClient.employees}
                onChange={(e) => setNewClient({ ...newClient, employees: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label htmlFor="plan">{isArabic ? 'الخطة' : 'Plan'}</Label>
              <Select value={newClient.plan} onValueChange={(value: any) => setNewClient({ ...newClient, plan: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={isArabic ? 'اختر الخطة' : 'Select plan'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">{isArabic ? 'أساسي' : 'Basic'}</SelectItem>
                  <SelectItem value="professional">{isArabic ? 'احترافي' : 'Professional'}</SelectItem>
                  <SelectItem value="enterprise">{isArabic ? 'مؤسسي' : 'Enterprise'}</SelectItem>
                  <SelectItem value="enterprise+">{isArabic ? 'مؤسسي+' : 'Enterprise+'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="industry">{isArabic ? 'المجال' : 'Industry'}</Label>
              <Input
                id="industry"
                value={newClient.industry}
                onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
                placeholder={isArabic ? 'أدخل مجال الشركة' : 'Enter company industry'}
              />
            </div>
            
            <div>
              <Label htmlFor="monthly_revenue">{isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue'}</Label>
              <Input
                id="monthly_revenue"
                type="number"
                value={newClient.monthly_revenue}
                onChange={(e) => setNewClient({ ...newClient, monthly_revenue: parseFloat(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddClientOpen(false)}>
              {isArabic ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={handleAddClient}>
              {isArabic ? 'إضافة العميل' : 'Add Client'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};