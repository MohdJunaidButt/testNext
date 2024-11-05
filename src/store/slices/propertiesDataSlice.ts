import { fetchPropertiesShortData } from '@/services/api';
import { FetchArgs } from '@/types/common/properties';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface PropertiesDataState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: PropertiesDataState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchPropertiesDataAsync = createAsyncThunk(
  'propertiesData/fetchPropertiesData',
  async (params: FetchArgs, thunkAPI) => {
    try {
      const response = await fetchPropertiesShortData(params);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const propertiesDataSlice = createSlice({
  name: 'propertiesData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertiesDataAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertiesDataAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPropertiesDataAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      });
  },
});

export default propertiesDataSlice.reducer;
