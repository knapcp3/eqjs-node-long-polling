import { Comment } from './Comment.model';

export interface Talk {
  id: string;
  title: string;
  presenter: string,
  summary: string,
  comments: Comment[];
}

export interface TalkRB {
  title: string;
  presenter: string,
  summary: string,
}
