import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
const userDefaultState = {
  _id: null,
  firstname: null,
  lastname: null,
  email: null,
  mobile: null,
  token: null,
};
const initialState = {
  user: userDefaultState,
  isError: false,
  isLoading: false,
  isSuccess: false,
  massage: "",
};
export const login = createAsyncThunk(
  "auth/admin-login",
  async (user, thankAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thankAPI.rejectWithValue(error);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
