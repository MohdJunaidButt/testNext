import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchComingSoonCondos } from "@/services/api";

interface FetchArgs {
  page: number;
  limit: number;
}

interface ComingSoonCondosState {
  comingSoonCondos: any;
  loading: boolean;
  error: string | null;
}

const initialState: ComingSoonCondosState = {
  comingSoonCondos: [],
  loading: false,
  error: null,
};

export const fetchComingSoonCondosAsync = createAsyncThunk(
  "comingSoonCondos/fetchComingSoonCondos",
  async (args: FetchArgs, thunkAPI) => {
    try {
      const response = await fetchComingSoonCondos(args.page, args.limit);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const ComingSoonCondos = createSlice({
  name: "comingSoonCondos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComingSoonCondosAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComingSoonCondosAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.comingSoonCondos = action.payload;
        // state.comingSoonCondos = state.comingSoonCondos.concat(action.payload);
      })
      .addCase(fetchComingSoonCondosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default ComingSoonCondos.reducer;
