import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import PokeCard from "../../components/card";
import SearchBar from "../../components/searchBar";
import { makeStyles } from "@material-ui/core/styles";
import { fetchPokemonsAction } from "../../actions";

const useStyles = makeStyles({
  wrapPokemon: {
    display: "flex",
    alignItems: " center",
    justifyContent: "center",
    margin: 40,
  },
  mapPokemon: {
    display: "flex",
    flexWrap: "wrap",
    boxSizing: "border-box",
  },
});
function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pokemonsData = useSelector((state) => state.pokemon.pokemonsData);
  const fetchingPokemons = useSelector(
    (state) => state.pokemon.fetchingPokemons
  );
  const error = useSelector((state) => state.pokemon.error);

  useEffect(() => {
    dispatch(fetchPokemonsAction());
  }, []);

  return (
    <div>
      <SearchBar />
      <div className={classes.wrapPokemon}>
        <div className={classes.mapPokemon}>
          {error ? <p>Not found</p> : null}
          {fetchingPokemons
            ? "Loading ..."
            : pokemonsData.map((pokemon) => {
                return (
                  <PokeCard
                    name={pokemon.name}
                    url={
                      pokemon.url ||
                      "https://pokeapi.co/api/v2/pokemon/" + pokemon.id
                    }
                    single={pokemon.id ? true : false}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default Home;
