import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Upload, Download, Share2, Search, Plus } from 'lucide-react';

export const DocumentsTab = () => {
  const [documents] = useState([
    {
      id: '1',
      name: 'تقرير الأداء الربع سنوي 2024',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2024-01-20',
      downloads: 12
    },
    {
      id: '2',
      name: 'عرض تقديمي - استراتيجية 2024',
      type: 'pptx',
      size: '5.1 MB',
      uploadDate: '2024-01-18',
      downloads: 23
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="البحث في المستندات..." className="pl-10" />
        </div>
        <Button>
          <Upload className="h-4 w-4 ml-2" />
          رفع مستند
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="h-8 w-8 text-blue-500" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{doc.name}</h4>
                  <p className="text-xs text-muted-foreground">{doc.size}</p>
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mb-4">
                <span>{doc.uploadDate}</span>
                <span>{doc.downloads} تحميل</span>
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="h-3 w-3 ml-1" />
                  تحميل
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="h-3 w-3 ml-1" />
                  مشاركة
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};