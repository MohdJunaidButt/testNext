import { fetchHotCondos } from "@/services/api";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface HotCondosState {
  hotCondos: any;
  loading: boolean;
  error: string | null;
}

const initialHotCondosState: HotCondosState = {
  hotCondos: [],
  loading: false,
  error: null,
};

export const fetchHotCondosAsync = createAsyncThunk(
  "hotCondos/fetchHotCondos",
  async (status: string) => {
    try {
      const response = await fetchHotCondos(status);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const HotCondos = createSlice({
  name: "hotCondos",
  initialState: initialHotCondosState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotCondosAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotCondosAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.hotCondos = action.payload;
      })
      .addCase(fetchHotCondosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default HotCondos.reducer;
