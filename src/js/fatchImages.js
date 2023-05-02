import axios from 'axios';

export class Images {
  #BASE_URL = 'https://pixabay.com/api/';
  #options = {
        params: {
            key: '35867052-4bc95a3fa2f6c2b76177d40b9',
            q: null,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: 1,
            per_page: 40,
    },
    headers: {
      'Content-Type': 'application/json',
    },
    };

    async fetchImages() {
        try {
        const { data } = await axios.get(this.#BASE_URL, { params: this.#options.params });
            return data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

        incrementPage() {
            this.#options.params.page += 1;
    }

        setFirstPage() {
            this.#options.params.page = 1;
    }

        getPageNumber() {
            return this.#options.params.page;
    }

        setValue(value) {
            this.#options.params.q = value;}

        getValue() {
            return this.#options.params.q;
    }
}

