//Импорт библиотек
import axios from "axios";
import Notiflix from 'notiflix';

//ключ
axios.defaults.headers.common["x-api-key"] = "live_75uKdfWmTBuP8ukRMUMUJCO8KQISCBd02MHAphMUMEzlHonW5muljdtCNZFts9oC";

//функция запроса на каталог котов
export function fetchBreeds() {
    return axios
    .get("https://api.thecatapi.com/v1/breeds")
        .then(response => response.data)
    .catch(error => {
    Notiflix.Notify.failure(`failure to Fetch Breeds ${error}`);
  });
}

//функция запроса на породу из котокаталога
export function fetchCatByBreed(breedId) {
    return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => response.data)
    .catch(error => {
    Notiflix.Notify.failure(`failure to Fetch Cat by Breed ${error}`);
  });
}
 
