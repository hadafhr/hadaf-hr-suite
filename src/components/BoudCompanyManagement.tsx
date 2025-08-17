import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Edit, Building2, Phone, Mail, MapPin } from 'lucide-react';
import { useBoudEMS, BoudCompany } from '@/hooks/useBoudEMS';

export const BoudCompanyManagement: React.FC = () => {
  const { companies, isLoading, addCompany, updateCompany } = useBoudEMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<BoudCompany | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [newCompany, setNewCompany] = useState({
    company_name: '',
    company_name_english: '',
    commercial_register: '',
    tax_number: '',
    contact_email: '',
    contact_phone: '',
    address: ''
  });

  const filteredCompanies = companies.filter(company =>
    company.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (company.company_name_english && company.company_name_english.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (company.contact_email && company.contact_email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddCompany = async () => {
    try {
      await addCompany({
        company_name: newCompany.company_name,
        company_code: `COM-${Date.now()}`,
        company_name_english: newCompany.company_name_english,
        commercial_register: newCompany.commercial_register,
        tax_number: newCompany.tax_number,
        contact_email: newCompany.contact_email,
        contact_phone: newCompany.contact_phone,
        address: newCompany.address
      });
      setIsAddDialogOpen(false);
      setNewCompany({
        company_name: '',
        company_name_english: '',
        commercial_register: '',
        tax_number: '',
        contact_email: '',
        contact_phone: '',
        address: ''
      });
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  const handleUpdateCompany = async () => {
    if (!selectedCompany) return;
    
    try {
      await updateCompany(selectedCompany.id, selectedCompany);
      setIsEditDialogOpen(false);
      setSelectedCompany(null);
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">إدارة الشركات</h2>
          <p className="text-muted-foreground">إدارة وتنظيم بيانات الشركات</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              إضافة شركة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>إضافة شركة جديدة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="company_name">اسم الشركة (عربي)</Label>
                <Input
                  id="company_name"
                  value={newCompany.company_name}
                  onChange={(e) => setNewCompany(prev => ({ ...prev, company_name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="company_name_english">اسم الشركة (إنجليزي)</Label>
                <Input
                  id="company_name_english"
                  value={newCompany.company_name_english}
                  onChange={(e) => setNewCompany(prev => ({ ...prev, company_name_english: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="commercial_register">السجل التجاري</Label>
                  <Input
                    id="commercial_register"
                    value={newCompany.commercial_register}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, commercial_register: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="tax_number">الرقم الضريبي</Label>
                  <Input
                    id="tax_number"
                    value={newCompany.tax_number}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, tax_number: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_email">البريد الإلكتروني</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={newCompany.contact_email}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, contact_email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="contact_phone">رقم الهاتف</Label>
                  <Input
                    id="contact_phone"
                    value={newCompany.contact_phone}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, contact_phone: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">العنوان</Label>
                <Textarea
                  id="address"
                  value={newCompany.address}
                  onChange={(e) => setNewCompany(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddCompany} className="flex-1">
                  إضافة
                </Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="البحث في الشركات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{company.company_name}</CardTitle>
                    {company.company_name_english && (
                      <p className="text-sm text-muted-foreground">{company.company_name_english}</p>
                    )}
                  </div>
                </div>
                <Badge variant={company.is_active ? 'default' : 'secondary'}>
                  {company.is_active ? 'نشط' : 'غير نشط'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {company.contact_email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{company.contact_email}</span>
                </div>
              )}
              {company.contact_phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{company.contact_phone}</span>
                </div>
              )}
              {company.address && (
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="line-clamp-2">{company.address}</span>
                </div>
              )}
              
              <div className="pt-3 border-t">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>السجل التجاري: {company.commercial_register || 'غير محدد'}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>الرقم الضريبي: {company.tax_number || 'غير محدد'}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setSelectedCompany(company);
                    setIsEditDialogOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4 ml-1" />
                  تعديل
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <Card>
          <CardContent className="text-center py-8 text-muted-foreground">
            لا توجد شركات مطابقة لمعايير البحث
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>تعديل بيانات الشركة</DialogTitle>
          </DialogHeader>
          {selectedCompany && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit_company_name">اسم الشركة (عربي)</Label>
                <Input
                  id="edit_company_name"
                  value={selectedCompany.company_name}
                  onChange={(e) => setSelectedCompany(prev => prev ? { ...prev, company_name: e.target.value } : null)}
                />
              </div>
              <div>
                <Label htmlFor="edit_company_name_english">اسم الشركة (إنجليزي)</Label>
                <Input
                  id="edit_company_name_english"
                  value={selectedCompany.company_name_english || ''}
                  onChange={(e) => setSelectedCompany(prev => prev ? { ...prev, company_name_english: e.target.value } : null)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit_commercial_register">السجل التجاري</Label>
                  <Input
                    id="edit_commercial_register"
                    value={selectedCompany.commercial_register || ''}
                    onChange={(e) => setSelectedCompany(prev => prev ? { ...prev, commercial_register: e.target.value } : null)}
                  />
                </div>
                <div>
                  <Label htmlFor="edit_tax_number">الرقم الضريبي</Label>
                  <Input
                    id="edit_tax_number"
                    value={selectedCompany.tax_number || ''}
                    onChange={(e) => setSelectedCompany(prev => prev ? { ...prev, tax_number: e.target.value } : null)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit_contact_email">البريد الإلكتروني</Label>
                  <Input
                    id="edit_contact_email"
                    type="email"
                    value={selectedCompany.contact_email || ''}
                    onChange={(e) => setSelectedCompany(prev => prev ? { ...prev, contact_email: e.target.value } : null)}
                  />
                </div>
                <div>
                  <Label htmlFor="edit_contact_phone">رقم الهاتف</Label>
                  <Input
                    id="edit_contact_phone"
                    value={selectedCompany.contact_phone || ''}
                    onChange={(e) => setSelectedCompany(prev => prev ? { ...prev, contact_phone: e.target.value } : null)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit_address">العنوان</Label>
                <Textarea
                  id="edit_address"
                  value={selectedCompany.address || ''}
                  onChange={(e) => setSelectedCompany(prev => prev ? { ...prev, address: e.target.value } : null)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleUpdateCompany} className="flex-1">
                  حفظ التغييرات
                </Button>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="flex-1">
                  إلغاء
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};