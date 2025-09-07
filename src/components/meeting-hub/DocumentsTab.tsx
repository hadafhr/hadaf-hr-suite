import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Upload, 
  Download, 
  FileText, 
  Image, 
  FileSpreadsheet,
  Presentation,
  File,
  Eye,
  Trash2,
  Filter,
  Calendar,
  User
} from 'lucide-react';
import { meetingService, Document } from '@/services/meetingService';
import { useToast } from '@/hooks/use-toast';

export const DocumentsTab: React.FC = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [newDocument, setNewDocument] = useState({
    title: '',
    description: '',
    document_type: 'general' as Document['document_type'],
    is_public: true,
    meeting_id: undefined as string | undefined
  });

  useEffect(() => {
    loadDocuments();
  }, []);

  useEffect(() => {
    filterDocuments();
  }, [documents, searchTerm, typeFilter]);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const data = await meetingService.getMeetingDocuments();
      setDocuments(data);
    } catch (error) {
      console.error('Error loading documents:', error);
      toast({
        title: "خطأ في تحميل المستندات",
        description: "حدث خطأ أثناء تحميل قائمة المستندات",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterDocuments = () => {
    let filtered = documents;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.uploader_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(doc => doc.document_type === typeFilter);
    }

    setFilteredDocuments(filtered);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!newDocument.title) {
      toast({
        title: "عنوان مطلوب",
        description: "يرجى إدخال عنوان للمستند",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      // In a real implementation, you would upload to Supabase Storage here
      // For now, we'll simulate the upload and create a document record
      
      const mockFilePath = `/documents/${Date.now()}-${file.name}`;
      const mockFileUrl = `https://example.com${mockFilePath}`;

      const documentData = {
        ...newDocument,
        file_name: file.name,
        file_path: mockFilePath,
        file_type: file.type || getFileTypeFromName(file.name),
        file_size: file.size,
        uploaded_by: 'current-user-id', // This should come from auth
        uploader_name: 'المستخدم الحالي' // This should come from auth
      };

      await meetingService.uploadDocument(documentData);

      clearInterval(progressInterval);
      setUploadProgress(100);

      setTimeout(() => {
        setShowUploadDialog(false);
        setIsUploading(false);
        setUploadProgress(0);
        setNewDocument({
          title: '',
          description: '',
          document_type: 'general',
          is_public: true,
          meeting_id: undefined
        });

        toast({
          title: "تم رفع المستند",
          description: "تم رفع المستند بنجاح",
        });

        loadDocuments();
      }, 1000);

    } catch (error) {
      console.error('Error uploading document:', error);
      setIsUploading(false);
      setUploadProgress(0);
      toast({
        title: "خطأ في رفع المستند",
        description: "حدث خطأ أثناء رفع المستند",
        variant: "destructive"
      });
    }
  };

  const getFileTypeFromName = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const typeMap: Record<string, string> = {
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ppt: 'application/vnd.ms-powerpoint',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif'
    };
    return typeMap[extension || ''] || 'application/octet-stream';
  };

  const getFileTypeIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <FileText className="h-6 w-6 text-red-500" />;
    if (fileType.includes('word') || fileType.includes('document')) return <FileText className="h-6 w-6 text-blue-500" />;
    if (fileType.includes('sheet') || fileType.includes('excel')) return <FileSpreadsheet className="h-6 w-6 text-green-500" />;
    if (fileType.includes('presentation') || fileType.includes('powerpoint')) return <Presentation className="h-6 w-6 text-orange-500" />;
    if (fileType.includes('image')) return <Image className="h-6 w-6 text-purple-500" />;
    return <File className="h-6 w-6 text-gray-500" />;
  };

  const getDocumentTypeBadge = (type: string) => {
    const configs = {
      agenda: { text: 'جدول أعمال', className: 'bg-blue-100 text-blue-800' },
      minutes: { text: 'محضر', className: 'bg-green-100 text-green-800' },
      presentation: { text: 'عرض تقديمي', className: 'bg-purple-100 text-purple-800' },
      report: { text: 'تقرير', className: 'bg-orange-100 text-orange-800' },
      contract: { text: 'عقد', className: 'bg-red-100 text-red-800' },
      general: { text: 'عام', className: 'bg-gray-100 text-gray-800' }
    };
    return configs[type as keyof typeof configs] || configs.general;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownload = async (documentId: string, fileName: string) => {
    try {
      await meetingService.incrementDownloadCount(documentId);
      // In a real implementation, you would download from Supabase Storage
      toast({
        title: "تحميل المستند",
        description: `تم بدء تحميل ${fileName}`,
      });
    } catch (error) {
      console.error('Error downloading document:', error);
      toast({
        title: "خطأ في التحميل",
        description: "حدث خطأ أثناء تحميل المستند",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (documentId: string) => {
    // In a real implementation, you would delete from Supabase
    toast({
      title: "حذف المستند",
      description: "تم حذف المستند بنجاح",
    });
    loadDocuments();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>إدارة المستندات</CardTitle>
            <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  رفع مستند جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>رفع مستند جديد</DialogTitle>
                  <DialogDescription>
                    اختر ملف وأدخل تفاصيل المستند
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="doc-title">عنوان المستند *</Label>
                    <Input
                      id="doc-title"
                      value={newDocument.title}
                      onChange={(e) => setNewDocument({...newDocument, title: e.target.value})}
                      placeholder="أدخل عنوان المستند"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="doc-description">الوصف</Label>
                    <Textarea
                      id="doc-description"
                      value={newDocument.description}
                      onChange={(e) => setNewDocument({...newDocument, description: e.target.value})}
                      placeholder="أدخل وصف المستند"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="doc-type">نوع المستند</Label>
                    <Select value={newDocument.document_type} onValueChange={(value: any) => setNewDocument({...newDocument, document_type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">عام</SelectItem>
                        <SelectItem value="agenda">جدول أعمال</SelectItem>
                        <SelectItem value="minutes">محضر اجتماع</SelectItem>
                        <SelectItem value="presentation">عرض تقديمي</SelectItem>
                        <SelectItem value="report">تقرير</SelectItem>
                        <SelectItem value="contract">عقد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="file-input">اختيار الملف *</Label>
                    <Input
                      id="file-input"
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
                      disabled={isUploading}
                    />
                  </div>
                  {isUploading && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowUploadDialog(false)} disabled={isUploading}>
                    إلغاء
                  </Button>
                  <Button 
                    onClick={() => fileInputRef.current?.click()} 
                    disabled={isUploading || !newDocument.title}
                  >
                    {isUploading ? 'جاري الرفع...' : 'رفع المستند'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 min-w-64">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث في المستندات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="نوع المستند" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="agenda">جدول أعمال</SelectItem>
                <SelectItem value="minutes">محضر اجتماع</SelectItem>
                <SelectItem value="presentation">عرض تقديمي</SelectItem>
                <SelectItem value="report">تقرير</SelectItem>
                <SelectItem value="contract">عقد</SelectItem>
                <SelectItem value="general">عام</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">لا توجد مستندات</h3>
            <p className="text-gray-500">لم يتم العثور على مستندات تطابق المعايير المحددة</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    {getFileTypeIcon(document.file_type)}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{document.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{document.file_name}</p>
                    </div>
                  </div>
                  <Badge className={getDocumentTypeBadge(document.document_type).className}>
                    {getDocumentTypeBadge(document.document_type).text}
                  </Badge>
                </div>

                {document.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {document.description}
                  </p>
                )}

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>رفع بواسطة: {document.uploader_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(document.created_at)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>الحجم: {formatFileSize(document.file_size)}</span>
                    <span>تحميلات: {document.download_count}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleDownload(document.id, document.file_name)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    تحميل
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDelete(document.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>

                {document.is_public && (
                  <div className="mt-3 pt-3 border-t">
                    <Badge variant="outline" className="text-xs">
                      متاح للجميع
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};