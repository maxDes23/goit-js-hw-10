import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import './styles.css';

const selector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const errorText = document.querySelector('.error');

errorText.classList.add('is-hidden');

selector.classList.add('hidden');

function getPetsList(breeds) {
  selector.innerHTML = breeds
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('\n');
}

fetchBreeds()
  .then(result => {
    getPetsList(result);

    selector.style.display = 'block';
    new SlimSelect({ select: '.breed-select' });
  })
  .catch(() => {
    Notiflix.Notify.failure(
      `Oops! Something went wrong! Try reloading the page!`,
      { timeout: 4000, useIcon: false }
    );
    catInfo.style.display = 'none';
  })
  .finally(() => {
    loader.classList.add('is-hidden');
  });

selector.addEventListener('change', onSelect);

function onSelect(event) {
  const selectBreedId = event.currentTarget.value;

  loader.classList.remove('is-hidden');

  catInfo.style.display = 'block';
  errorText.style.display = 'block';
  fetchCatByBreed(selectBreedId)
    .then(data => {
      markup(data);
    })
    .catch(() => {
      Notiflix.Notify.failure(
        `Oops! Something went wrong! Try reloading the page!`,
        { timeout: 4000, useIcon: false }
      );
      catInfo.style.display = 'none';
      errorText.style.display = 'block';
    })
    .finally(() => {
      loader.classList.add('is-hidden');

      catInfo.classList.remove('is-hidden');
    });
}

function markup(data) {
  const { breeds, url } = data[0];
  const { name, temperament, description } = breeds[0];
  const catCard = `
    <img src="${url}" alt="${name}" width=500>
    <div>
      <h2 class="title">${name}</h2>
      <p class="text">${description}</p>
      <p class="text span-text"><span class="span">Temperament:</span> ${temperament}</p>
    </div>`;
  catInfo.innerHTML = catCard;
}
