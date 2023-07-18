import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import enduirieService from "./enduirieService";

const initialState = {
  enduiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const getEnduiries = createAsyncThunk(
  "enduirie/get-enduiries",
  async (thunkAPI) => {
    try {
      return await enduirieService.getEnduiries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const enduirieSlice = createSlice({
  name: "enduiries",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnduiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnduiries.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.enduiries = action.payload;
        state.message = "success";
      })
      .addCase(getEnduiries.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });
  },
});
export default enduirieSlice.reducer;
