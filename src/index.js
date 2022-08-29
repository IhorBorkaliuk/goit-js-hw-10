import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')
const input = document.querySelector('#search-box')

input.addEventListener('input', debounce(findCountry, DEBOUNCE_DELAY))


function findCountry(evt) {

    const inputedValue = evt.target.value.trim();
    if (!inputedValue) {
        return
    }

    fetchCountries(inputedValue).then(data => {

        if (data.length === 1) {
            createCountry(data)
        }

        if (data.length >= 2 & data.length <= 10) {
            createCountries(data)
        }

        if (data.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
        }
    
    }).catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name')
        clearContent()
    })
}

function createCountry(countries) {
    const countryMarkUp = countries.map(country => {
        return `
        <li>
        <img
        src="${country.flags.svg}"
        width = 50px height = 30px
        alt="${country.name.official}"
        />
        <p class = "country">${country.name.official}</p>
        <p><span class = "capital">Capital: </span>${country.capital}</p>
        <p><span>Population: </span>${country.population}</p>
        <p><span>Languages: </span>${Object.values(country.languages)}</p>
      </li>`
    })

    countryInfo.innerHTML = countryMarkUp
}

function createCountries(countries) {
    const countriesMarkUp = countries.map(country => {
        return `
        <li>
        <img
        src="${country.flags.svg}"
        width = 30 height = 20
        alt="${country.name.official}"
        />
        <p class = "country">${country.name.official}</p>
      </li>`
    }).join('')

    countryInfo.innerHTML = countriesMarkUp
}

function clearContent() {
    countryInfo.innerHTML = ''
    countryList.innerHTML = ''
}