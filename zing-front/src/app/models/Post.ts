import {Comment} from './Comment';

export interface Post {
  id: number;
  body: string;
  image: string;
  created: string;
  // usersLiked: string[];
  // comments: Comment [];
  user: string;
}
