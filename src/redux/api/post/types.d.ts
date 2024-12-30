namespace POST {
  type PostGetAllResponse = Post[];
  type PostGetAllRequest = void;

  type PostGetOtherResponse = Post[];
  type PostGetOtherRequest = number;

  type PostGetMyResponse = postGetMy;
  type PostGetMyRequest = void;

  type PostCreateResponse = {
    id: number;
    userId: number;
    caption: string;
    mediaUrl: string;
    mediaType: string;
    createdAt: string;
    updatedAt: string;
  };
  type PostCreateRequest = {
    caption: string;
    mediaUrl: string;
    mediaType: string;
    file?: string[];
  };
  type DeleteTodoResponse = {
    message: string;
  };
  type DeleteTodoRequest = number;
}
