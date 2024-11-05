import { GetAllDevelopers, getDeveloperByID } from '@/store/slices';
import React, { useEffect, useState } from 'react';
export const useGetDevelopers = (params?: any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(true);

  useEffect(() => {
    const fetchUser = async (params?: any) => {
      if (!isLoadMore && !params.refetch) return;
      delete params.refetch;
      try {
        setLoading(true);
        const addedProfile: any = await GetAllDevelopers(params);
        if (addedProfile) {
          if (addedProfile.length === 0) setIsLoadMore(false);
          else {
            if (params.name && params.page === 1) {
              setData(addedProfile);
            } else
              setData((st) =>
                st.length !== 0 ? [...st, ...addedProfile] : addedProfile
              );
          }
          //  setData((st) => [...(st.length ? st : []), addedProfile]);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchUser(params);
  }, [params]);
  return { data, loading, isLoadMore };
};
