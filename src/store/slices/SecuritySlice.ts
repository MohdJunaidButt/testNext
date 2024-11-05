import url from '../../config/index';
// changess
export const UpdatePass = async (body: any) => {
  try {
    const update = await url.patch('/auth/update-password', body);
    return update;
  } catch (e: any) {
    return {
      type: 'ERROR',
      message: e?.response?.data?.message || 'Something went wrong',
    };
  }
};
