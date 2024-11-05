import instance from '@/config';
import { IContactFormData } from '@/types';
import { IEvaluationForm } from '@/types/common/evaluationRequest';
import { FetchArgs } from '@/types/common/properties';
import { ICreateSaveSearch, ISaveSearch } from '@/types/common/saveSearch';
import ObjectToPrams from '@/utils/ObjectToParams';

const apiRequest = async (
  method: 'get' | 'post' | 'delete',
  endpoint: string,
  data?: any,
  headers: any = {}
) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  try {
    const response = await instance({
      method,
      url: `${endpoint}`,
      data,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authentication: token }),
        ...headers,
      },
    });

    if (![200, 201].includes(response.status)) {
      throw new Error(`Failed to ${method} data to ${endpoint}`);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const healthAPI = () => apiRequest('get', '/health/ping');

export const createFloorReservation = (data: any) =>
  apiRequest('post', '/reservations', data, {
    'Content-Type': 'multipart/form-data',
  });

export const fetchPropertiesShortData = (params?: FetchArgs) => {
  const queryString =
    params && Object.keys(params).length > 0 ? ObjectToPrams(params) : '';
  const url =
    queryString === ''
      ? `/properties/shortdata`
      : `/properties/shortdata?${queryString}`;
  return apiRequest('get', url);
};

export const fetchFixedMapsProperties = (params?: FetchArgs) => {
  const queryString =
    params && Object.keys(params).length > 0 ? ObjectToPrams(params) : '';
  return apiRequest(
    'get',
    `/properties/homepage-mapnew${queryString !== '' ? `?${queryString}` : ''}`
  );
};

export const fetchMapsProperties = (params?: FetchArgs) => {
  const queryString =
    params && Object.keys(params).length > 0 ? ObjectToPrams(params) : '';
  return apiRequest(
    'get',
    queryString === ''
      ? `/properties/homepage-map`
      : `/properties/homepage-map?${queryString}`
  );
};

export const fetchHomePage = (params?: FetchArgs) => {
  const queryString =
    params && Object.keys(params).length > 0 ? ObjectToPrams(params) : '';
  return apiRequest(
    'get',
    queryString === ''
      ? `/properties/homepage-data`
      : `/properties/homepage-data?${queryString}`
  );
};

export const fetchHomePageComingSoonProperties = (params?: FetchArgs) => {
  const queryString =
    params && Object.keys(params).length > 0 ? ObjectToPrams(params) : '';
  return apiRequest(
    'get',
    queryString === ''
      ? `/properties/homepage-comingsoon`
      : `/properties/homepage-comingsoon?${queryString}`
  );
};

export const fetchHomePageTorontoProperties = (params?: FetchArgs) => {
  const queryString =
    params && Object.keys(params).length > 0 ? ObjectToPrams(params) : '';
  return apiRequest(
    'get',
    queryString === ''
      ? `/properties/homepage-toronto`
      : `/properties/homepage-toronto?${queryString}`
  );
};

export const fetchPropertyDetail = (id: string) =>
  apiRequest('get', `/properties/${id}`);

export const fetchCondoFloorPlans = (id: string | undefined) =>
  apiRequest('get', `/floorplans/property/${id}`);

export const fetchUserFavorites = () => apiRequest('get', '/favourites/me');

export const fetchFilteredProperties = (params: string) =>
  apiRequest('get', '/properties/data?' + params);

export const fetchPagesProperties = (params: string) =>
  apiRequest('get', '/properties/pages-properties?' + params);

export const fetchSingleFiltlerRange = () => {
  return apiRequest('get', '/properties/filter-range/:type');
};
export const fetchAllFiltlerRanges = () => {
  return apiRequest('get', '/properties/filter-ranges');
};

export const fetchHotCondos = (status: string) =>
  apiRequest('get', `/properties/data?limit=16&sale_status=${status}`);

export const fetchComingSoonCondos = (page: number = 1, limit: number) =>
  apiRequest(
    'get',
    `/properties/data?construction_status=construction&limit=${limit}`
  );

export const fetchSoldCondos = (page: number, limit: number) =>
  apiRequest(
    'get',
    `/properties/data?page=${page}&limit=${limit}&selling_status=Sold Out`
  );

export const createLead = (leadData: any) =>
  apiRequest('post', '/leads', leadData);

export const addFavorite = (propertyId: number) =>
  apiRequest('post', '/favourites', { property: propertyId });

export const removeFavorite = (propertyId: number) =>
  apiRequest('delete', '/favourites', { property: propertyId });

export const submitSupportForm = (formData: IContactFormData) =>
  apiRequest('post', '/supports', formData);

export const submitEvaluationForm = (formData: IEvaluationForm) =>
  apiRequest('post', '/inquiries', formData);

export const searchGlobal = (searchTerm: string) => {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  return apiRequest('get', `/properties/searchGlobal/${encodedSearchTerm}`);
};

export const searchNavbar1 = (searchTerm: string) => {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  return apiRequest(
    'get',
    `/properties/homepage-navbar1//${encodedSearchTerm}`
  );
};

export const getDistinct = (val: string) =>
  apiRequest('get', `/properties/distinct-property-detail/${val}`);

export const getCitiesWithCoordinates = () =>
  apiRequest('get', `/cities/with-coordinates`);

export const getDevelopers = (params: string) =>
  apiRequest('get', `/developers?${params}`);

export const getDevelopersBasic = (params: string) =>
  apiRequest('get', `/developers/with-logos?${params}`);

export const getDeveloperDetails = (slug: string) =>
  apiRequest('get', `/developers/slug/${slug}`);

export const getPropertySections = () =>
  apiRequest('get', '/properties-sections/public');

export const getUsers = (params: string) =>
  apiRequest('get', `/users?${params}`);

export const getAgents = (params: string) =>
  apiRequest('get', `/users/agents-public?${params}`);

export const getSingleUser = (userId: string) =>
  apiRequest('get', `/users/${userId}`);

export const agentRequest = (values: FormData) =>
  apiRequest('post', `/agent_requests`, values, {
    'Content-Type': 'multipart/form-data',
  });

export const fubRequest = (propId: string) =>
  apiRequest('get', `/properties/unlock-property/${propId}`);

export const getNotifications = () =>
  apiRequest('get', `/notifications`, undefined);

export const readAllNotifications = () =>
  apiRequest('get', `/notifications/read`);

export const getWebsiteSections = (name = '') =>
  apiRequest('get', name ? `/websites?name=${name}` : '/websites');

export const createSaveSearch = ({ label, value }: ICreateSaveSearch) =>
  apiRequest('post', '/searches', { label, value });

export const getSavedSearches = () => apiRequest('get', '/searches');
export const deleteSavedSearches = (id: string) =>
  apiRequest('delete', `/searches/${id}`);
