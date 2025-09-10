import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Shield, Users, Plus, Edit, Key, Lock } from 'lucide-react';

export const PermissionManagement = () => {
  const [roles] = useState([
    {
      id: '1',
      name: 'مدير الموارد البشرية',
      description: 'صلاحيات كاملة لإدارة التوظيف',
      userCount: 2,
      isDefault: false
    },
    {
      id: '2',
      name: 'منسق التوظيف',
      description: 'إدارة الوظائف والمتقدمين',
      userCount: 5,
      isDefault: false
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الأدوار</p>
                <p className="text-2xl font-bold text-blue-600">{roles.length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            إدارة الأدوار
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              دور جديد
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roles.map((role) => (
              <div key={role.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{role.name}</h4>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                    <Badge variant="secondary" className="mt-1">{role.userCount} مستخدم</Badge>
                  </div>
                  <div className="flex gap-2">
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