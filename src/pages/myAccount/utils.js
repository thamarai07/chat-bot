export const activateUserSignIn = (credentials, providerLogin) => {
  window.localStorage.setItem(
    "tokenResponse",
    JSON.stringify(credentials._tokenResponse)
  );
  if (providerLogin && providerLogin.providerId) {
    window.localStorage.setItem("providerToken", JSON.stringify(credentials));
  }
};
