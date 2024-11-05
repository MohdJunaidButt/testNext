import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import url from '../../config/index';
export const GetAllProperties = async (props: any = '') => {
  try {
    let response: any =
      props == ''
        ? await url.get('/properties/data')
        : await url.get(`/properties/data?properties=[${props}]`);
    return response.data;
  } catch (e) {
    console.log(e, 'ERRORR');
    return e;
  }
};

export const GetAllPropertiesParams = async (queryParams: any = '') => {
  try {
    let response: any =
      queryParams == ''
        ? await url.get('/properties/data')
        : await url.get(`/properties/data?${queryParams}`);
    return response.data;
  } catch (e) {
    console.log(e, 'ERRORR');
    return e;
  }
};

export const getComparison = async (props: any = '') => {
  try {
    let response: any =
      props == ''
        ? await url.get('/properties/compare-properties')
        : await url.get(`/properties/compare-properties?properties=[${props}]`);
    return response.data;
  } catch (e) {}
};
const initialState = {
  SelectedProperties: [],
};
const PropertyForm = createSlice({
  name: 'SelectedProperties',
  initialState,
  reducers: {
    addProperty: (state: any, action: any) => {
      state.SelectedProperties = action.payload;
    },
    filterProperty: (state: any, action: any) => {
      state.SelectedProperties = state.SelectedProperties.filter(
        (item: any, index: number) => {
          return item.property_id !== action.payload;
        }
      );
    },
    removeProperty: (state: any) => {
      state.SelectedProperties = [];
    },
  },
});
export const { addProperty, filterProperty, removeProperty } =
  PropertyForm.actions;
export default PropertyForm.reducer;
