import { PokemonApi } from "@/config/StoreQueryConfig";
import {
GetPokemonCategoryListRequest,
GetPokemonCategoryListResponse,
GetPokemonCategoryRequest,
GetPokemonCategoryResponse,
GetPokemonDetailsRequest,
GetPokemonDetailsResponse
} from "@/types/pokemon";

export const pokemonApi = PokemonApi.injectEndpoints({
  endpoints: (builder) => ({
    getPokemonCategories: builder.query<GetPokemonCategoryListResponse, GetPokemonCategoryListRequest>({
      query: ({ ...params }) => ({
        url: `/type`,
        params,
      }),
    }),
    getPokemonCategoryDetails: builder.query<
      GetPokemonCategoryResponse,
      GetPokemonCategoryRequest
    >({
      query: ({ id, ...params }) => ({
        url: `/type/${id}`,
        params,
      }),
    }),
    getPokemonDetails: builder.query<
      GetPokemonDetailsResponse,
      GetPokemonDetailsRequest
    >({
      query: ({ pokemon, ...params }) => ({
        url: `/pokemon/${pokemon}`,
        params,
      }),
    }),
  }),
});

export default pokemonApi;
