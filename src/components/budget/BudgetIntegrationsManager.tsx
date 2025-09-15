import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Settings, 
  Plus, 
  Wifi, 
  WifiOff, 
  TestTube, 
  RefreshCw, 
  Edit, 
  Trash2,
  Shield,
  Key,
  CheckCircle,
  AlertTriangle,
  Link,
  Database,
  Cloud
} from 'lucide-react';
import { useBudgetIntegrations } from '@/hooks/useBudget';
import { useToast } from '@/hooks/use-toast';

const BudgetIntegrationsManager: React.FC = () => {
  const { integrations, loading, createIntegration, testConnection } = useBudgetIntegrations();
  const { toast } = useToast();
  const [newIntegrationDialog, setNewIntegrationDialog] = useState(false);
  const [testingConnection, setTestingConnection] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    system_name: '',
    api_endpoint: '',
    auth_type: 'api_key' as 'api_key' | 'oauth2',
    token_secret: '',
    status: 'active' as 'active' | 'inactive'
  });

  const handleCreateIntegration = async () => {
    try {
      await createIntegration(formData);
      setNewIntegrationDialog(false);
      setFormData({
        system_name: '',
        api_endpoint: '',
        auth_type: 'api_key',
        token_secret: '',
        status: 'active'
      });
    } catch (error) {
      console.error('Error creating integration:', error);
    }
  };

  const handleTestConnection = async (id: string) => {
    setTestingConnection(id);
    try {
      const success = await testConnection(id);
      if (success) {
        toast({
          title: "نجح اختبار الاتصال",
          description: "تم الاتصال بالنظام الخارجي بنجاح"
        });
      }
    } catch (error) {
      console.error('Connection test failed:', error);
    } finally {
      setTestingConnection(null);
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge variant="default" className="bg-green-100 text-green-800">
        <Wifi className="h-3 w-3 mr-1" />
        نشط
      </Badge>
    ) : (
      <Badge variant="outline" className="border-red-300 text-red-700">
        <WifiOff className="h-3 w-3 mr-1" />
        غير نشط
      </Badge>
    );
  };

  const getSystemIcon = (systemName: string) => {
    const name = systemName.toLowerCase();
    if (name.includes('erp') || name.includes('sap')) {
      return <Database className="h-5 w-5 text-blue-600" />;
    }
    if (name.includes('cloud') || name.includes('aws') || name.includes('azure')) {
      return <Cloud className="h-5 w-5 text-purple-600" />;
    }
    return <Link className="h-5 w-5 text-gray-600" />;
  };

  const formatLastSync = (lastSync: string | undefined) => {
    if (!lastSync) return 'لم يتم المزامنة';
    const date = new Date(lastSync);
    return `${date.toLocaleDateString('ar-SA')} ${date.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })}`;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">جاري تحميل التكاملات...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{integrations.length}</p>
                <p className="text-sm text-muted-foreground">إجمالي التكاملات</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{integrations.filter(i => i.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">نشط</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{integrations.filter(i => i.status === 'inactive').length}</p>
                <p className="text-sm text-muted-foreground">غير نشط</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              إدارة التكاملات مع الأنظمة الخارجية
            </CardTitle>
            <Button onClick={() => setNewIntegrationDialog(true)}>
              <Plus className="h-4 w-4 ml-2" />
              إضافة تكامل جديد
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {integrations.length === 0 ? (
            <div className="text-center py-12">
              <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-lg font-medium">لا توجد تكاملات مُعدة</p>
              <p className="text-sm text-muted-foreground mb-4">
                ابدأ بإضافة تكامل مع نظام خارجي لمزامنة البيانات المالية
              </p>
              <Button onClick={() => setNewIntegrationDialog(true)}>
                <Plus className="h-4 w-4 ml-2" />
                إضافة تكامل جديد
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>النظام</TableHead>
                  <TableHead>نوع المصادقة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>آخر مزامنة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {integrations.map((integration) => (
                  <TableRow key={integration.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {getSystemIcon(integration.system_name)}
                        <div>
                          <p className="font-medium">{integration.system_name}</p>
                          {integration.api_endpoint && (
                            <p className="text-sm text-muted-foreground">
                              {integration.api_endpoint}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        {integration.auth_type === 'api_key' ? (
                          <>
                            <Key className="h-3 w-3" />
                            API Key
                          </>
                        ) : (
                          <>
                            <Shield className="h-3 w-3" />
                            OAuth2
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(integration.status)}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {formatLastSync(integration.last_sync)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTestConnection(integration.id)}
                          disabled={testingConnection === integration.id}
                        >
                          {testingConnection === integration.id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <TestTube className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* New Integration Dialog */}
      <Dialog open={newIntegrationDialog} onOpenChange={setNewIntegrationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة تكامل جديد</DialogTitle>
            <DialogDescription>
              أضف تكامل مع نظام خارجي لمزامنة البيانات المالية
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="system_name">اسم النظام</Label>
              <Input
                id="system_name"
                placeholder="مثال: SAP ERP، Oracle Financial"
                value={formData.system_name}
                onChange={(e) => setFormData(prev => ({ ...prev, system_name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api_endpoint">رابط API</Label>
              <Input
                id="api_endpoint"
                placeholder="https://api.example.com/v1"
                value={formData.api_endpoint}
                onChange={(e) => setFormData(prev => ({ ...prev, api_endpoint: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="auth_type">نوع المصادقة</Label>
              <Select
                value={formData.auth_type}
                onValueChange={(value: 'api_key' | 'oauth2') => 
                  setFormData(prev => ({ ...prev, auth_type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="api_key">API Key</SelectItem>
                  <SelectItem value="oauth2">OAuth2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="token_secret">
                {formData.auth_type === 'api_key' ? 'API Key' : 'OAuth Token'}
              </Label>
              <Input
                id="token_secret"
                type="password"
                placeholder="أدخل المفتاح السري..."
                value={formData.token_secret}
                onChange={(e) => setFormData(prev => ({ ...prev, token_secret: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewIntegrationDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleCreateIntegration}>
              إضافة التكامل
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BudgetIntegrationsManager;