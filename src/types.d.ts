interface User {
  profile: {
    id: string;
    username: string;
    role: string;
    email: string;
    isActive: string;
    photo: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface Post {
  id: number;
  userId: number;
  caption: string;
  mediaUrl: string;
  mediaType: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    username: string;
    role: string;
    email: string;
    isActive: boolean;
    photo: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface PostMy {
  id: number;
  userId: number;
  caption: string;
  mediaUrl: string;
  mediaType: string | string;
  createdAt: string;
  updatedAt: string;
}
type postGetMy = Post[];
