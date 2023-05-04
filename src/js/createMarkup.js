import getColletion from "./getCollectiojn";
import SimpleLightbox from "simplelightbox";

import iconSvg from '../images/symbol-defs.svg'

const refs = getColletion()
export function renderGallery(images) {

    const cardsMarkup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
        <div class='gallery__item'>
            <a class='pictures__link pictures__img-wrap' href='${largeImageURL}'>
            <img class='pictures__img' src='${webformatURL}' alt='${tags}' />
            <div class='pictures__info info'>
                <ul class='info__list'>
                <li class='info__item'>
                    <svg class='info__icon info-icon-like' width='15' height='15'>
                    <use href='${iconSvg}#icon-like'></use>
                    </svg>
                    <p class='info__quantity'>${likes}</p>
                </li>
                <li class='info__item'>
                    <svg class='info__icon info-icon-view' width='15' height='15'>
                    <use href='${iconSvg}#icon-tv'></use>
                    </svg>
                    <p class='info__quantity'>${views}</p>
                </li>
                <li class='info__item'>
                    <svg class='info__icon info-icon-comment' width='15' height='15'>
                    <use href='${iconSvg}#icon-bubble'></use>
                    </svg>
                    <p class='info__quantity'>${comments}</p>
                </li>
                <li class='info__item'>
                    <svg class='info__icon info-icon-download' width='15' height='15'>
                    <use href='${iconSvg}#icon-download'></use>
                    </svg>
                    <p class='info__quantity'>${downloads}</p>
                 </li>
                </ul>
            </div>
            </a>
        </div>`;
    }).join('');

  refs.gallery.insertAdjacentHTML('beforeend', cardsMarkup);
  lightbox.refresh()
}

const lightbox = new SimpleLightbox('.gallery a', {
    captionSelector: 'img',
    captionsData: 'alt',
    captionDelay: 250,
    preload: false,
});