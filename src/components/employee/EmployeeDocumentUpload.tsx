import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Download, Trash2, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Document {
  id: string;
  name: string;
  type: 'national_id' | 'passport' | 'residence' | 'certificate' | 'contract' | 'other';
  fileName: string;
  uploadDate: string;
  size: string;
  status: 'pending' | 'approved' | 'rejected';
}

const documentTypes = [
  { value: 'national_id', label: 'الهوية الوطنية' },
  { value: 'passport', label: 'جواز السفر' },
  { value: 'residence', label: 'الإقامة' },
  { value: 'certificate', label: 'المؤهل العلمي' },
  { value: 'contract', label: 'عقد العمل' },
  { value: 'other', label: 'أخرى' }
];

export const EmployeeDocumentUpload: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'الهوية الوطنية',
      type: 'national_id',
      fileName: 'national_id_scan.pdf',
      uploadDate: '2024-01-15',
      size: '2.5 MB',
      status: 'approved'
    },
    {
      id: '2',
      name: 'جواز السفر',
      type: 'passport',
      fileName: 'passport_scan.pdf',
      uploadDate: '2024-01-15',
      size: '1.8 MB',
      status: 'pending'
    }
  ]);

  const [selectedType, setSelectedType] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmitDocument = () => {
    if (!file || !selectedType) {
      toast.error('يرجى اختيار نوع المستند والملف');
      return;
    }

    const newDocument: Document = {
      id: Date.now().toString(),
      name: documentTypes.find(type => type.value === selectedType)?.label || '',
      type: selectedType as Document['type'],
      fileName: file.name,
      uploadDate: new Date().toISOString().split('T')[0],
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      status: 'pending'
    };

    setDocuments(prev => [...prev, newDocument]);
    setFile(null);
    setSelectedType('');
    toast.success('تم رفع المستند بنجاح');
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    toast.success('تم حذف المستند بنجاح');
  };

  const getStatusBadge = (status: Document['status']) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-success/10 text-success border-success/20"><Check className="w-3 h-3 mr-1" />موافق عليه</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />مرفوض</Badge>;
      default:
        return <Badge variant="secondary"><AlertCircle className="w-3 h-3 mr-1" />قيد المراجعة</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            رفع مستند جديد
          </CardTitle>
          <CardDescription>
            قم برفع المستندات الرسمية المطلوبة
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="document-type">نوع المستند</Label>
              <select
                id="document-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">اختر نوع المستند</option>
                {documentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="document-file">الملف</Label>
              <Input
                id="document-file"
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png"
                className="bg-background border-border"
              />
            </div>
          </div>
          <Button 
            onClick={handleSubmitDocument}
            disabled={!file || !selectedType}
            className="w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            رفع المستند
          </Button>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            المستندات المرفوعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map(document => (
              <div key={document.id} className="flex items-center justify-between p-4 border border-border/20 rounded-lg bg-background/50">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{document.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {document.fileName} • {document.size} • {document.uploadDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(document.status)}
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteDocument(document.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {documents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                لا توجد مستندات مرفوعة
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};