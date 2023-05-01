import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getColletion from './js/getCollectiojn';
import { Images } from './js/fatchImages.js';
import throttle from 'lodash.throttle';
import { renderGallery } from './js/createMarkup';


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