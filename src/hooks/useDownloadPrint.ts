import { useToast } from '@/hooks/use-toast';

export interface DownloadOptions {
  data: any;
  filename: string;
  format: 'pdf' | 'excel' | 'csv' | 'docx' | 'json';
}

export const useDownloadPrint = () => {
  const { toast } = useToast();

  const downloadFile = ({ data, filename, format }: DownloadOptions) => {
    try {
      let content: string;
      let mimeType: string;
      let fileExtension: string;

      switch (format) {
        case 'json':
          content = JSON.stringify(data, null, 2);
          mimeType = 'application/json';
          fileExtension = '.json';
          break;
        case 'csv':
          content = convertToCSV(data);
          mimeType = 'text/csv';
          fileExtension = '.csv';
          break;
        case 'excel':
          // For Excel, we'll use CSV format as a fallback
          content = convertToCSV(data);
          mimeType = 'application/vnd.ms-excel';
          fileExtension = '.csv';
          break;
        case 'pdf':
          // For PDF, we'll create a simple text representation
          content = convertToPDFContent(data);
          mimeType = 'application/pdf';
          fileExtension = '.txt'; // Using .txt as fallback
          break;
        case 'docx':
          // For DOCX, we'll create a simple text representation
          content = convertToDocContent(data);
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          fileExtension = '.txt'; // Using .txt as fallback
          break;
        default:
          throw new Error('نوع الملف غير مدعوم');
      }

      const blob = new Blob([content], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "تم التحميل بنجاح",
        description: `تم تحميل الملف ${filename}${fileExtension}`,
      });
    } catch (error) {
      toast({
        title: "خطأ في التحميل",
        description: "حدث خطأ أثناء تحميل الملف",
        variant: "destructive"
      });
    }
  };

  const printData = (data: any, title?: string) => {
    try {
      const printContent = createPrintContent(data, title);
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
        
        toast({
          title: "جاري الطباعة",
          description: "تم فتح نافذة الطباعة",
        });
      } else {
        throw new Error('فشل في فتح نافذة الطباعة');
      }
    } catch (error) {
      toast({
        title: "خطأ في الطباعة",
        description: "حدث خطأ أثناء تحضير المحتوى للطباعة",
        variant: "destructive"
      });
    }
  };

  const convertToCSV = (data: any[]): string => {
    if (!Array.isArray(data) || data.length === 0) {
      return 'لا توجد بيانات للتصدير';
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(',')
      )
    ].join('\n');

    return csvContent;
  };

  const convertToPDFContent = (data: any): string => {
    if (Array.isArray(data)) {
      return data.map(item => JSON.stringify(item, null, 2)).join('\n\n');
    }
    return JSON.stringify(data, null, 2);
  };

  const convertToDocContent = (data: any): string => {
    if (Array.isArray(data)) {
      return data.map(item => JSON.stringify(item, null, 2)).join('\n\n');
    }
    return JSON.stringify(data, null, 2);
  };

  const createPrintContent = (data: any, title?: string): string => {
    const htmlContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title || 'تقرير'}</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 20px;
            direction: rtl;
            text-align: right;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .date {
            color: #666;
            font-size: 14px;
          }
          .content {
            margin-top: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: right;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          .section {
            margin-bottom: 20px;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">${title || 'تقرير من منصة هدف للموارد البشرية'}</div>
          <div class="date">تاريخ الطباعة: ${new Date().toLocaleDateString('ar-SA')}</div>
        </div>
        <div class="content">
          ${formatDataForPrint(data)}
        </div>
      </body>
      </html>
    `;
    return htmlContent;
  };

  const formatDataForPrint = (data: any): string => {
    if (Array.isArray(data)) {
      if (data.length === 0) return '<p>لا توجد بيانات للعرض</p>';
      
      const headers = Object.keys(data[0]);
      return `
        <table>
          <thead>
            <tr>
              ${headers.map(header => `<th>${header}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${data.map(row => 
              `<tr>
                ${headers.map(header => `<td>${row[header] || '-'}</td>`).join('')}
              </tr>`
            ).join('')}
          </tbody>
        </table>
      `;
    } else if (typeof data === 'object') {
      return Object.entries(data).map(([key, value]) => 
        `<div class="section">
          <div class="section-title">${key}:</div>
          <div>${value}</div>
        </div>`
      ).join('');
    } else {
      return `<p>${data}</p>`;
    }
  };

  return {
    downloadFile,
    printData
  };
};