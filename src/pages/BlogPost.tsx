import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, Clock, Share2, ChevronLeft } from 'lucide-react';
import { BlogCard } from '@/components/blog/BlogCard';
import { SafeBlogContent } from '@/components/blog/SafeBlogContent';

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
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4 border-b border-border">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">الرئيسية</Link>
            <ChevronLeft className="w-4 h-4" />
            <Link to="/blog" className="hover:text-primary">مدونة بُعد</Link>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-foreground">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="secondary">{post.category}</Badge>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('ar-SA')}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Clock className="w-4 h-4" />
                {post.readTime} دقائق قراءة
              </div>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 ml-2" />
                مشاركة
              </Button>
            </div>

            {/* Article Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Article Summary */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {post.summary}
            </p>

            {/* Article Image */}
            <div className="aspect-video mb-12 rounded-lg overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content - XSS Protected */}
            <SafeBlogContent 
              content={post.content.replace(/\n/g, '<br />')} 
              className="prose prose-lg max-w-none text-foreground"
            />

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">شارك هذا المقال:</span>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="w-4 h-4 ml-2" />
                    مشاركة
                  </Button>
                </div>
                <Link to="/blog">
                  <Button variant="ghost">
                    <ArrowRight className="ml-2 w-4 h-4" />
                    العودة إلى المدونة
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                مقالات ذات صلة
              </h2>
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