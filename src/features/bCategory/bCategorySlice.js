import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bCategoryService from "./bCategoryServices";

const initialState = {
  categorys: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const getBlogCategorys = createAsyncThunk(
  "bCategory/get-bCategorys",
  async (thunkAPI) => {
    try {
      return await bCategoryService.getBlogCategorys();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const bCategorySlice = createSlice({
  name: "bCategorys",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogCategorys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCategorys.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.bCategorys = action.payload;
        state.message = "success";
      })
      .addCase(getBlogCategorys.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });
  },
});
export default bCategorySlice.reducer;
