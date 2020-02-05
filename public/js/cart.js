import { productsInCart } from './index.js';

const baseURL = 'http://localhost:8000/api';

let getCartItems = () => {
    const url = baseURL + '/cart';

    fetch(url, {method: 'GET'})
    .then((response) => {
        return response.json();   
    }).then((data) => {
        console.log(data);
        const noProductsHeading = document.querySelector('.cart--hasProducts')
        
        if(data.emptyCart == false) {
            noProductsHeading.classList.add('hidden');
            createCartProductCard(data);
            document.querySelector('.cart--sum').innerHTML = cartValue(data) + ',00 SEK';
        } else {
            noProductsHeading.classList.remove('hidden');
            document.querySelector('.cart--sum').innerHTML = '0,00 SEK';
        }  
    });
}

const cartValue = (data) => {
    var total = data.products.reduce(function(prev, cur) {
        return prev + parseInt(cur.productPrice);
    }, 0);

    return total;
}

const createCartProductCard = (data) => {
    let productContainer = document.querySelector('.cart-product--container');
        for(let i = 0; i < data.products.length; i++) {
            // extract values from data
            let productKey = data.products[i].productKey;
            let name = data.products[i].productName;
            let brand = data.products[i].productBrand;
            let price = data.products[i].productPrice;
            let img = data.products[i].productImg;
            
            // create HTML block for product card
            let article = document.createElement("article");
            let productImg = document.createElement("img");
            let infoContainer = document.createElement("div");
            let h3 = document.createElement("h3");
            let brandP = document.createElement("p");
            let priceP = document.createElement("p");
            let button = document.createElement("button");

            // set classes, attributes and innerHTML to all tags
            article.className = 'product-card--cart product-card--mainstyles';
            productImg.className = 'product--card__img';
            infoContainer.className = 'product-card--cart__info--container';
            h3.className = 'product--card--heading';
            brandP.className = 'product--card--brand';
            priceP.className = 'product-card--cart--price';
            button.className = 'delete-product__btn';
            
            article.setAttribute('id', productKey);
            productImg.setAttribute('src', img);
            button.setAttribute('value', productKey);

            h3.innerHTML = name;
            brandP.innerHTML = brand;
            priceP.innerHTML = price + ' SEK';
            button.innerHTML = '<i class="fas fa-trash-alt"></i>'

            // add all the elements to the page
            productContainer.appendChild(article);

            article.appendChild(productImg);
            article.appendChild(infoContainer);
            
            infoContainer.appendChild(button);
            infoContainer.appendChild(h3);
            infoContainer.appendChild(brandP);
            infoContainer.appendChild(priceP);

            // add eventListener to the add to cart button
            button.addEventListener("click", function() {
                removeFromCart(this.value);
            });
        }
}

const removeFromCart = (productKey) => {
    const url = baseURL + '/cart?productKey=' + productKey;

    fetch(url, {method: 'DELETE'})
    .then((response) => {
        return response.json();   
    }).then((data) => {
        let messageContainer = document.querySelector('.messages');
        let messageHeading = document.querySelector('.msg__heading');
        let messageBody = document.querySelector('.msg__body');
        console.log(data);
        
        if(data.success == true) {
            const cartContainer = document.querySelector('.cart-product--container');
            const loader = document.querySelector('.loader--container');

            loader.classList.remove('hidden');
            
            setTimeout(function () {
                while (cartContainer.childNodes.length > 2) {
                    console.log(cartContainer.childNodes);
                    cartContainer.removeChild(cartContainer.lastChild);
                }
                getCartItems();
                loader.classList.add('hidden');
            }, 1000);

        } else {
            messageHeading.innerHTML = 'Error';
            messageBody.innerHTML = data.message;
            messageContainer.classList.add('error--msg');
            messageContainer.addEventListener("animationend", function() {
                messageContainer.classList.remove('error--msg');
            });
        }
        
        productsInCart();
    });
}

getCartItems();