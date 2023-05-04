import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getColletion from './js/getCollectiojn';
import { Images } from './js/fatchImages.js';
import { renderGallery } from './js/createMarkup';


const images = new Images(); 

const refs = getColletion();

refs.form.addEventListener('submit', handleSubmitForm);
refs.loadMoreBtn.addEventListener('click', loadImages)


refs.loadMoreBtn.classList.add('hidden')

Notify.init({
    width: '300px',
    position: 'right-top',
    closeButton: false,
    timeout: 3000,
    cssAnimation: true,
    cssAnimationDuration: 400,
    cssAnimationStyle: 'fade',
});




async function handleSubmitForm(e) {
        e.preventDefault();

        images.setFirstPage();
        const query = e.target.elements.searchQuery.value.trim();
        images.q = query;
        console.log(query);
        e.target.elements.searchQuery.value = ''

        if (!query) {
          Notify.info('Fill the form for searching');
          clearAll()
            return;
        }
        clearAll()
      try{
        const expectFetch = await images.fetchImages();
        if(expectFetch.totalHits === 0){
          Notify.failure('Sorry, there are no images matching your search query. Please try again.');
          clearAll()
          refs.loadMoreBtn.classList.add('hidden');
          return
        }
      Notify.success(`Hooray! We found ${expectFetch.total} images.`);
      renderGallery(expectFetch.hits)
      if(images.perPage * images.currentPage > expectFetch.totalHits){
        Notify.info('We`re sorry, but you`ve reached the end of search results.');
        refs.loadMoreBtn.classList.add('hidden');
        return
      }
      refs.loadMoreBtn.classList.remove('hidden');
      } catch(error) {
        console.log(error.message);
      }

}


async function loadImages(){
    images.incrementPage();

    try {
        const expectFetch = await images.fetchImages();

        renderGallery(expectFetch.hits)

        if(images.perPage * images.currentPage > expectFetch.totalHits){
          showMessage('end')
          refs.loadMoreBtn.classList.add('.hidden');
          return
        }
    } catch(error){
        console.log(error.message);
    }
}




function clearAll(){
    refs.gallery.innerHTML = ''
}