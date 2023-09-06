import axios from 'axios';
import queryString from 'query-string';
import { LocationPreferenceInterface, LocationPreferenceGetQueryInterface } from 'interfaces/location-preference';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getLocationPreferences = async (
  query?: LocationPreferenceGetQueryInterface,
): Promise<PaginatedInterface<LocationPreferenceInterface>> => {
  const response = await axios.get('/api/location-preferences', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createLocationPreference = async (locationPreference: LocationPreferenceInterface) => {
  const response = await axios.post('/api/location-preferences', locationPreference);
  return response.data;
};

export const updateLocationPreferenceById = async (id: string, locationPreference: LocationPreferenceInterface) => {
  const response = await axios.put(`/api/location-preferences/${id}`, locationPreference);
  return response.data;
};

export const getLocationPreferenceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/location-preferences/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLocationPreferenceById = async (id: string) => {
  const response = await axios.delete(`/api/location-preferences/${id}`);
  return response.data;
};
