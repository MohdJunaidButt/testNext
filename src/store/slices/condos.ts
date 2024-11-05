import { fetchFilteredProperties } from '@/services/api';
import { PropertyType } from '@/types/common/THomePage';
import ObjectToPrams from '@/utils/ObjectToParams';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCondosAsync = createAsyncThunk(
  'condos/fetchCondos',
  async () => {
    try {
      const response = await fetchFilteredProperties(
        ObjectToPrams({
          type: PropertyType.CONDO,
        })
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);

interface CondosState {
  condos: [];
  filteredCondos: any;
  loading: boolean;
  error: string | null;
}

const initialState: CondosState = {
  condos: [],
  filteredCondos: [],
  loading: false,
  error: null,
};

const condos = createSlice({
  name: 'condos',
  initialState,
  reducers: {
    filterCondos: (state, action) => {
      const saleStatus = action.payload;
      state.filteredCondos = state.condos.filter(
        (condo: any) => condo.sale_status === saleStatus
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCondosAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCondosAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.condos = action.payload;
      })
      .addCase(fetchCondosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      });
  },
});
export const { filterCondos } = condos.actions;
export default condos.reducer;
