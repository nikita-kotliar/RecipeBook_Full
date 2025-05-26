// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "./initialState";
import {
  getUserInfo,
  logIn,
  logOut,
  refreshToken,
  signUp,
  updateUserProfile,
  uploadUserPhoto,
} from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    logOutReducer: () => {
      return INITIAL_STATE;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setNewUser: (state, action) => {
      state.isNewUser = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCredentialsGoogle: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.isLoggedIn = true;
      toast.success(`Welcome, ${user.name || user.email}!`);
    },
    
  },
  extraReducers: (builder) => {
    builder
      ////////////////////////////////////////////////////
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
        state.token = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isNewUser = true;
        state.successMessage = "Successfully registered";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })

      ////////////////////////////////////////////////////
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.successMessage = "Successfully logged in";
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })

      ////////////////////////////////////////////////////
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(logOut.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(logOut.rejected, () => {
        return INITIAL_STATE;
      })

      ////////////////////////////////////////////////////
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = "Something went wrong, try again later";
      })

      ////////////////////////////////////////////////////
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = "Profile updated";
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = "Something went wrong, try again later";
      })

      ////////////////////////////////////////////////////
      .addCase(uploadUserPhoto.pending, (state) => {
        state.isLoadingPhoto = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(uploadUserPhoto.fulfilled, (state, action) => {
        state.isLoadingPhoto = false;
        state.successMessage = "Photo updated";
        state.user.photo = action.payload;
      })
      .addCase(uploadUserPhoto.rejected, (state) => {
        state.isLoadingPhoto = false;
        state.errorMessage = "Something went wrong, try again later";
      })

      ////////////////////////////////////////////////////
      .addCase(refreshToken.pending, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
      })
      .addCase(refreshToken.rejected, () => INITIAL_STATE);
  },
});

export const authReducer = authSlice.reducer;
export const { setToken, logOutReducer, setLoggedIn, setNewUser, setUser } =
  authSlice.actions;
