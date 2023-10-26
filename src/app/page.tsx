"use client";
import Image from "next/image";
import { AppBar, Card, Toolbar, Typography } from "@mui/material";

import LoadingContent from "@/components/common/LoadingContent";
import Main from "@/components/Main/Main";
import pokemonApi from "@/apis/pokemon";
import Link from "next/link";

export default function Home() {
  const categoriesQuery = pokemonApi.useGetPokemonCategoriesQuery({});

  return (
    <Main>
      <LoadingContent
        loading={categoriesQuery.isLoading}
        error={categoriesQuery.isError}
      >
        <>
          <AppBar
            className="flex flex-row justify-between items-center py-4 pl-4 bg-black"
            color="info"
          >
            <Toolbar className="basis-full bg-red">
              <Typography variant="h4">Pokemon Categories</Typography>
            </Toolbar>
          </AppBar>
          <section className="flex gap-4 flex-wrap justify-start mt-20">
            {categoriesQuery.isSuccess &&
              categoriesQuery.data.results.map((category) => (
                <Link href={`/${category.name}`} key={category.name}>
                  <Card className="p-10">
                    <p>{category.name}</p>
                  </Card>
                </Link>
              ))}
          </section>
        </>
      </LoadingContent>
    </Main>
  );
}
