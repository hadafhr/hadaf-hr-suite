import React from 'react';
import { sanitizeHtml } from '@/utils/sanitizeHtml';

interface SafeBlogContentProps {
  content: string;
  className?: string;
}

/**
 * Safe component for rendering blog content with XSS protection
 */
export const SafeBlogContent: React.FC<SafeBlogContentProps> = ({ 
  content, 
  className = "prose prose-lg max-w-none" 
}) => {
  // Sanitize the HTML content to prevent XSS attacks
  const sanitizedContent = sanitizeHtml(content);

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ 
        __html: sanitizedContent 
      }} 
    />
  );
};