import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  jobTitle?: string;
  location?: string;
  department?: string;
  jobType?: string;
  salaryMin?: number;
  salaryMax?: number;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'انضم إلى فريق بُعد HR - وظائف تقنية ومميزة في السعودية',
  description = 'اكتشف الفرص الوظيفية المتاحة في بُعد HR، أكبر منصة للموارد البشرية في المملكة. وظائف في التكنولوجيا، التسويق، الموارد البشرية وأكثر.',
  keywords = 'وظائف السعودية, وظائف تقنية, وظائف الرياض, وظائف جدة, بُعد HR, موارد بشرية, برمجة, تطوير, تسويق رقمي',
  jobTitle,
  location,
  department,
  jobType,
  salaryMin,
  salaryMax
}) => {
  // إنشاء structured data للوظائف
  const getJobStructuredData = () => {
    if (!jobTitle) return null;

    const jobPosting = {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: jobTitle,
      description: description,
      hiringOrganization: {
        '@type': 'Organization',
        name: 'بُعد HR',
        sameAs: 'https://boudhr.sa',
        logo: 'https://boudhr.sa/logo.png'
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: location || 'المملكة العربية السعودية',
          addressCountry: 'SA'
        }
      },
      employmentType: getEmploymentType(jobType),
      industry: 'تكنولوجيا المعلومات والخدمات',
      ...(salaryMin && salaryMax && {
        baseSalary: {
          '@type': 'MonetaryAmount',
          currency: 'SAR',
          value: {
            '@type': 'QuantitativeValue',
            minValue: salaryMin,
            maxValue: salaryMax,
            unitText: 'MONTH'
          }
        }
      }),
      datePosted: new Date().toISOString(),
      validThrough: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // شهر من الآن
    };

    return JSON.stringify(jobPosting);
  };

  const getEmploymentType = (type?: string) => {
    const typeMap: { [key: string]: string } = {
      'full_time': 'FULL_TIME',
      'part_time': 'PART_TIME',
      'contract': 'CONTRACT',
      'internship': 'INTERN'
    };
    return type ? typeMap[type] || 'FULL_TIME' : 'FULL_TIME';
  };

  // عنوان محسن للوظيفة
  const pageTitle = jobTitle 
    ? `${jobTitle} - ${location} | وظائف بُعد HR` 
    : title;

  // وصف محسن للوظيفة
  const pageDescription = jobTitle
    ? `انضم إلى فريق بُعد HR كـ ${jobTitle} في ${location}. ${department ? `قسم ${department}` : ''} ${jobType ? `- ${jobType}` : ''}`
    : description;

  const jobStructuredData = getJobStructuredData();

  return (
    <Helmet>
      {/* عناوين أساسية */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph للشبكات الاجتماعية */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
      <meta property="og:image" content="https://boudhr.sa/careers-og-image.jpg" />
      <meta property="og:site_name" content="بُعد HR" />
      <meta property="og:locale" content="ar_SA" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content="https://boudhr.sa/careers-twitter-image.jpg" />
      
      {/* LinkedIn */}
      <meta property="linkedin:title" content={pageTitle} />
      <meta property="linkedin:description" content={pageDescription} />
      
      {/* تحسينات SEO إضافية */}
      <meta name="author" content="بُعد HR" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      
      {/* hreflang للغات */}
      <link rel="alternate" hrefLang="ar" href={typeof window !== 'undefined' ? window.location.href : ''} />
      <link rel="alternate" hrefLang="en" href={typeof window !== 'undefined' ? window.location.href.replace('/careers', '/en/careers') : ''} />
      
      {/* Structured Data للوظائف */}
      {jobStructuredData && (
        <script type="application/ld+json">
          {jobStructuredData}
        </script>
      )}
      
      {/* Structured Data للشركة */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'بُعد HR',
          url: 'https://boudhr.sa',
          logo: 'https://boudhr.sa/logo.png',
          description: 'منصة متطورة لإدارة الموارد البشرية في المملكة العربية السعودية',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'SA',
            addressLocality: 'الرياض'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            email: 'careers@boudhr.sa'
          },
          sameAs: [
            'https://linkedin.com/company/boud-hr',
            'https://twitter.com/BoudHR_SA'
          ]
        })}
      </script>
      
      {/* تحسينات أداء */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Preconnect للخطوط والموارد الخارجية */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Helmet>
  );
};