import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSoldCondos } from "@/services/api"; // Update this import with the correct API endpoint

export const fetchSoldCondosAsync = createAsyncThunk(
  "soldCondos/fetchSoldCondos",
  async ({ page, limit }: { page: number; limit: number }) => {
    try {
      const response = await fetchSoldCondos(page, limit);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

interface SoldCondosState {
  soldCondos: any;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
}

const initialState: SoldCondosState = {
  soldCondos: [],
  loading: false,
  error: null,
  hasMore: true,
};

const soldCondos = createSlice({
  name: "soldCondos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSoldCondosAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSoldCondosAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.soldCondos = action.payload;
      })
      .addCase(fetchSoldCondosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default soldCondos.reducer;
