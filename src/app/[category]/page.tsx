"use client";

import React, { useState } from "react";

import pokemonApi from "@/apis/pokemon";
import LoadingContent from "@/components/common/LoadingContent";
import Main from "@/components/Main/Main";
import { Card, Pagination } from "@mui/material";
import { capitalize } from "@/utils/FunctionUtils";
import Link from "next/link";
import Image from "next/image";
import { EnvVarEnum } from "@/constants/Global";

export default function CategoryDetail({
  params,
}: {
  params: { category: string };
}) {
  const [pageNo, setPageNo] = useState(1);

  const categoryDetailQuery = pokemonApi.useGetPokemonCategoryDetailsQuery({
    id: params.category,
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, p: number) => {
    setPageNo(p);
  };

  const count = Math.ceil(
    (categoryDetailQuery.data?.pokemon?.length || 1) / 25
  );

  const renderPage = () => {
    return categoryDetailQuery.data?.pokemon.slice(
      (pageNo - 1) * 25,
      pageNo * 25 + 1
    );
  };

  return (
    <Main>
      <LoadingContent
        loading={categoryDetailQuery.isLoading}
        error={categoryDetailQuery.isError}
      >
        <>
          <h1 className="mb-4">
            {capitalize(categoryDetailQuery.data?.name || "")} Category
            Pokemons
          </h1>
          <section className="w-full flex gap-2 flex-wrap justify-between items-center mb-12">
            {renderPage()?.map((pokemon) => (
              <Card
                key={pokemon.pokemon.name}
                className="basis-1/3 md:basis-1/4 lg:basis-1/6 px-auto text-center py-6 flex flex-col items-center"
              >
                <img src={`${EnvVarEnum.IMAGE_BASE_URL}${pokemon.pokemon.url.match(/\/(\d+)\/$/)![1]}.png`} width={40} height={40}  alt=""/>
                <Link href={`/${params.category}/${pokemon.pokemon.name}`}>
                  {pokemon.pokemon.name}
                </Link>
              </Card>
            ))}
          </section>
          <Pagination count={count} page={pageNo} onChange={handlePageChange} />
        </>
      </LoadingContent>
    </Main>
  );
}
