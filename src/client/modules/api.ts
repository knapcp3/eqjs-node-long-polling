import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const TALKS_URL = '/talks';

export const request = async <T>(
  url: string,
  options: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const response = await axios.request<T>({
    ...options,
    url,
  });
  if (response.status < 400) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
};
