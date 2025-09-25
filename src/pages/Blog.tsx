import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogCard } from '@/components/blog/BlogCard';
import { blogPosts, blogCategories } from '@/data/blogPosts';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, BarChart3 } from 'lucide-react';
import { BackButton } from '@/components/BackButton';
import { BoudLogo } from '@/components/BoudLogo';
import { Breadcrumb } from '@/components/Breadcrumb';
import buodLogo from '@/assets/buod-logo-white.png';

export const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden" dir="rtl">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/20 via-transparent to-[#008C6A]/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#008C6A" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>
      
      {/* Professional Interactive Header */}
      <header className="relative z-10 bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-xl border-b border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/20">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] opacity-80"></div>
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-24">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="hover:scale-105 transition-all duration-300">
                <img 
                  src={buodLogo} 
                  alt="Buod HR" 
                  className="h-48 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105 cursor-pointer" 
                />
              </Link>
            </div>

            {/* Center Section - Title & Icon */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <BookOpen className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  مدونة بُعد
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  مقالات احترافية ومتخصصة
                </p>
              </div>
            </div>

            {/* Right Section - Professional Controls Panel */}
            <div className="flex flex-col items-end space-y-4">
              {/* Status Panel */}
              <div className="bg-gradient-to-r from-black/40 via-gray-900/60 to-black/40 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 shadow-xl shadow-[#008C6A]/10 p-4 min-w-[200px]">
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    حالة النظام
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-xs text-green-300 font-semibold">
                      متاح
                    </span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#008C6A]/30 to-transparent mb-3"></div>
                
                {/* Quick Stats */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    المقالات المتاحة
                  </span>
                  <span className="text-sm text-[#008C6A] font-bold">
                    {filteredPosts.length}
                  </span>
                </div>
              </div>
              
              {/* Quick Stats Mini Panel */}
              <div className="bg-gradient-to-r from-black/20 to-gray-900/30 backdrop-blur-lg rounded-xl border border-[#008C6A]/20 px-3 py-2 shadow-lg">
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">{filteredPosts.length} مقال</span>
                  </div>
                  <div className="w-px h-3 bg-[#008C6A]/30"></div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">محدّث</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#008C6A] to-transparent"></div>
        </div>
      </header>

      <main className="relative z-10 w-full mx-auto px-4 py-8">
        {/* Breadcrumb Navigation - Far Right */}
        <div className="flex justify-end mb-6 mr-0">
          <div className="ml-auto">
            <Breadcrumb 
              items={[
                { label: 'الرئيسية', path: '/' },
                { label: 'مدونة بُعد', path: '/blog' }
              ]}
            />
          </div>
        </div>
        
        {/* Floating Elements for Professional Look */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-[#008C6A]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 left-16 w-32 h-32 bg-[#008C6A]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-[#008C6A]/15 rounded-full blur-lg animate-pulse delay-500"></div>
        
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12 relative">
          {/* Floating background elements */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-[#008C6A]/30 to-transparent blur-sm"></div>
          
          <div className="relative inline-flex items-center justify-center w-40 h-40 rounded-full mb-8 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <img 
              src="/boud-logo-white.png" 
              alt="شعار بُعد" 
              className="h-36 w-36 object-contain transition-all duration-300 group-hover:brightness-110 z-10 relative drop-shadow-2xl" 
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <h2 className="text-5xl font-bold mb-8 text-white bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent leading-tight">
            مدونة بُعد للموارد البشرية
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl">
              مدونة تعليمية احترافية متخصصة في الموارد البشرية، نظام العمل السعودي، التطوير التنظيمي والذكاء الاصطناعي في إدارة الموارد
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
            {/* Professional Search Bar */}
            <div className="relative w-full max-w-2xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#008C6A] h-5 w-5 z-10" />
                <Input
                  placeholder="ابحث في المقالات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-12 pl-6 h-14 bg-gradient-to-r from-gray-900/80 to-black/60 backdrop-blur-xl border border-[#008C6A]/30 rounded-2xl text-white placeholder-gray-400 focus:border-[#008C6A]/70 focus:ring-2 focus:ring-[#008C6A]/30 transition-all duration-300 shadow-xl hover:shadow-[#008C6A]/20"
                />
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => {setSearchTerm(''); setSelectedCategory(null);}}
                className="bg-gradient-to-r from-gray-900/50 to-black/30 border border-[#008C6A]/30 text-white hover:bg-gradient-to-r hover:from-[#008C6A]/20 hover:to-[#00694F]/20 hover:border-[#008C6A]/70 transition-all duration-300 shadow-lg hover:shadow-[#008C6A]/25 px-6 h-12"
              >
                <Search className="w-4 h-4 mr-2" />
                مسح البحث
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className={`cursor-pointer px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                selectedCategory === null 
                  ? 'bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white border-[#008C6A] shadow-lg hover:shadow-[#008C6A]/25' 
                  : 'bg-gradient-to-r from-gray-900/50 to-black/30 border border-[#008C6A]/30 text-white hover:bg-gradient-to-r hover:from-[#008C6A]/20 hover:to-[#00694F]/20 hover:border-[#008C6A]/70'
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              جميع المقالات
            </Badge>
            {blogCategories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.name ? "default" : "outline"}
                className={`cursor-pointer px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category.name 
                    ? 'bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white border-[#008C6A] shadow-lg hover:shadow-[#008C6A]/25' 
                    : 'bg-gradient-to-r from-gray-900/50 to-black/30 border border-[#008C6A]/30 text-white hover:bg-gradient-to-r hover:from-[#008C6A]/20 hover:to-[#00694F]/20 hover:border-[#008C6A]/70'
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="relative">
          {filteredPosts.length > 0 ? (
            <>
              <div className="text-center mb-12 relative">
                <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-4">
                  {selectedCategory ? `مقالات ${selectedCategory}` : 'أحدث المقالات'}
                </h2>
                <p className="text-gray-300 text-lg">
                  عدد المقالات: <span className="text-[#008C6A] font-bold">{filteredPosts.length}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="group relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/70 backdrop-blur-xl rounded-3xl border border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/10 hover:shadow-[#008C6A]/25 transition-all duration-500 hover:scale-105 hover:border-[#008C6A]/60">
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A]/0 via-[#008C6A]/10 to-[#008C6A]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 relative">
              <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full mb-8 transition-all duration-300">
                <BookOpen className="w-16 h-16 text-[#008C6A] animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#008C6A]/10 to-transparent"></div>
              </div>
              <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-4">
                لا توجد مقالات
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl max-w-md mx-auto">
                لم نجد أي مقالات تطابق بحثك. جرب كلمات بحث أخرى أو اختر تصنيفاً مختلفاً.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog;