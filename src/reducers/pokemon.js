import {
  FETCH_BY_POKEMONS_REQEST,
  FETCH_BY_POKEMONS_SUCCESS,
  FETCH_BY_POKEMONS_ERROR,
  SEARCH_POKEMON_SUCCESS,
  FETCH_ABILITIES_BY_POKEMON_REQEST,
  FETCH_ABILITIES_BY_POKEMON_SUCCESS,
} from "../actionTypes";

const initialState = {
  pokemonsData: [],
  fetchingPokemons: false,
  error: false,
  fetchingAbilities: false,
  abilities: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BY_POKEMONS_REQEST:
      return {
        ...state,
        fetchingPokemons: true,
      };
    case FETCH_BY_POKEMONS_SUCCESS:
      return {
        ...state,
        pokemonsData: action.payload.pokemonsData,
        fetchingPokemons: false,
      };
    case FETCH_BY_POKEMONS_ERROR:
      return {
        ...state,
        error: true,
      };
    case SEARCH_POKEMON_SUCCESS:
      return {
        ...state,
        pokemonsData: action.payload.pokemonsData,
      };
    case FETCH_ABILITIES_BY_POKEMON_REQEST:
      return {
        ...state,
        fatchingAbilities: true,
      };
    case FETCH_ABILITIES_BY_POKEMON_SUCCESS:
      return {
        ...state,
        abilities: action.payload.abilities,
      };
    default:
      return state;
  }
};
