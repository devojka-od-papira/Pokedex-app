/* eslint-disable no-unreachable */
import axios from "axios";
import {
  FETCH_BY_POKEMONS_REQEST,
  FETCH_BY_POKEMONS_SUCCESS,
  FETCH_BY_POKEMONS_ERROR,
  SEARCH_POKEMON_REQEST,
  SEARCH_POKEMON_SUCCESS,
  SEARCH_POKEMON_ERROR,
  FETCH_ABILITIES_BY_POKEMON_REQEST,
  FETCH_ABILITIES_BY_POKEMON_SUCCESS,
  FETCH_ABILITIES_BY_POKEMON_ERROR,
} from "../actionTypes";

export const fetchPokemonsAction = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_BY_POKEMONS_REQEST });
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=50&offset=100")
      .then((response) => {
        console.log("resp", response);
        dispatch({
          type: FETCH_BY_POKEMONS_SUCCESS,
          payload: {
            pokemonsData: response.data.results,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: FETCH_BY_POKEMONS_ERROR });
      });
  };
};

function capitalize(string) {
  return string && string[0].toUpperCase() + string.slice(1);
}

export const submitPokemonAction = (searchValue) => {
  return (dispatch) => {
    dispatch({
      type: SEARCH_POKEMON_REQEST,
    });

    if (searchValue === "") {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=50&offset=100")
        .then((response) => {
          dispatch({
            type: SEARCH_POKEMON_SUCCESS,
            payload: {
              pokemonsData: response.data.results,
            },
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      axios
        .get("https://pokeapi.co/api/v2/pokemon/" + searchValue)
        .then((response) => {
          const newStats = response.data.stats.map((value) => {
            return {
              ...value,
              id: capitalize(value.stat.name),
              label: capitalize(value.stat.name),
              value: value.base_stat,
              color: "hsl(115, 70%, 50%)",
            };
          });

          const newData = { ...response.data, stats: newStats };
          dispatch({
            type: SEARCH_POKEMON_SUCCESS,
            payload: {
              pokemonsData: [newData],
            },
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };
};

export const fetchPokemonAbilitiesAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ABILITIES_BY_POKEMON_REQEST });
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/ability/${id}`
      );
      dispatch({
        type: FETCH_ABILITIES_BY_POKEMON_SUCCESS,
        payload: {
          abilities: data,
        },
      });
    } catch (error) {
      dispatch({ type: FETCH_ABILITIES_BY_POKEMON_ERROR });
    }
  };
};
