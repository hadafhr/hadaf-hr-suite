import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, Download, Calendar, Video, Clock, Users } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const AnalyticsTab = () => {
  const overviewStats = {
    totalMeetings: 145,
    totalHours: 387,
    avgAttendance: 87,
    productivityScore: 92
  };

  const meetingTrends = [
    { month: 'يناير', meetings: 20, hours: 52 },
    { month: 'فبراير', meetings: 25, hours: 67 },
    { month: 'مارس', meetings: 18, hours: 45 },
    { month: 'أبريل', meetings: 30, hours: 78 },
    { month: 'مايو', meetings: 28, hours: 73 },
    { month: 'يونيو', meetings: 24, hours: 62 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center justify-between">
        <Select defaultValue="last_6_months">
          <SelectTrigger className="w-48">
            <Calendar className="h-4 w-4 ml-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last_month">الشهر الماضي</SelectItem>
            <SelectItem value="last_3_months">آخر 3 شهور</SelectItem>
            <SelectItem value="last_6_months">آخر 6 شهور</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <Download className="h-4 w-4 ml-2" />
          تصدير التقرير
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الاجتماعات</p>
                <p className="text-2xl font-bold text-blue-600">{overviewStats.totalMeetings}</p>
              </div>
              <Video className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ساعات الاجتماعات</p>
                <p className="text-2xl font-bold text-green-600">{overviewStats.totalHours}</p>
              </div>
              <Clock className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الحضور</p>
                <p className="text-2xl font-bold text-purple-600">{overviewStats.avgAttendance}%</p>
              </div>
              <Users className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">نقاط الإنتاجية</p>
                <p className="text-2xl font-bold text-orange-600">{overviewStats.productivityScore}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>اتجاهات الاجتماعات الشهرية</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={meetingTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="meetings" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
              <Area type="monotone" dataKey="hours" stackId="2" stroke="#10b981" fill="#10b981" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};