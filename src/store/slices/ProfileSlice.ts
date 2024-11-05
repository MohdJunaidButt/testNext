import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import url from '../../config/index';
import { AxiosError, AxiosResponse } from 'axios';

interface ProfileState {
  data: any;
  loading: boolean;
  error: any;
}

const initialState: ProfileState = {
  data: {},
  loading: false,
  error: null,
};

export const CreatProfile = async (payload: any) => {
  try {
    let response: any = await url.patch('/users/me', payload);
    return response;
  } catch (e) {
    console.log(e, 'ERRORR');
    return e;
  }
};

export const UpdateProfilePicture = async (payload: any) => {
  try {
    const data = new FormData();
    data.append('image', payload);
    let response: any = await url.patch('/users/image', data);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getProfieData = createAsyncThunk(
  'profileData/fetchProfileData',
  async () => {
    try {
      const response = await url.get('/users/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const profileUpdate = async (body: {
  receive_notifications_listings?: boolean;
  receive_notifications_favourites?: boolean;
  receive_notifications_sales?: boolean;
}) : Promise<any> =>{
  try {
    let response = await url.patch(`users/me`, body);
    return response;
  } catch (e : any) {
    console.log(e, 'ERRORR');
    return e;
  }
};

const profileDataSlice = createSlice({
  name: 'profileDataSlice',
  initialState,
  reducers: {
    updateMe: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    updateProfileImg: (state, action) => {
      state.data = {
        ...state.data,
        profile: { ...state.data.profile, image_url: action.payload },
      };
    },
    updateProfileInfo: (state, action) => {
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...state.data,
          profile: { ...state.data.profile, ...action.payload },
        })
      );
      state.data = {
        ...state.data,
        profile: { ...state.data.profile, ...action.payload },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfieData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfieData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getProfieData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateProfileImg, updateProfileInfo, updateMe } = profileDataSlice.actions;
export default profileDataSlice.reducer;
