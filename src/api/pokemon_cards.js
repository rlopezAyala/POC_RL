import "whatwg-fetch";

function getPokemonCardsAsync() {
  const hostUrl = "https://pokeapi.co/api/v2/pokemon";

    return fetch(hostUrl).then(response => {
      return response;
    });
}

export default {
    getPokemonCardsAsync
};
