import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getColletion from './js/getCollectiojn';
import { Images } from './js/fatchImages.js';
import { renderGallery } from './js/createMarkup';


const images = new Images(); 

const refs = getColletion();

refs.form.addEventListener('submit', handleSubmitForm);
refs.imgList.addEventListener('click', handleClickImage);
refs.loadMoreBtn.addEventListener('click', () => {
    images.incrementPage();
    getMoreImages();
});



const lightbox = new SimpleLightbox('.gallery a', {
    captionSelector: 'img',
    captionsData: 'alt',
    captionDelay: 250,
    preload: false,
});



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

    images.setFirstPage();
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
    .fetchImages()
    .then(data => {
      if (data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        refs.imgList.innerHTML = '';
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


function handleClickImage(e) {
  if (e.target.nodeName === 'IMG') {
    lightbox.on('show.simplelightbox');
  }
}

function renderHTML(data, append = false) {
    refs.imgList.innerHTML = ''
    const imgGallety = renderGallery(data);
    if(append){
      refs.imgList.insertAdjacentHTML('beforeend', imgGallety)
    } else {
      refs.imgList.innerHTML = imgGallety
    }
}

async function getMoreImages() {
  try {
    images.incrementPage();
    const data = await images.fetchImages();
    if (data.hits.length > 0) {
      renderHTML(data.hits, true);
    } else {
      console.log('No more images');
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
