import axios from "axios";
import Notiflix from 'notiflix';

axios.defaults.headers.common["x-api-key"] = "live_75uKdfWmTBuP8ukRMUMUJCO8KQISCBd02MHAphMUMEzlHonW5muljdtCNZFts9oC";

export function fetchBreeds() {
    return axios
    .get("https://api.thecatapi.com/v1/breeds")
        .then(response => response.data)
    .catch(error => {
    Notiflix.Notify.failure(`failure to Fetch Breeds ${error}`);
  });
}

export function fetchCatByBreed(breedId) {
    return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => response.data)
    .catch(error => {
    Notiflix.Notify.failure(`failure to Fetch Cat by Breed ${error}`);
  });
}
 
