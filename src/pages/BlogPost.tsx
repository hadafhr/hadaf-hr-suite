import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, Clock, Share2, ChevronLeft, BookOpen } from 'lucide-react';
import { BlogCard } from '@/components/blog/BlogCard';
import { SafeBlogContent } from '@/components/blog/SafeBlogContent';
import { BackButton } from '@/components/BackButton';
import { BoudLogo } from '@/components/BoudLogo';

export const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">المقال غير موجود</h1>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowRight className="ml-2 w-4 h-4" />
              العودة إلى المدونة
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // يمكن إضافة toast هنا
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button and Logo */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <BackButton />
            <BoudLogo size="header" showText={true} />
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            <ChevronLeft className="w-4 h-4" />
            <Link to="/blog" className="hover:text-primary transition-colors">مدونة بُعد</Link>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-foreground font-medium">{post.title}</span>
          </nav>
          
          {/* Article Category Badge */}
          <div className="flex items-center gap-3">
            <BoudLogo size="sm" />
            <Badge variant="default" className="px-4 py-2">
              {post.category}
            </Badge>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('ar-SA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Clock className="w-4 h-4" />
                {post.readTime} دقائق قراءة
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <BookOpen className="w-4 h-4" />
                مقال تعليمي
              </div>
            </div>

            {/* Article Title with Logo */}
            <div className="flex items-start gap-4 mb-8">
              <BoudLogo size="lg" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {post.title}
              </h1>
            </div>

            {/* Article Summary */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border border-border/50 mb-12">
              <p className="text-lg text-foreground leading-relaxed font-medium">
                {post.summary}
              </p>
            </div>

            {/* Article Image */}
            <div className="aspect-video mb-12 rounded-xl overflow-hidden shadow-lg border border-border/20">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Article Content - XSS Protected */}
            <div className="bg-background border border-border/20 rounded-xl p-8 mb-12 shadow-sm">
              <SafeBlogContent 
                content={post.content} 
                className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-h1:flex prose-h1:items-center prose-h1:gap-3 prose-h2:border-b prose-h2:border-border/30 prose-h2:pb-2 prose-h3:text-primary prose-strong:text-primary prose-a:text-primary hover:prose-a:text-primary/80"
              />
            </div>

            {/* Article Footer */}
            <div className="bg-gradient-to-r from-muted/50 to-background border border-border/30 rounded-xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <BoudLogo size="md" />
                  <div>
                    <h3 className="font-semibold text-foreground">مدونة بُعد</h3>
                    <p className="text-muted-foreground text-sm">محتوى تعليمي متخصص في الموارد البشرية</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="w-4 h-4 ml-2" />
                    مشاركة المقال
                  </Button>
                  <Link to="/blog">
                    <Button>
                      <ArrowRight className="ml-2 w-4 h-4" />
                      المزيد من المقالات
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <BoudLogo size="md" />
                  <h2 className="text-3xl font-bold text-foreground">
                    مقالات ذات صلة
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  استكشف المزيد من المحتوى المتخصص في {post.category}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;