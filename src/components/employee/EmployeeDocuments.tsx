import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileText,
  Upload,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Plus,
  File,
  Image as ImageIcon
} from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { EmployeeDocument } from '@/hooks/useEmployeeDashboard';
import { useToast } from '@/hooks/use-toast';

interface EmployeeDocumentsProps {
  documents: EmployeeDocument[];
  onUpload: (file: File, documentType: string, documentName?: string) => Promise<EmployeeDocument | null>;
}

export const EmployeeDocuments: React.FC<EmployeeDocumentsProps> = ({
  documents,
  onUpload
}) => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const documentTypes = [
    { value: 'national_id', label: 'الهوية الوطنية / الإقامة', icon: FileText },
    { value: 'passport', label: 'جواز السفر', icon: FileText },
    { value: 'certificate', label: 'المؤهلات العلمية', icon: FileText },
    { value: 'contract', label: 'عقد العمل', icon: FileText },
    { value: 'medical', label: 'التقارير الطبية', icon: FileText },
    { value: 'other', label: 'مستندات أخرى', icon: File }
  ];

  const getDocumentTypeLabel = (type: string) => {
    const docType = documentTypes.find(dt => dt.value === type);
    return docType ? docType.label : type;
  };

  const getDocumentIcon = (type: string, mimeType?: string) => {
    if (mimeType?.startsWith('image/')) {
      return <ImageIcon className="h-5 w-5" />;
    }
    return <FileText className="h-5 w-5" />;
  };

  const getVerificationBadge = (isVerified: boolean) => {
    if (isVerified) {
      return (
        <Badge variant="default" className="flex items-center gap-1 bg-green-600">
          <CheckCircle className="h-3 w-3" />
          موثق
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        قيد المراجعة
      </Badge>
    );
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // التحقق من نوع الملف
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "نوع ملف غير مدعوم",
        description: "يُسمح فقط بملفات PDF وصور JPG/PNG",
        variant: "destructive",
      });
      return;
    }

    // التحقق من حجم الملف (5MB كحد أقصى)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast({
        title: "حجم الملف كبير جداً",
        description: "يجب أن يكون حجم الملف أقل من 5 ميجابايت",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    if (!documentName) {
      setDocumentName(file.name);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedDocumentType) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى اختيار نوع المستند والملف",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const result = await onUpload(selectedFile, selectedDocumentType, documentName);
      if (result) {
        setIsUploadDialogOpen(false);
        setSelectedFile(null);
        setSelectedDocumentType('');
        setDocumentName('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (document: EmployeeDocument) => {
    try {
      // هنا يمكن إضافة منطق تحميل الملف من Supabase Storage
      toast({
        title: "تحميل الملف",
        description: "سيتم تحميل الملف قريباً",
      });
    } catch (error) {
      toast({
        title: "خطأ في التحميل",
        description: "تعذر تحميل الملف",
        variant: "destructive",
      });
    }
  };

  // تجميع المستندات حسب النوع
  const groupedDocuments = documentTypes.map(type => ({
    ...type,
    documents: documents.filter(doc => doc.document_type === type.value)
  }));

  return (
    <div className="space-y-4">
      {/* رأس القسم مع زر الرفع */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              مستنداتي
            </CardTitle>
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  رفع مستند جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md" dir="rtl">
                <DialogHeader>
                  <DialogTitle>رفع مستند جديد</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="document-type">نوع المستند</Label>
                    <Select value={selectedDocumentType} onValueChange={setSelectedDocumentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع المستند" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <type.icon className="h-4 w-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="document-name">اسم المستند</Label>
                    <Input
                      id="document-name"
                      value={documentName}
                      onChange={(e) => setDocumentName(e.target.value)}
                      placeholder="أدخل اسم المستند"
                    />
                  </div>

                  <div>
                    <Label htmlFor="file-upload">اختر الملف</Label>
                    <Input
                      id="file-upload"
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      أنواع الملفات المدعومة: PDF, JPG, PNG (حد أقصى 5 ميجابايت)
                    </p>
                  </div>

                  {selectedFile && (
                    <div className="p-3 border rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        {getDocumentIcon(selectedDocumentType, selectedFile.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{selectedFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} ميجابايت
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      onClick={handleUpload}
                      disabled={!selectedFile || !selectedDocumentType || isUploading}
                      className="flex-1"
                    >
                      {isUploading ? (
                        <>
                          <Upload className="h-4 w-4 ml-2 animate-pulse" />
                          جارٍ الرفع...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 ml-2" />
                          رفع المستند
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsUploadDialogOpen(false)}
                      disabled={isUploading}
                    >
                      إلغاء
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* إحصائيات المستندات */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المستندات</p>
                <p className="text-2xl font-bold">{documents.length}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">موثقة</p>
                <p className="text-2xl font-bold text-green-600">
                  {documents.filter(doc => doc.is_verified).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">قيد المراجعة</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {documents.filter(doc => !doc.is_verified).length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">أنواع مختلفة</p>
                <p className="text-2xl font-bold text-blue-600">
                  {new Set(documents.map(doc => doc.document_type)).size}
                </p>
              </div>
              <File className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* قائمة المستندات مجمعة حسب النوع */}
      <div className="space-y-4">
        {groupedDocuments.map((group) => (
          <Card key={group.value}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <group.icon className="h-5 w-5" />
                {group.label}
                <Badge variant="outline" className="mr-auto">
                  {group.documents.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {group.documents.length > 0 ? (
                <div className="space-y-3">
                  {group.documents.map((document) => (
                    <div
                      key={document.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getDocumentIcon(document.document_type)}
                        <div>
                          <h4 className="font-medium text-sm">{document.document_name}</h4>
                          <p className="text-xs text-muted-foreground">
                            تم الرفع في: {format(new Date(document.created_at), 'dd/MM/yyyy HH:mm', { locale: ar })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getVerificationBadge(document.is_verified)}
                        
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownload(document)}
                            className="h-8 w-8 p-0"
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <group.icon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>لم يتم رفع أي مستندات من هذا النوع</p>
                  <p className="text-sm">استخدم زر "رفع مستند جديد" لإضافة مستندات</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {documents.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">لا توجد مستندات</h3>
              <p className="text-muted-foreground mb-4">
                ابدأ برفع مستنداتك الشخصية للمراجعة والتوثيق
              </p>
              <Button onClick={() => setIsUploadDialogOpen(true)}>
                <Plus className="h-4 w-4 ml-2" />
                رفع أول مستند
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};