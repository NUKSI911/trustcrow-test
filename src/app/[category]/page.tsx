"use client";

import React, { useState } from "react";
import {
  AppBar,
  Card,
  InputBase,
  Pagination,
  alpha,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

import pokemonApi from "@/apis/pokemon";
import LoadingContent from "@/components/common/LoadingContent";
import Main from "@/components/Main/Main";
import { capitalize } from "@/utils/FunctionUtils";
import { EnvVarEnum } from "@/constants/Global";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: "auto",
  width: "50%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function CategoryDetail({
  params,
}: {
  params: { category: string };
}) {

  const [pageNo, setPageNo] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const categoryDetailQuery = pokemonApi.useGetPokemonCategoryDetailsQuery({
    id: params.category,
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, p: number) => {
    setPageNo(p);
  };

  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setSearchTerm(e.target.value)
  }

  const renderPokemonItems = () => {
    return categoryDetailQuery.data?.pokemon
      .filter((val) => val.pokemon.name.includes(searchTerm))
      .slice((pageNo - 1) * 25, pageNo * 25 + 1);
  };

  const count = Math.ceil(
    (renderPokemonItems()?.length || 1) / 25
  );

  return (
    <Main>
      <LoadingContent
        loading={categoryDetailQuery.isLoading}
        error={categoryDetailQuery.isError}
      >
        <>
          <AppBar className="flex !flex-row justify-between items-center pokemon-content py-4 pl-4 " color="info">
            <h1 className=" inline-block">
              {capitalize(categoryDetailQuery.data?.name || "")} Category
              Pokemons
            </h1>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={handleSearchTerm}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </AppBar>
          <section className="w-full flex gap-2 flex-wrap justify-between items-center mb-12 mt-20 mx-auto">
            {renderPokemonItems()?.map((pokemon) => (
              <Card
                key={pokemon.pokemon.name}
                className="basis-1/3 md:basis-1/4 lg:basis-1/6 px-auto text-center py-6 flex flex-col items-center"
              >
                <img
                  src={`${EnvVarEnum.IMAGE_BASE_URL}${
                    pokemon.pokemon.url.match(/\/(\d+)\/$/)![1]
                  }.png`}
                  width={40}
                  height={40}
                  alt=""
                />
                <Link href={`/${params.category}/${pokemon.pokemon.name}`}>
                  {pokemon.pokemon.name}
                </Link>
              </Card>
            ))}
          </section>
          <Pagination color="secondary" count={count} page={pageNo} onChange={handlePageChange} />
        </>
      </LoadingContent>
    </Main>
  );
}
