import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle, XCircle, User } from 'lucide-react';

interface TimelineEntry {
  id: string;
  stage: string;
  action: string;
  comments?: string;
  created_at: string;
  actor_id?: string;
}

interface ManpowerRequestTimelineProps {
  requestId: string;
}

export const ManpowerRequestTimeline: React.FC<ManpowerRequestTimelineProps> = ({ requestId }) => {
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const { data, error } = await supabase
          .from('manpower_request_timeline')
          .select('*')
          .eq('request_id', requestId)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setTimeline(data || []);
      } catch (error) {
        console.error('Error fetching timeline:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();

    // Subscribe to timeline updates
    const channel = supabase
      .channel(`timeline_${requestId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'manpower_request_timeline',
          filter: `request_id=eq.${requestId}`,
        },
        () => {
          fetchTimeline();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [requestId]);

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          الخط الزمني للطلب
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeline.map((entry, index) => (
            <div key={entry.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-primary/20 p-2">
                  {entry.stage.includes('approved') || entry.stage.includes('completed') ? (
                    <CheckCircle className="h-4 w-4 text-primary" />
                  ) : entry.stage.includes('rejected') ? (
                    <XCircle className="h-4 w-4 text-destructive" />
                  ) : (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                {index < timeline.length - 1 && (
                  <div className="w-0.5 h-full bg-border flex-1 mt-2" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <p className="font-medium text-foreground">{entry.action}</p>
                {entry.comments && (
                  <p className="text-sm text-muted-foreground mt-1">{entry.comments}</p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(entry.created_at).toLocaleString('ar-SA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
