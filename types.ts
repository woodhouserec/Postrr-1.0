export interface Subreddit {
  name: string;
  icon?: string;
}

export interface Post {
  id: string;
  subreddit: Subreddit;
  author?: string;
  timestamp: string;
  title: string;
  content?: string;
  image?: string;
  type: 'text' | 'image' | 'gallery';
  upvotes: number;
  comments: number;
  isJoined?: boolean;
}

export interface HeroCardData {
  id: string;
  title: string;
  subtitle: string;
  subreddit: string;
  image: string;
}
