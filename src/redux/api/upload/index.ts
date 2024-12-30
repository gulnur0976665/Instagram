import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation<
      UPLOAD.postUploadeFileResponse,
      UPLOAD.postUploadeFileRequest
    >({
      query: (data) => ({
        url: `/upload/file`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),
  }),
});
export const { useUploadFileMutation } = api;
