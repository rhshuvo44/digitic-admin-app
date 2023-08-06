import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import couponService from "./couponServices";

const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const getAllCoupon = createAsyncThunk(
  "coupon/get-coupons",
  async (thunkAPI) => {
    try {
      return await couponService.getCoupons();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createCoupons = createAsyncThunk(
  "coupon/create-coupons",
  async (couponData, thunkAPI) => {
    try {
      return await couponService.createCoupon(couponData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getACoupon = createAsyncThunk(
  "coupon/get-coupon",
  async (id, thunkAPI) => {
    try {
      return await couponService.getCoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateCoupons = createAsyncThunk(
  "coupon/update-coupons",
  async (couponData, thunkAPI) => {
    try {
      return await couponService.updateCoupon(couponData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteCoupons = createAsyncThunk(
  "coupon/delete-coupons",
  async (id, thunkAPI) => {
    try {
      return await couponService.deleteCoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("reset-all");

export const couponSlice = createSlice({
  name: "coupons",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCoupon.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.coupons = action.payload;
        state.message = "success";
      })
      .addCase(getAllCoupon.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(createCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupons.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdCoupons = action.payload;
        state.message = "success";
      })
      .addCase(createCoupons.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACoupon.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.couponName = action.payload;
        state.message = "success";
      })
      .addCase(getACoupon.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(updateCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCoupons.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedCoupons = action.payload;
        state.message = "success";
      })
      .addCase(updateCoupons.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(deleteCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCoupons.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedCoupons = action.payload;
        state.message = "success";
      })
      .addCase(deleteCoupons.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState);
  },
});
export default couponSlice.reducer;
