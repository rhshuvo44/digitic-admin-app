import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import colorService from "./colorServices";

const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const getColors = createAsyncThunk(
  "color/get-colors",
  async (thunkAPI) => {
    try {
      return await colorService.getColors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createColor = createAsyncThunk(
  "color/create-colors",
  async (colorData, thunkAPI) => {
    try {
      return await colorService.createColor(colorData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAColor = createAsyncThunk(
  "color/get-color",
  async (id, thunkAPI) => {
    try {
      return await colorService.getColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateColor = createAsyncThunk(
  "color/update-colors",
  async (colorData, thunkAPI) => {
    try {
      return await colorService.updateColor(colorData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteColor = createAsyncThunk(
  "color/delete-color",
  async (id, thunkAPI) => {
    try {
      return await colorService.deleteColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("reset-all");
export const colorSlice = createSlice({
  name: "colors",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = action.payload;
        state.message = "success";
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(createColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdColor = action.payload;
        state.message = "success";
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getAColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAColor.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.colorName = action.payload;
        state.message = "success";
      })
      .addCase(getAColor.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(updateColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedColor = action.payload;
        state.message = "success";
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedColor = action.payload;
        state.message = "success";
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState);
  },
});
export default colorSlice.reducer;
