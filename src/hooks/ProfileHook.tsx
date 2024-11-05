import { CreatProfile } from '@/store/slices';
import React, { useEffect, useState } from 'react';
export const UpdateProfileHook = (
  loading1: any,
  setLoading: any,
  body: any
) => {
  let data;

  useEffect(() => {
    const addProfile = async () => {
      try {
        setLoading(true);
        const addedProfile = await CreatProfile(body);
        data = addedProfile;
        setLoading(false);
      } catch (e) {}
    };
    addProfile();
  }, [body]);
  return { data, loading1 };
};
