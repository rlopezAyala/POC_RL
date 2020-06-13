import { Map } from "immutable";

import { GET_POKEMON_CARDS_ACTION_START, GET_POKEMON_CARDS_ACTION_ERROR, GET_POKEMON_CARDS_ACTION_SUCCESS } from "../actions/pokemon_cards";

const initialState = Map({
  pokemon_cards: {
    ended: false,
    isError: false,
    matchedError: false,
    data: null
  }
});

const actionsMap = {
  [GET_POKEMON_CARDS_ACTION_START]: state => {
    return state.merge({
      pokemon_cards: {
        ended: false,
        isError: false,
        matchedError: false,
        data: null
      }
    });
  },
  [GET_POKEMON_CARDS_ACTION_ERROR]: (state, action) => {
    return state.merge(
      Map({
        pokemon_cards: {
          ended: true,
          isError: true,
          matchedError: action.matchedError,
          data: action.error
        }
      })
    );
  },
  [GET_POKEMON_CARDS_ACTION_SUCCESS]: (state, action) => {
    return state.merge(
      Map({
        pokemon_cards: {
          ended: true,
          isError: false,
          matchedError: false,
          data: action.data
        }
      })
    );
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}