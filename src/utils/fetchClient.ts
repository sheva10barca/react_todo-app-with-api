import { RequestMethods } from '../types/RequestMethods';

/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://mate.academy/students-api';

// returns a promise resolved after a given delay
function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function request<T>(
  url: string,
  method: RequestMethods = RequestMethods.GET,
  data: any = null, // we can send any data to the server
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    // We add body and Content-Type only for the requests with data
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  // we wait for testing purpose to see loaders
  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(
    url,
    RequestMethods.POST,
    data,
  ),
  patch: <T>(url: string, data: any) => request<T>(
    url,
    RequestMethods.PATCH,
    data,
  ),
  delete: (url: string) => request(url, RequestMethods.DELETE),
};