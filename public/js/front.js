import { createMainProductCard } from './index.js';

const baseURL = 'http://localhost:8000/api';

const getNewProducts = () => {
    const url = baseURL + '/products';

    fetch(url, {method: 'GET'})
    .then((response) => {
        return response.json();   
    }).then((data) => {
        const dataSortByDate = data.sort((a, b) => (a.added < b.added) ? 1 : -1).slice(0, 4);
        createMainProductCard(dataSortByDate);
    });
}

getNewProducts();