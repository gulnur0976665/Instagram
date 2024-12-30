namespace LIKE {
  type GetLikeResponse = {
    postId: number;
    likesCount: number;
    isLike: boolean;
    likedUsers: [
      {
        id: string;
        username: string;
        photo: string;
        likedAt: string;
      }
    ];
  };
  type GetLikeRequest = number;

  type LikeResponse = {
    userId: number;
    postId: number;
    createdAt: string;
    updatedAt: string;
  };

  type LikeRequest = {
    postId: number;
  };

  type DeleteLikeResponse = {
    postId: number;
    userId: number;
  };
  type DeleteLikeRequest = {
    postId: number;
  };
}
