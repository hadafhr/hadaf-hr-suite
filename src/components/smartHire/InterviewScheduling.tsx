import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Plus, Video, MapPin, Users, CheckCircle } from 'lucide-react';

export const InterviewScheduling = () => {
  const [interviews] = useState([
    {
      id: '1',
      candidateName: 'أحمد محمد العتيبي',
      position: 'مطور Full Stack',
      date: '2024-01-25',
      time: '10:00',
      duration: 60,
      type: 'online',
      location: 'Zoom Meeting',
      interviewer: 'سارة أحمد',
      status: 'scheduled'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">مقابلات اليوم</p>
                <p className="text-2xl font-bold text-blue-600">3</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            المقابلات المجدولة
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              مقابلة جديدة
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interviews.map((interview) => (
              <div key={interview.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{interview.candidateName}</h4>
                    <p className="text-sm text-muted-foreground">{interview.position}</p>
                    <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                      <span>{interview.date} - {interview.time}</span>
                      <span>{interview.duration} دقيقة</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-blue-100 text-blue-800">مجدولة</Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Video className="h-3 w-3" />
                      عبر الإنترنت
                    </Badge>
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