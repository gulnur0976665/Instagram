namespace AUTH {
  type GetResponse = User;
  type GetRequest = void;

  type PostLoginResponse = {
    accessToken: string;
    accessTokenExpiration: string;
    refreshToken: string;
  };
  type PostLoginRequest = {
    email: string;
    password: string;
  };

  type PostRegisterResponse = {
    message: string;
    accessToken: string;
    accessTokenExpiration: string;
    refreshToken: string;
  };
  type PostRegisterRequest = {
    email: string;
    username: string;
    photo: string;
    password: string;
  };

  type PostLogoutResponse = {
    message: string;
  };
  type PostLogoutRequest = void;

  type PatchRefreshTokenResponse = {
    data(data: any): string;
    accessToken: string;
    accessTokenExpiration: string;
    refreshToken: string;
  };
  type PatchRefreshTokenRequest = {
    refreshToken: string;
  };

  type PostForgotResponse = {
    message: string;
  };
  type PostForgotRequest = {
    email: string;
    frontEndUrl: string;
  };

  type PatchResetPasswordResponse = {
    message: string;
  };
  type PatchResetPasswordRequest = {
    token: string;
    newPassword: string;
  };

  type updateProfileResponse = {
    message: string;
  };
  type updateProfileRequest = {
    file?: string[];
    username: string;
    photo: string;
  };
}
