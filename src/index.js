import { uhu } from 'uhugrid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getColletion from './js/getCollectiojn';
import { Images } from './js/fatchImages.js';
import throttle from 'lodash.throttle';

const images = new Images(); 

const refs = getColletion();

refs.form.addEventListener('submit', handleSubmitForm);
refs.imgList.addEventListener('click', handleClickImage);
window.addEventListener('scroll', throttle(checkPosition, 300));

const lightbox = new SimpleLightbox('.gallery a', {});

Notify.init({
    width: '300px',
    position: 'right-top',
    closeButton: false,
    timeout: 3000,
    cssAnimation: true,
    cssAnimationDuration: 400,
    cssAnimationStyle: 'fade',
});


const gallery = document.querySelector('.gallery');

function renderGallery(images) {

  gallery.innerHTML = '';

  const cardsMarkup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
      <div class='gallery__item'>
        <a class='pictures__link pictures__img-wrap' href='${largeImageURL}'>
          <img class='pictures__img' src='${webformatURL}' alt='${tags}' />
          <div class='pictures__info info'>
            <ul class='info__list'>
              <li class='info__item'>
                <svg class='info__icon info-icon-like' width='15' height='15'>
                  <use href='./images/symbol-defs.svg#icon-like'></use>
                </svg>
                <span class='info__quantity'>${likes}</span>
              </li>
              <li class='info__item'>
                <svg class='info__icon info-icon-view' width='15' height='15'>
                  <use href='./images/symbol-defs.svg#icon-like'></use>
                </svg>
                <span class='info__quantity'>${views}</span>
              </li>
              <li class='info__item'>
                <svg class='info__icon info-icon-comment' width='15' height='15'>
                  <use href='./images/symbol-defs.svg#icon-like'></use>
                </svg>
                <span class='info__quantity'>${comments}</span>
              </li>
              <li class='info__item'>
                <svg class='info__icon info-icon-download' width='15' height='15'>
                  <use href='./images/symbol-defs.svg#icon-like'></use>
                </svg>
                <span class='info__quantity'>${downloads}</span>
              </li>
            </ul>
          </div>
        </a>
      </div>
    `;
  }).join('');

  gallery.insertAdjacentHTML('beforeend', cardsMarkup);
}


function handleClickImage(e) {
  if (e.target.nodeName === 'IMG') {
    lightbox.on('show.simplelightbox');
  }
}

function handleSubmitForm(e) {
    e.preventDefault();

    images.setFistPage();
    const query = e.target.elements.searchQuery.value.trim();
    console.log(query);
    if (!query) {
        return;
    }

    images.setValue(query);
    fatchImages();
    e.target.elements.searchQuery.value = '';
}

function fatchImages() {
  images
    .fatchImages()
    .then(data => {
      if (data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      renderHTML(data.hits);

      if (images.getPageNumber() === 1) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }

      lightbox.refresh();
      images.incrementPage();
    })
    .catch(err => {
      console.log(err);
    });
}

function renderHTML(data) {
refs.imgList.innerHTML = renderGallery(data)
}

function checkPosition() {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;
  const scrolled = window.scrollY;

  const threshold = height - screenHeight / 4;
  const position = scrolled + screenHeight;

  if (position >= threshold) {
    fatchImages();
    smoothScroll();
  }
}


const smoothScroll = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery-all')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};