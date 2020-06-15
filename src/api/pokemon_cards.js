import "whatwg-fetch";

function getPokemonCardsAsync() {
  const hostUrl = "https://pokeapi.co/api/v2/pokemon";

    return fetch(hostUrl).then(response => {
      return response;
    });
}

function getPokemonDataAsync(hostUrl) {

    return fetch(hostUrl).then(response => {
      return response;
    });
}

function getPokemonFormInfo(hostUrl) {

  return fetch(hostUrl).then(response => {
    return response;
  });
}

export default {
    getPokemonCardsAsync,
    getPokemonDataAsync,
    getPokemonFormInfo
};
