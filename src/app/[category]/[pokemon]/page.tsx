"use client"
import pokemonApi from "@/apis/pokemon";
import Main from "@/components/Main/Main";
import React from "react";

export default function PokemonDetailPage({
  params,
}: {
  params: { pokemon: string };
}) {
  const pokemonDetailQuery = pokemonApi.useGetPokemonDetailsQuery({
    pokemon: params.pokemon,
  });

  console.log({pokemonDetailQuery})
  return <Main>details</Main>;
}
