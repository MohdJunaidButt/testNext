import {
  addFavorite,
  fetchUserFavorites,
  removeFavorite,
} from '@/services/api';
import { PropertyData } from '@/types/common/THomePage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface FavoritesState {
  favorites: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
}

export const fetchUserFavoritesAsync = createAsyncThunk(
  'favorites/fetchUserFavorites',
  async () => {
    try {
      const favoritesData = await fetchUserFavorites();
      return favoritesData.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addToFavourites = createAsyncThunk(
  'favorites/addToFavourites',
  async (propertyId: number) => {
    try {
      const favoritesData = await addFavorite(propertyId);
      return favoritesData;
    } catch (error) {
      throw error;
    }
  }
);
export const removeFromFavourites = createAsyncThunk(
  'favorites/removeFromFavourites',
  async (propertyId: number) => {
    try {
      await removeFavorite(propertyId);
      return { property: propertyId };
    } catch (error) {
      throw error;
    }
  }
);

const favorites = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    status: 'idle',
    error: null,
  } as FavoritesState,
  reducers: {
    updateFavorites: (state, action) => {
      let isPropertyExists =
        state.favorites.filter(
          (el) => el.property_id === action.payload.property.id
        ).length > 0;
      state.favorites = isPropertyExists
        ? state.favorites.filter(
            (el) => el.property_id !== action.payload.property.id
          )
        : state.favorites.concat(action.payload.property);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFavoritesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserFavoritesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favorites = action.payload;
      })
      .addCase(fetchUserFavoritesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder
      .addCase(addToFavourites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToFavourites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favorites = state.favorites.concat(action.payload.property);
      })
      .addCase(addToFavourites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder
      .addCase(removeFromFavourites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromFavourites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favorites = state.favorites.filter(
          (el) => el.property !== action.payload.property
        );
      })
      .addCase(removeFromFavourites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const { updateFavorites } = favorites.actions;
export default favorites.reducer;
