import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<AUTH.PostLoginResponse, AUTH.PostLoginRequest>({
      query: (data) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: data,
      }),
    }),
    signUp: build.mutation<AUTH.PostRegisterResponse, AUTH.PostRegisterRequest>(
      {
        query: (data) => ({
          url: "/auth/sign-up",
          method: "POST",
          body: data,
        }),
      }
    ),
    getMe: build.query<AUTH.GetResponse, AUTH.GetRequest>({
      query: () => ({
        url: "/auth/user",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    logout: build.mutation<AUTH.PostLogoutResponse, AUTH.PostLogoutRequest>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
    refreshToken: build.mutation<
      AUTH.PatchRefreshTokenResponse,
      AUTH.PatchRefreshTokenRequest
    >({
      query: (refreshTokenData) => ({
        url: "/auth/refresh",
        method: "PATCH",
        body: refreshTokenData,
      }),
      invalidatesTags: ["auth"],
    }),
    postForgot: build.mutation<AUTH.PostForgotResponse, AUTH.PostForgotRequest>(
      {
        query: (forgotData) => ({
          url: `/auth/forgot`,
          method: "POST",
          body: forgotData,
        }),
        invalidatesTags: ["auth"],
      }
    ),
    resetPassford: build.mutation<
      AUTH.PatchResetPasswordResponse,
      AUTH.PatchResetPasswordRequest
    >({
      query: (resetPasswordData) => ({
        url: `/auth/reset-password`,
        method: "PATCH",
        body: resetPasswordData,
      }),
      invalidatesTags: ["auth"],
    }),
    updateProfile: build.mutation<
      AUTH.updateProfileResponse,
      AUTH.updateProfileRequest
    >({
      query: (body) => ({
        url: `/auth/update-profile`,
        method: "PATCH",
        body, 
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetMeQuery,
  useLogoutMutation,
  useRefreshTokenMutation,
  usePostForgotMutation,
  useResetPassfordMutation,
  useUpdateProfileMutation,
} = api;
