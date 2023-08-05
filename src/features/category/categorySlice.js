import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "./categoryServices";

const initialState = {
  categorys: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const getCategorys = createAsyncThunk(
  "category/get-categorys",
  async (thunkAPI) => {
    try {
      return await categoryService.getCategorys();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createCategory = createAsyncThunk(
  "category/create-category",
  async (category, thunkAPI) => {
    try {
      return await categoryService.createCategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("reset-all");
export const categorySlice = createSlice({
  name: "categorys",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategorys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategorys.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.categorys = action.payload;
        state.message = "success";
      })
      .addCase(getCategorys.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdCategory = action.payload;
        state.message = "success";
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      }).addCase(resetState, () => initialState);;
  },
});
export default categorySlice.reducer;
