
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";

import { EnvVarEnum } from "@/constants/Global";
import { StoreQueryTagEnum } from "@/constants/StoreConstant";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

const baseQuery = fetchBaseQuery({
  baseUrl: EnvVarEnum.POKEMON_BASE_URL,
});

const imageBaseQuery = fetchBaseQuery({
  baseUrl: EnvVarEnum.IMAGE_BASE_URL,
});

export const PokemonApi = createApi({
  reducerPath: "pokemon",
  baseQuery:baseQuery,
  endpoints:()=>({})
  // NOTE: Axios wasn't utilized due to cors error
  //  axiosBaseQuery({
  //   baseUrl: EnvVarEnum.POKEMON_BASE_URL as string,
  // }),
  // endpoints(build) {
  //   return {
  //     query: build.query({ query: () => ({ url: 'query', method: 'get' }) }),
  //     mutation: build.mutation({
  //       query: () => ({ url: '/mutation', method: 'post' }),
  //     }),
  //   }
  // },
});

export const PokemonImageApi = createApi({
  reducerPath: "image",
  baseQuery:imageBaseQuery,
  endpoints:()=>({})
});

[PokemonApi].forEach((api) => {
  api.enhanceEndpoints({ addTagTypes: Object.values(StoreQueryTagEnum) });
});

[PokemonImageApi].forEach((api) => {
  api.enhanceEndpoints({ addTagTypes: Object.values(StoreQueryTagEnum) });
});
