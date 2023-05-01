// export function renderGallery(images) {
//     // Очищаємо вміст галереї перед рендерингом нового результату
//     gallery.innerHTML = '';
  
//     // Рендеримо картки зображень
//     const cardsMarkup = images.map(({ webformatURL, largeImageURL }) => {
//       return `
//         <div class='gallery__item'>
//           <a class='pictures__link pictures__img-wrap' href='${largeImageURL}'>
//             <img class='pictures__img' src='${webformatURL}' alt='' />
//           </a>
//         </div>
//       `;
//     }).join('');
  
// }