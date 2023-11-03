import axios from 'axios';
const url = 'https://api.thecatapi.com/v1';
const api_key =
  'live_vvn0MJinoqW8XlzjTJigrKozl9H2hW1gVLfb0Jtx3x5h4e1VeQR1W0AtCmxsyGMW';

export function fetchBreeds() {
  return fetch(`${url}/breeds?api_key=${api_key}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
     return response.json();
    });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`
  ).then(response => response.json());
}
