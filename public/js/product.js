import { createMainProductCard } from './index.js';

const baseURL = 'http://localhost:8000/api';

const getAllProducts = () => {
    const url = baseURL + '/products';

    fetch(url, {method: 'GET'})
    .then((response) => {
        return response.json();   
    }).then((data) => {
        console.log(data);
        createMainProductCard(data);
    });
}

const numberOfProducts = () => {
    const url = baseURL + '/products';
    
    fetch(url, {method: 'GET'})
    .then((response) => {
        return response.json();   
    }).then((data) => {
        let countProducts = data.length;
        let numbProductsContainer = document.querySelector('.number--products');

        numbProductsContainer.innerHTML = countProducts + ' products';
    });
}


getAllProducts();
numberOfProducts();