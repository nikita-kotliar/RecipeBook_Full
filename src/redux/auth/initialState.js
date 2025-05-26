const tokenFromStorage = localStorage.getItem("token");

export const INITIAL_STATE = {
  user: {
    name: "",
    about: "",
    password: null,
    email: null,
    photo: null,
  },
  isLoading: null,
  isLoadingPhoto: null,
  token: tokenFromStorage ? JSON.parse(tokenFromStorage) : null,
  isLoggedIn: !!tokenFromStorage,
  isNewUser: false,
  errorMessage: null,
  successMessage: null,
};
