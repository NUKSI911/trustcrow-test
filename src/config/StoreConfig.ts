import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { PokemonApi, PokemonImageApi } from "./StoreQueryConfig";

const store = configureStore({
  reducer: {
    [PokemonApi.reducerPath]: PokemonApi.reducer,
    [PokemonImageApi.reducerPath]: PokemonImageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      PokemonApi.middleware,
      PokemonImageApi.middleware
    ),
});

setupListeners(store.dispatch);


export default store;
