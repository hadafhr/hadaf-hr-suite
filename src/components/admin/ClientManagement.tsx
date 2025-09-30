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

  console.log('ClientManagement - clients:', clients);
  console.log('ClientManagement - isLoading:', isLoading);
  console.log('ClientManagement - error:', error);

  const getPlanBadge = (plan: string) => {
    const variants = {
      'basic': { variant: 'secondary' as const, className: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      'professional': { variant: 'default' as const, className: 'bg-green-500/20 text-green-300 border-green-500/30' },
      'enterprise': { variant: 'destructive' as const, className: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
      'enterprise+': { variant: 'outline' as const, className: 'bg-gold-500/20 text-yellow-300 border-yellow-500/30' }
    };
    
    const labels = {
      'basic': isArabic ? 'أساسي' : 'Basic',
      'professional': isArabic ? 'احترافي' : 'Professional',
      'enterprise': isArabic ? 'مؤسسي' : 'Enterprise',
      'enterprise+': isArabic ? 'مؤسسي+' : 'Enterprise+'
    };
    
    const config = variants[plan as keyof typeof variants];
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {labels[plan as keyof typeof labels]}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': { variant: 'default' as const, className: 'bg-green-500/20 text-green-300 border-green-500/30' },
      'suspended': { variant: 'destructive' as const, className: 'bg-red-500/20 text-red-300 border-red-500/30' },
      'pending': { variant: 'secondary' as const, className: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
      'trial': { variant: 'outline' as const, className: 'bg-blue-500/20 text-blue-300 border-blue-500/30' }
    };
    
    const labels = {
      'active': isArabic ? 'نشط' : 'Active',
      'suspended': isArabic ? 'معلق' : 'Suspended',
      'pending': isArabic ? 'معلق' : 'Pending',
      'trial': isArabic ? 'تجريبي' : 'Trial'
    };
    
    const config = variants[status as keyof typeof variants];
    
    return (
      <Badge variant={config.variant} className={config.className}>
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
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
        <span className="ml-2 text-white">{isArabic ? 'جاري التحميل...' : 'Loading...'}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <span className="ml-2 text-red-400">{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            {isArabic ? 'إدارة العملاء' : 'Client Management'}
          </h2>
          <p className="text-gray-300">
            {isArabic ? 'إدارة العملاء والاشتراكات والحسابات' : 'Manage clients, subscriptions, and accounts'}
          </p>
        </div>
        <Button 
          onClick={() => setIsAddClientOpen(true)} 
          className="bg-gradient-to-r from-accent to-accent hover:from-accent/80 hover:to-accent/80 text-accent-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          {isArabic ? 'عميل جديد' : 'New Client'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="backdrop-blur-xl bg-card border border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="p-3 rounded-full bg-gradient-to-r from-accent/20 to-accent/20 backdrop-blur-sm border border-accent/30">
                <Building2 className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{clients.length}</p>
                <p className="text-sm text-muted-foreground">{isArabic ? 'إجمالي العملاء' : 'Total Clients'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-card border border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="p-3 rounded-full bg-gradient-to-r from-success/20 to-success/20 backdrop-blur-sm border border-success/30">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{clients.filter(c => c.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">{isArabic ? 'عملاء نشطون' : 'Active Clients'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-card border border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="p-3 rounded-full bg-gradient-to-r from-primary/20 to-primary/20 backdrop-blur-sm border border-primary/30">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {clients.reduce((sum, client) => sum + client.employees, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">{isArabic ? 'إجمالي الموظفين' : 'Total Employees'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-card border border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="p-3 rounded-full bg-gradient-to-r from-success/20 to-success/20 backdrop-blur-sm border border-success/30">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {clients.reduce((sum, client) => sum + client.monthly_revenue, 0).toLocaleString()} ر.س
                </p>
                <p className="text-sm text-muted-foreground">{isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="backdrop-blur-xl bg-card border border-border rounded-2xl">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={isArabic ? 'البحث عن العملاء...' : 'Search clients...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-border focus:border-accent bg-card text-foreground placeholder:text-muted-foreground rounded-lg"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 border-border focus:border-accent bg-card text-foreground">
                <SelectValue placeholder={isArabic ? 'تصفية بالحالة' : 'Filter by status'} />
              </SelectTrigger>
              <SelectContent className="bg-card backdrop-blur-xl border border-border text-foreground">
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
      <Card className="backdrop-blur-xl bg-card border border-border rounded-2xl">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead className="text-muted-foreground text-center">{isArabic ? 'العميل' : 'Client'}</TableHead>
                <TableHead className="text-muted-foreground text-center">{isArabic ? 'المسؤول' : 'Contact Person'}</TableHead>
                <TableHead className="text-muted-foreground text-center">{isArabic ? 'الموظفين' : 'Employees'}</TableHead>
                <TableHead className="text-muted-foreground text-center">{isArabic ? 'الخطة' : 'Plan'}</TableHead>
                <TableHead className="text-muted-foreground text-center">{isArabic ? 'الحالة' : 'Status'}</TableHead>
                <TableHead className="text-muted-foreground text-center">{isArabic ? 'الإيرادات' : 'Revenue'}</TableHead>
                <TableHead className="text-muted-foreground text-center">{isArabic ? 'الإجراءات' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id} className="border-b border-border hover:bg-accent/10">
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{client.name}</div>
                      <div className="text-sm text-muted-foreground">{client.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-white">{client.contact_person}</div>
                      <div className="text-sm text-gray-300">{client.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-white">{client.employees.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getPlanBadge(client.plan)}</TableCell>
                  <TableCell>{getStatusBadge(client.status)}</TableCell>
                  <TableCell className="text-white">
                    {client.monthly_revenue > 0 
                      ? `${client.monthly_revenue.toLocaleString()} ر.س`
                      : isArabic ? 'تجريبي' : 'Trial'
                    }
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-white hover:bg-[#008C6A]/20">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-xl border border-[#008C6A]/30 text-white">
                        <DropdownMenuItem onClick={() => handleViewClient(client)} className="hover:bg-[#008C6A]/20">
                          <Eye className="h-4 w-4 mr-2" />
                          {isArabic ? 'عرض التفاصيل' : 'View Details'}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-[#008C6A]/20">
                          <Edit className="h-4 w-4 mr-2" />
                          {isArabic ? 'تعديل' : 'Edit'}
                        </DropdownMenuItem>
                        {client.status === 'active' ? (
                          <DropdownMenuItem onClick={() => handleSuspendClient(client.id)} className="hover:bg-[#008C6A]/20">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            {isArabic ? 'تعليق' : 'Suspend'}
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleActivateClient(client.id)} className="hover:bg-[#008C6A]/20">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {isArabic ? 'تفعيل' : 'Activate'}
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          onClick={() => handleDeleteClient(client.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
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
        <DialogContent className="max-w-2xl bg-black/90 backdrop-blur-xl border border-[#008C6A]/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">{isArabic ? 'تفاصيل العميل' : 'Client Details'}</DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-300">{isArabic ? 'اسم الشركة' : 'Company Name'}</Label>
                  <p className="text-sm text-white">{selectedClient.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">{isArabic ? 'المسؤول' : 'Contact Person'}</Label>
                  <p className="text-sm text-white">{selectedClient.contact_person}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">{isArabic ? 'البريد الإلكتروني' : 'Email'}</Label>
                  <p className="text-sm text-white">{selectedClient.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">{isArabic ? 'الهاتف' : 'Phone'}</Label>
                  <p className="text-sm text-white">{selectedClient.phone}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-300">{isArabic ? 'عدد الموظفين' : 'Employees'}</Label>
                  <p className="text-sm text-white">{selectedClient.employees.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">{isArabic ? 'الخطة' : 'Plan'}</Label>
                  <div className="mt-1">{getPlanBadge(selectedClient.plan)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">{isArabic ? 'تاريخ الانضمام' : 'Join Date'}</Label>
                  <p className="text-sm text-white">{selectedClient.join_date}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">{isArabic ? 'آخر تسجيل دخول' : 'Last Login'}</Label>
                  <p className="text-sm text-white">{selectedClient.last_login || isArabic ? 'غير متوفر' : 'N/A'}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Client Dialog */}
      <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
        <DialogContent className="max-w-2xl bg-black/90 backdrop-blur-xl border border-[#008C6A]/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">{isArabic ? 'إضافة عميل جديد' : 'Add New Client'}</DialogTitle>
            <DialogDescription className="text-gray-300">
              {isArabic ? 'أدخل بيانات العميل الجديد' : 'Enter the new client details'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-gray-300">{isArabic ? 'اسم الشركة' : 'Company Name'}</Label>
              <Input
                id="name"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                placeholder={isArabic ? 'أدخل اسم الشركة' : 'Enter company name'}
                className="border-gray-800/50 focus:border-[#008C6A]/50 bg-black/30 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div>
              <Label htmlFor="contact_person" className="text-gray-300">{isArabic ? 'المسؤول' : 'Contact Person'}</Label>
              <Input
                id="contact_person"
                value={newClient.contact_person}
                onChange={(e) => setNewClient({ ...newClient, contact_person: e.target.value })}
                placeholder={isArabic ? 'أدخل اسم المسؤول' : 'Enter contact person name'}
                className="border-gray-800/50 focus:border-[#008C6A]/50 bg-black/30 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-gray-300">{isArabic ? 'البريد الإلكتروني' : 'Email'}</Label>
              <Input
                id="email"
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                placeholder={isArabic ? 'أدخل البريد الإلكتروني' : 'Enter email address'}
                className="border-gray-800/50 focus:border-[#008C6A]/50 bg-black/30 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-gray-300">{isArabic ? 'الهاتف' : 'Phone'}</Label>
              <Input
                id="phone"
                value={newClient.phone}
                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                placeholder={isArabic ? 'أدخل رقم الهاتف' : 'Enter phone number'}
                className="border-gray-800/50 focus:border-[#008C6A]/50 bg-black/30 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div>
              <Label htmlFor="employees" className="text-gray-300">{isArabic ? 'عدد الموظفين' : 'Number of Employees'}</Label>
              <Input
                id="employees"
                type="number"
                value={newClient.employees}
                onChange={(e) => setNewClient({ ...newClient, employees: parseInt(e.target.value) || 0 })}
                placeholder="0"
                className="border-gray-800/50 focus:border-[#008C6A]/50 bg-black/30 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div>
              <Label htmlFor="plan" className="text-gray-300">{isArabic ? 'الخطة' : 'Plan'}</Label>
              <Select value={newClient.plan} onValueChange={(value: any) => setNewClient({ ...newClient, plan: value })}>
                <SelectTrigger className="border-gray-800/50 focus:border-[#008C6A]/50 bg-black/30 text-white">
                  <SelectValue placeholder={isArabic ? 'اختر الخطة' : 'Select plan'} />
                </SelectTrigger>
                <SelectContent className="bg-black/90 backdrop-blur-xl border border-[#008C6A]/30 text-white">
                  <SelectItem value="basic">{isArabic ? 'أساسي' : 'Basic'}</SelectItem>
                  <SelectItem value="professional">{isArabic ? 'احترافي' : 'Professional'}</SelectItem>
                  <SelectItem value="enterprise">{isArabic ? 'مؤسسي' : 'Enterprise'}</SelectItem>
                  <SelectItem value="enterprise+">{isArabic ? 'مؤسسي+' : 'Enterprise+'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="industry" className="text-gray-300">{isArabic ? 'المجال' : 'Industry'}</Label>
              <Input
                id="industry"
                value={newClient.industry}
                onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
                placeholder={isArabic ? 'أدخل مجال الشركة' : 'Enter company industry'}
                className="border-gray-800/50 focus:border-[#008C6A]/50 bg-black/30 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div>
              <Label htmlFor="monthly_revenue" className="text-gray-300">{isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue'}</Label>
              <Input
                id="monthly_revenue"
                type="number"
                value={newClient.monthly_revenue}
                onChange={(e) => setNewClient({ ...newClient, monthly_revenue: parseFloat(e.target.value) || 0 })}
                placeholder="0"
                className="border-gray-800/50 focus:border-[#008C6A]/50 bg-black/30 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddClientOpen(false)}
              className="border-gray-600 text-white hover:bg-gray-800"
            >
              {isArabic ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button
              onClick={handleAddClient}
              className="bg-gradient-to-r from-[#008C6A] to-[#00694F] hover:from-[#008C6A]/80 hover:to-[#00694F]/80 text-white"
            >
              {isArabic ? 'إضافة العميل' : 'Add Client'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};