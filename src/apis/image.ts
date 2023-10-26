import { PokemonImageApi } from "@/config/StoreQueryConfig";
import { GetPokemonImageRequest, GetPokemonImageResponse } from "@/types/pokemon";

export const imageApi = PokemonImageApi.injectEndpoints({
  endpoints: (builder) => ({
    getPokemonCategories: builder.query<
      GetPokemonImageResponse,
      GetPokemonImageRequest
    >({
      query: ({ imageId,...params }) => ({
        url: `/${imageId}`,
        params,
      }),
    }),
  }),
});

export default imageApi;
