import axios from 'axios';
import queryString from 'query-string';
import { MatchInterface, MatchGetQueryInterface } from 'interfaces/match';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getMatches = async (query?: MatchGetQueryInterface): Promise<PaginatedInterface<MatchInterface>> => {
  const response = await axios.get('/api/matches', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createMatch = async (match: MatchInterface) => {
  const response = await axios.post('/api/matches', match);
  return response.data;
};

export const updateMatchById = async (id: string, match: MatchInterface) => {
  const response = await axios.put(`/api/matches/${id}`, match);
  return response.data;
};

export const getMatchById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/matches/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMatchById = async (id: string) => {
  const response = await axios.delete(`/api/matches/${id}`);
  return response.data;
};
