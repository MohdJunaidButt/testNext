import url from '../../config/index';
export const GetAllDevelopers = async (params?: {
  role?: string;
  page: number;
  limit: string;
  name?: string;
}) => {
  let urlParams =
    params && params.name
      ? `${
          `&page=` +
          params.page +
          `&limit=` +
          params.limit +
          `&name=` +
          params?.name
        }`
      : `${`&page=` + params?.page + `&limit=` + params?.limit}`;
  try {
    let response: any = await url.get(`/developers?${urlParams}`);
    return response.data;
  } catch (e) {
    console.log(e, 'ERRORR');
    return e;
  }
};

// Get user by ID
export const getDeveloperByID = async (id?: string | string[], params?: {}) => {
  try {
    let urlParams = params ? params : '';
    const getTheUser = await url.get(`/developers/${id}?${urlParams}`);
    return getTheUser;
  } catch (e) {
    return null;
  }
};
