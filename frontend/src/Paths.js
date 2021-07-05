export const paths = {
    Login: "/login",
    Register: "/register",
    ForgotPassword: "/forgot-password",
    PasswordReset: "/password-reset/:uidb64/:token",
};

export const makePaths = {
  PasswordReset: (uidb64, token) => {
    return `/password-reset/${uidb64}/${token}`;
  }
};