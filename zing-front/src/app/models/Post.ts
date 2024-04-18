import {Comment} from './Comment';

export interface Post {
  id: number;
  title: string;
  image: File;
  likes: number;
  // usersLiked: string[];
  // comments: Comment [];
  author: string;
}
