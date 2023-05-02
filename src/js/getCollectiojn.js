export default function getColletion() {
    return {
        form: document.querySelector('.search-form'),
        imgList: document.querySelector('.gallery-all'),
        loadMoreBtn: document.querySelector('.load-more')
    };
}