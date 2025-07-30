export interface BlogPost {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  readTime: number;
  slug: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  color: string;
}