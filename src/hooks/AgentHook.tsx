import { getAgentByUsername, getUserByID, getUsers } from '@/store/slices';
import { useEffect, useState } from 'react';

export const useUserHook = (params?: any) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);

    const fetchUser = async (params?: any) => {
      try {
        const addedProfile: any = await getUsers(params);
        if (addedProfile) {
          setLoading(false);
          setData(addedProfile.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchUser(params);
  }, [params]);
  return { data, loading };
};

export const UseUserById = (id?: string | string[]) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);

    const fetchUser = async (id?: string | string[]) => {
      try {
        const getProfile: any = await getUserByID(id);
        if (getProfile) {
          setData(getProfile);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchUser(id);
  }, [id]);
  return { data, loading };
};
export const UseAgentByUsername = (id?: string | string[]) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);

    const fetchUser = async (username?: string | string[]) => {
      try {
        const getProfile: any = await getAgentByUsername(username);
        if (getProfile) {
          setData(getProfile);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchUser(id);
  }, [id]);
  return { data, loading };
};
