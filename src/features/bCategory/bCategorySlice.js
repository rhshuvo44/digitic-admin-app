import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
export const getABlogCategory = createAsyncThunk(
  "bCategory/get-bCategory",
  async (id,thunkAPI) => {
    try {
      return await bCategoryService.getBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createBlogCategory = createAsyncThunk(
  "bCategory/create-bCategorys",
  async (category, thunkAPI) => {
    try {
      return await bCategoryService.createBlogCategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteBlogCategory = createAsyncThunk(
  "bCategory/delete-bCategorys",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.deleteBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateBlogCategory = createAsyncThunk(
  "bCategory/update-bCategorys",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.updateBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("reset-all");
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
      })
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdCategory = action.payload;
        state.message = "success";
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getABlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlogCategory.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.blogCategoryName = action.payload;
        state.message = "success";
      })
      .addCase(getABlogCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(updateBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogCategory.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedBlogCategory = action.payload;
        state.message = "success";
      })
      .addCase(updateBlogCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(deleteBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogCategory.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedBlogCategory = action.payload;
        state.message = "success";
      })
      .addCase(deleteBlogCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState);
  },
});
export default bCategorySlice.reducer;
