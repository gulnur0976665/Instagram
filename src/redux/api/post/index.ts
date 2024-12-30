import { api as index } from "..";

export const api = index.injectEndpoints({
  endpoints: (build) => ({
    postGetAll: build.query<POST.PostGetAllResponse, POST.PostGetAllRequest>({
      query: () => ({
        url: `/post/get-all`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    postGetMy: build.query<POST.PostGetMyResponse, POST.PostGetMyRequest>({
      query: () => ({
        url: `/post/get-my`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    postGetOther: build.query<
      POST.PostGetOtherResponse,
      POST.PostGetOtherRequest
    >({
      query: (id) => ({
        url: `/post/get-other/${id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    postCreate: build.mutation<POST.PostCreateResponse, POST.PostCreateRequest>(
      {
        query: (data) => ({
          url: `/post/create`,
          method: "POST",
          body: data,
        }),
      }
    ),
    postDelete: build.mutation<POST.DeleteTodoResponse, POST.DeleteTodoRequest>(
      {
        query: (id) => ({
          url: `/post/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["post"],
      }
    ),
  }),
});

export const {
  usePostGetAllQuery,
  usePostGetMyQuery,
  usePostGetOtherQuery,
  usePostCreateMutation,
  usePostDeleteMutation,
} = api;
