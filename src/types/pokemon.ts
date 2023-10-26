import { ServerResponse } from "./global";


export type GetPokemonCategoryRequest = {
  id: string;
};


export type GetPokemonCategoryResponse = ServerResponse<{
    name: string,
    pokemon: {
      pokemon: {
        name: string;
        url: string;
      };
      slot: number;
    }[];
  }>;


  export type GetPokemonCategoryListRequest = {};


export type GetPokemonCategoryListResponse = ServerResponse<{
  count: number;
  next: null;
  previous: null;
  results: {
    name: string;
    url: string;
  }[];
}>;


export type GetPokemonDetailsRequest = {
  pokemon: string;
};



type PokemonDetails  = {
    abilities:      {
        ability: {
            name: string,
            url: string
        },
        is_hidden: boolean,
        slot: number
    }[
  
    ],
    base_experience: number,
    forms:     {
        name: string,
        url: string
    }[],
    game_indices: {
        game_index: number,
        version: {
            name: string,
            url: string
        }
    }[],
    height: number,
    held_items: [],
    id: number,
    is_default: boolean,
    location_area_encounters:string,
    name: string,
    order: number,
    past_abilities: [],
    past_types: [],
    species: {
        name: string,
        url: string
    },
    sprites: {
        back_default: string,
        back_female: null|string,
        back_shiny:string,
        back_shiny_female: string,
        front_default:string,
        front_female: null|string,
        front_shiny:string,
        front_shiny_female: null | string,
    },
   stats:  {
       base_stat: number,
       effort: number,
       stat: {
           name:string,
           url:string
        }
    }[],
   types:    {
    slot: number,
    type: {
        name: number,
        url: number
    }
}[],
    weight: number
}


export type GetPokemonDetailsResponse = ServerResponse<PokemonDetails>

export type GetPokemonImageResponse  = ServerResponse<{}>


export type  GetPokemonImageRequest = {
imageId:string
}