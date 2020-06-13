import api from "../api/pokemon_cards";

export const GET_POKEMON_CARDS_ACTION_START = "GET_POKEMON_CARDS_ACTION_START";
export const GET_POKEMON_CARDS_ACTION_ERROR = "GET_POKEMON_CARDS_ACTION_ERROR";
export const GET_POKEMON_CARDS_ACTION_SUCCESS = "GET_POKEMON_CARDS_ACTION_SUCCESS";

function getPokemonCardsActionStart() {
  return {
    type: GET_POKEMON_CARDS_ACTION_START
  };
}

function getPokemonCardsActionError(error) {
  return {
    type: GET_POKEMON_CARDS_ACTION_ERROR,
    error
  };
}

function getPokemonCardsActionSuccess(data) {
  return {
    type: GET_POKEMON_CARDS_ACTION_SUCCESS,
    data
  };
}

export function getPokemonCardsAsync() {
  return function(dispatch) {
    dispatch(getPokemonCardsActionStart());
    api
      .getPokemonCardsAsync()
      .then(response => {
        const statusReq = response.status;
        if (statusReq == 200) {
          return response.json();
        } else {
          if (statusReq == 401 || statusReq == 403) {
            dispatch(
              getPokemonCardsActionError({
                matchedError: false,
                error: null
              })
            );
          }
        }
      })
      .then(data =>
        dispatch(() => {
          if (data) {
            dispatch(getPokemonCardsActionSuccess(data));
          } else {
              dispatch(
                getPokemonCardsActionError({
                  matchedError: true,
                  error: null
                })
              );
          }
        })
      )
      .catch(error =>
        dispatch(
          getPokemonCardsActionError({
            matchedError: false,
            error: null
          })
        )
      );
  };
}