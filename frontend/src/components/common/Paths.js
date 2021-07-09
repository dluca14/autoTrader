export const paths = {
    Home: "/",
    Login: "/login",
    Register: "/register",
    ForgotPassword: "/forgot-password",
    PasswordReset: "/password-reset/:uidb64/:token",
    Heatmap: "/heatmap",
    Portfolio: "/portfolio",
    Predictions: "/predictions",
    Sentiment: "/sentiment",
    Profile: "/profile"
};

export const makePaths = {
    PasswordReset: (uidb64, token) => {
        return `/password-reset/${uidb64}/${token}`;
    }
};