import url from "../../config/index";
import { createSlice, PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNotifictions = createAsyncThunk(
    "hotCondos/fetchHotCondos",
    async (status: string) => {
      try {
        const response = await url.get('/users')
        return response;
      } catch (error) {
        throw error;
      }
    }
  );
  
//   const HotCondos = createSlice({
//     name: "hotCondos",
//     initialState: fetchNotifictions,
//     reducers: {},
//     extraReducers: (builder) => {
//       builder
//         .addCase(fetchNotifictions.pending, (state) => {
//           state.loading = true;
//           state.error = null;
//         })
//         .addCase(fetchNotifictions.fulfilled, (state, action) => {
//           state.loading = false;
//           state.hotCondos = action.payload;
//         })
//         .addCase(fetchNotifictions.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.error.message || "An error occurred.";
//         });
//     },
//   });
  
//   export default HotCondos.reducer;