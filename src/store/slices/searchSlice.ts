// searchSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type SearchState = {
    suggestions: string[];
    properties: string[];
    loading: boolean;
  };
  

// Replace these with your actual API calls
const fetchSuggestions = async (query: string) => {
  // Dummy API call
  return ["Troy", "Tropical", "Trooper"];
};

const fetchProperties = async (query: string) => {
  // Dummy API call
  return ["Property 1", "Property 2", "Property 3"];
};

export const getSuggestions = createAsyncThunk(
  "search/getSuggestions",
  async (query: string) => {
    return await fetchSuggestions(query);
  }
);

export const getProperties = createAsyncThunk(
  "search/getProperties",
  async (query: string) => {
    return await fetchProperties(query);
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    suggestions: [],
    properties: [],
    loading: false,
  } as SearchState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.properties = action.payload;
      });
  },
});

export default searchSlice.reducer;
