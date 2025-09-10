import { Link } from 'react-router-dom';
import { BlogPost } from '@/types/blog';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Calendar } from 'lucide-react';
import { BoudLogo } from '@/components/BoudLogo';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card className="group h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="aspect-video overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">
            {post.category}
          </Badge>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Calendar className="w-3 h-3" />
            {new Date(post.date).toLocaleDateString('ar-SA')}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Clock className="w-3 h-3" />
            {post.readTime} دقائق
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <BoudLogo size="sm" />
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {post.summary}
        </p>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Link to={`/blog/${post.slug}`} className="w-full">
          <Button variant="outline" className="w-full">
            اقرأ المزيد
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};