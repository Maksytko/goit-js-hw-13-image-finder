import apiService from './apiService.js'
import card from '../templates/card.hbs'

const refs = {
    searchInputEl: document.querySelector('.search'),
    galleryListEl: document.querySelector('.gallery'),
    anchorDivEl: document.querySelector('.anchor')
}

const debounce = require('lodash.debounce')
const gallery = new apiService


const options = {
    rootMargin: '0px',
    threshold: 1.0
}

const callback = async function([entry], observer) {
    if (entry.isIntersecting) {
        gallery.loadMore().then(renderForLoadMore)
    }
}

const observer = new IntersectionObserver(callback, options)
observer.observe(refs.anchorDivEl)


const createCardsMarkUp = function (result) {
    return result.hits.map(item => card(item)).join('')
}

const increasePageCounter = function () {
    gallery.pageCounter = gallery.pageCounter + 1
}

const renderForLoadMore = function (result) {
    if (result && result.hits.length !== 0) {
        refs.galleryListEl.insertAdjacentHTML('beforeend', createCardsMarkUp(result))
        increasePageCounter()

        return
    }
}

const renderForSearch = function (result) {
    if (result && result.hits.length !== 0) {
        refs.galleryListEl.innerHTML = createCardsMarkUp(result)
        increasePageCounter()

        return
    }

    refs.galleryListEl.innerHTML = ""
}



refs.searchInputEl.addEventListener('input', debounce((event) => {
    gallery.inputText = event.target.value.trim()
    gallery.search().then(renderForSearch)
}, 1000))

