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

fatchImages() {
    return axios
        .get(`${this.#BASE_URL}`, this.#options)
        .then(({ data }) => {
            return data;
        })
        .catch(err => {
            console.log(err);
        });
}

incrementPage() {
    this.#options.params.page += 1;
    }

    setFistPage() {
    this.#options.params.page = 1;
    }

    getPageNumber() {
        return this.#options.params.page;
    }

    setValue(value) {
        this.#options.params.q = value;
    }

    getvalue() {
        return this.#options.params.q;
    }
}
