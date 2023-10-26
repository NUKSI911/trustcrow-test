"use client";
import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Main from "@/components/Main/Main";
import LoadingContent from "@/components/common/LoadingContent";
import pokemonApi from "@/apis/pokemon";


type Pokemon = {
  id:string
}

export default function PokemonDetailPage({
  params,
}: {
  params: { pokemon: string };
}) {

  const pokemonDetailQuery = pokemonApi.useGetPokemonDetailsQuery({
    pokemon: params.pokemon,
  });

  return (
    <Main>
      <LoadingContent
        loading={pokemonDetailQuery.isLoading}
        error={pokemonDetailQuery.isError}
      >
        <Box>
          <Box className="flex flex-col items-center justify-center pokemon-content mt-16 text-center rounded pt-8">
            <Typography className="uppercase font-sans" variant="h1">
              {pokemonDetailQuery.data?.name}
            </Typography>
            <img
              className="w-40 h-40"
              src={pokemonDetailQuery.data?.sprites.front_default}
            />
            <Box className="w-full">
              <hr className=" w-full mb-4" />
              <Grid  container>
                <Grid item md={3}>
                  <Typography className="">
                    Name
                    <br />
                    {pokemonDetailQuery.data?.name}
                  </Typography>
                </Grid>
                <Grid item md={3}>
                  <Typography className="">
                    Height
                    <br />
                    {pokemonDetailQuery.data?.height}0cm
                  </Typography>
                </Grid>
                <Grid item md={3}>
                  <Typography className="">
                    Weight
                    <br />
                    {pokemonDetailQuery.data?.weight}kg
                  </Typography>
                </Grid>
                {pokemonDetailQuery.data?.types.map((pokemonType) => (
                  <Grid key={pokemonType.type.name} item md={3}>
                    <Typography className="">
                      Type
                      <br />
                      {pokemonType.type.name}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </LoadingContent>
    </Main>
  );
}
