import axios from 'axios';

export class Images {
  #BASE_URL = 'https://pixabay.com/api/';
  #KEY = "35867052-4bc95a3fa2f6c2b76177d40b9";
  #Q = ''

    constructor() {
        this.perPage = 40;
        this.currentPage = 1;
    }

    async fetchImages() {
        const url = `${this.#BASE_URL}?key=${this.#KEY}&q=${this.#Q}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}
        &page=${this.currentPage}`
        try {
            const response = await axios.get(url);
            return response.data
        } catch (error) {
            console.log(error);
            return [];
        }
    }

        incrementPage() {
            this.currentPage  += 1;
    }

        setFirstPage() {
            this.currentPage = 1;
            this.perPage = 40;
    }

        getPageNumber() {
            return this.currentPage;
    }

    get q(){
        return this.#Q
    }

    set q(newQ){
        this.#Q = newQ
    }

}

