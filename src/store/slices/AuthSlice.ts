import { fetchUserFavoritesAsync } from '@/store/slices/favorities';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import url from '../../config/index';

export const authenticateTokenAsync: any = createAsyncThunk(
  'auth/authenticateToken',
  async (token: string, { dispatch }) => {
    try {
      const resp = await url.get('/users/me', {
        headers: {
          Authentication: token,
        },
      });
      dispatch(authSuccess(resp.data));
      dispatch(fetchUserFavoritesAsync());
    } catch (error) {
      localStorage.removeItem('token');
      dispatch(authFailed());
    }
  }
);

export const forgotPass = async (body: any) => {
  try {
    const forgot = await url.post('/auth/forgot-password', body);
    return forgot;
  } catch (e: any) {
    throw new Error(e?.response?.data?.message || e);
  }
};

export const confirmOTP = async (code: string) => {
  try {
    const confirm = await url.get(`/auth/email-2fa/${code}`);
    return confirm;
  } catch (e: any) {
    throw new Error(e?.response?.data?.message || e);
  }
};

export const changePass = async (code: string, body: any) => {
  try {
    const changePass = await url.put(`/auth/set-password/${code}`, body);
    return changePass;
  } catch (e: any) {
    throw new Error(
      e?.response?.data?.message ||
        'Something went wrong, verify that OTP you entered is correct'
    );
  }
};

const initialState: any = {
  code: '',
  user: null,
  isAuthenticating: true,
  currency: {
    label: 'CAD',
    symbol: 'C$',
    value: 1.0,
  },
};

const AuthForm = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    updateCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setOTP: (state, action) => {
      state.code = action.payload;
    },
    authSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticating = false;
    },
    authFailed: (state) => {
      state.user = null;
      state.isAuthenticating = false;
    },
    updateProfileImage: (state, action) => {
      state.user = {
        ...state.user,
        profile: { ...state.user.profile, image_url: action.payload },
      };
    },
  },
  extraReducers: (builder) => {},
});
export const {
  setOTP,
  authSuccess,
  authFailed,
  updateProfileImage,
  updateCurrency,
} = AuthForm.actions;
export default AuthForm.reducer;
