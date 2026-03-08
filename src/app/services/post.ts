import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  imageUrl?: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  comments_list: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsSubject = new BehaviorSubject<Post[]>([
    {
      id: '1',
      userId: '1',
      userName: 'IMANE CHENNOUFI',
      userAvatar: 'https://api.dicebear.com/7.x/personas/svg?seed=IMANE',
      content: 'Excitée de partager mes derniers projets en UX/UI Design! 🎨✨',
      timestamp: new Date(Date.now() - 3600000),
      likes: 45,
      comments: 8,
      shares: 3,
      liked: false,
      comments_list: [
        {
          id: 'c1',
          userId: '2',
          userName: 'Jane Smith',
          userAvatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Jane',
          content: 'Magnifique travail! 👏',
          timestamp: new Date(Date.now() - 1800000)
        }
      ]
    },
    {
      id: '2',
      userId: '2',
      userName: 'Jane Smith',
      userAvatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Jane',
      content: 'Searching for amazing designers and developers in my team 🚀',
      timestamp: new Date(Date.now() - 7200000),
      likes: 32,
      comments: 5,
      shares: 2,
      liked: false,
      comments_list: []
    }
  ]);

  public posts$ = this.postsSubject.asObservable();

  constructor() {}

  getPosts(): Observable<Post[]> {
    return this.posts$;
  }

  addPost(content: string, userId: string, userName: string, userAvatar: string, imageUrl?: string): Observable<Post> {
    return new Observable(observer => {
      setTimeout(() => {
        const newPost: Post = {
          id: Date.now().toString(),
          userId,
          userName,
          userAvatar,
          content,
          imageUrl,
          timestamp: new Date(),
          likes: 0,
          comments: 0,
          shares: 0,
          liked: false,
          comments_list: []
        };
        const posts = this.postsSubject.value;
        posts.unshift(newPost);
        this.postsSubject.next([...posts]);
        observer.next(newPost);
        observer.complete();
      }, 300);
    });
  }

  likePost(postId: string): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        const posts = this.postsSubject.value;
        const post = posts.find(p => p.id === postId);
        if (post) {
          post.liked = !post.liked;
          post.likes += post.liked ? 1 : -1;
          this.postsSubject.next([...posts]);
        }
        observer.next();
        observer.complete();
      }, 200);
    });
  }

  addComment(postId: string, userId: string, userName: string, userAvatar: string, content: string): Observable<Comment> {
    return new Observable(observer => {
      setTimeout(() => {
        const posts = this.postsSubject.value;
        const post = posts.find(p => p.id === postId);
        if (post) {
          const comment: Comment = {
            id: Date.now().toString(),
            userId,
            userName,
            userAvatar,
            content,
            timestamp: new Date()
          };
          post.comments_list.push(comment);
          post.comments += 1;
          this.postsSubject.next([...posts]);
          observer.next(comment);
        }
        observer.complete();
      }, 300);
    });
  }

  sharePost(postId: string): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        const posts = this.postsSubject.value;
        const post = posts.find(p => p.id === postId);
        if (post) {
          post.shares += 1;
          this.postsSubject.next([...posts]);
        }
        observer.next();
        observer.complete();
      }, 200);
    });
  }
}
