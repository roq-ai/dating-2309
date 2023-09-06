import axios from 'axios';
import queryString from 'query-string';
import { VerificationInterface, VerificationGetQueryInterface } from 'interfaces/verification';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getVerifications = async (
  query?: VerificationGetQueryInterface,
): Promise<PaginatedInterface<VerificationInterface>> => {
  const response = await axios.get('/api/verifications', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createVerification = async (verification: VerificationInterface) => {
  const response = await axios.post('/api/verifications', verification);
  return response.data;
};

export const updateVerificationById = async (id: string, verification: VerificationInterface) => {
  const response = await axios.put(`/api/verifications/${id}`, verification);
  return response.data;
};

export const getVerificationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/verifications/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteVerificationById = async (id: string) => {
  const response = await axios.delete(`/api/verifications/${id}`);
  return response.data;
};
