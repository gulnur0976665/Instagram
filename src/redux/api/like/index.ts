import { api as index } from "..";

export const api = index.injectEndpoints({
  endpoints: (build) => ({
    getLike: build.query<LIKE.GetLikeResponse, LIKE.GetLikeRequest>({
      query: (postId) => ({
        url: `/post/get-like/${postId}`,
        method: "GET",
      }),
      providesTags: ["like"],
    }),
    postLike: build.mutation<LIKE.LikeResponse, LIKE.LikeRequest>({
      query: (data) => ({
        url: `/post/like`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["like"],
    }),
    postUnLike: build.mutation<LIKE.DeleteLikeResponse, LIKE.DeleteLikeRequest>(
      {
        query: (postId) => ({
          url: `/post/unlike`,
          method: "DELETE",
          body: postId,
        }),
        invalidatesTags: ["like"],
      }
    ),
  }),
});
export const { useGetLikeQuery, usePostLikeMutation, usePostUnLikeMutation } =
  api;
