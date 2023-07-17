import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandService from "./brandServices";

const initialState = {
  brands: [],
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const getBrands = createAsyncThunk(
  "brand/get-brands",
  async (thunkAPI) => {
    try {
      return await brandService.getBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const brandSlice = createSlice({
  name: "brands",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = action.payload;
        state.message = "success";
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });
  },
});
export default brandSlice.reducer;
