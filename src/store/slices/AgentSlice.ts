import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import url from '../../config/index';

// Get all users by
export const getUsers = async (params?: {
  role: string;
  page: number;
  limit: string;
  search?: string;
}) => {
  let urlParams =
    params && params.search
      ? `${
          `role=` +
          params.role +
          `&page=` +
          params.page +
          `&limit=` +
          params.limit +
          `&search=` +
          params?.search
        }`
      : `${
          `role=` +
          params?.role +
          `&page=` +
          params?.page +
          `&limit=` +
          params?.limit
        }`;

  // try {
  const getTheUser: any = await url.get(`/users?${urlParams}`);
  return getTheUser;
  // } catch (e: any) {
  // console.log(e, 'ERRORR');
  // }
};

// Get user by ID
export const getUserByID = async (id?: string | string[], params?: {}) => {
  try {
    let urlParams = params ? params : '';
    const getTheUser = await url.get(`/users/${id}?${urlParams}`);
    return getTheUser.data;
  } catch (e) {
    return null;
  }
};

// Get user by ID
export const getAgentByUsername = async (username?: string | string[], params?: {}) => {
  try {
    let urlParams = params ? params : '';
    const getTheUser = await url.get(`/users/agents/${username}?${urlParams}`);
    return getTheUser.data;
  } catch (e) {
    return null;
  }
};
