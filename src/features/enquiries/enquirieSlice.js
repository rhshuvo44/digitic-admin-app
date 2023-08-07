import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import enquirieService from "./enquirieService";

const initialState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const getEnquiries = createAsyncThunk(
  "enquirie/get-enquiries",
  async (thunkAPI) => {
    try {
      return await enquirieService.getEnquiries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAEnquirie = createAsyncThunk(
  "enquirie/get-enquirie",
  async (id, thunkAPI) => {
    try {
      return await enquirieService.getEnquirie(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteEnquiries = createAsyncThunk(
  "enduirie/delete-enqiries",
  async (id, thunkAPI) => {
    try {
      return await enquirieService.deleteEnquirie(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const enquirieSlice = createSlice({
  name: "enquiries",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
        state.message = "success";
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getAEnquirie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAEnquirie.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.enquirieName = action.payload;
        state.message = "success";
      })
      .addCase(getAEnquirie.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(deleteEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnquiries.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedEnquiries = action.payload;
        state.message = "success";
      })
      .addCase(deleteEnquiries.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });
  },
});
export default enquirieSlice.reducer;
