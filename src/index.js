//Импорт библиотек
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

//импорт функций на все породы и одну породу из котокаталога
import {
    fetchBreeds,
    fetchCatByBreed
} from './cat-api.js'



//элементы 
const breedSelect = document.querySelector('.breed-select')
const breedLoader = document.querySelector('.loader')
const breedCatinfo = document.querySelector('.cat-info')

breedSelect.addEventListener('change', renderCat)

//делаем лоадер и контейнер для инфы сразу скрытыми
breedLoader.style.display = "none";
breedCatinfo.style.display = "none";

fetchBreeds()
    .then(breeds => {
        breeds.forEach(breed => {
            const optionBreed = document.createElement('option');
            optionBreed.value = breed.id;
            optionBreed.textContent = breed.name;
            breedSelect.appendChild(optionBreed);
        })

        new SlimSelect({
            select: '#selectElement', 
            settings: {
            placeholderText: 'Choise your favorite kitty 😺',
      },
        })

        
        
    })
    .catch(error => {
        Notiflix.Notify.failure(error);
    });

function renderCat() {
    const breedId = breedSelect.value

    showLoader()
    hideCatinfo()

    fetchCatByBreed(breedId)
        .then(dataCat => {

            hideLoader()
            showCatinfo()

        //информация для карточки кота
            const catImg = dataCat[0].url;
            const catDescr = dataCat[0].breeds[0].description;
            const catTemp = dataCat[0].breeds[0].temperament;
            const catName = dataCat[0].breeds[0].name;
            
            //шаблон кота
            const cat = `
            <img class="img-cat" src="${catImg}" width="400" height="400" loading="lazy">
            <div class="info">
            <h1 class="cat-name">${catName}</h1>
            <p class="cat-info"><b>Description: </b>${catDescr}</p>
            <p class="cat-info"><b>Temperament: </b>${catTemp}</p>
            </div>
            `
            breedCatinfo.innerHTML = cat;
        })
        .catch(error => {

            hideLoader()
            
            Notiflix.Notify.failure(error);
        });
}

//функции скрытия/отображения 

function hideLoader() {
    breedLoader.style.display = "none";
}
function showLoader() {
    breedLoader.style.display = "block";
}

function hideCatinfo() {
    breedCatinfo.style.display = "none";
}
function showCatinfo() {
    breedCatinfo.style.display = "block";
}

