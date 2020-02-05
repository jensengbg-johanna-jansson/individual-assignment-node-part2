const baseURL = 'http://localhost:8000/api';

let toggleBurgerMenu =  () => {
    let menuContainer = document.querySelector('.menu').classList;
    let bodyContainer = document.querySelector('.body--container').classList;
    let current;
    let toggle;
    let bodyCurrent;
    let bodyToggle;
    
    
    for (i = 0; i < menuContainer.length; i++) {
        if(menuContainer[i] == 'menu--slide_in') {
            current = 'menu--slide_in';
            toggle = 'menu--slide_out';
        } else if(menuContainer[i] == 'menu--slide_out') {
            current = 'menu--slide_out';
            toggle = 'menu--slide_in';
        }
    }

    for (i = 0; i < bodyContainer.length; i++) {
        if(bodyContainer[i] == 'body--slide_in') {
            bodyCurrent = 'body--slide_in';
            bodyToggle = 'body--slide_out';
        } else if(bodyContainer[i] == 'body--slide_out') {
            bodyCurrent = 'body--slide_out';
            bodyToggle = 'body--slide_in';
        }
    }

    if(current != null) {
        menuContainer.add(toggle);
        menuContainer.remove(current);

        bodyContainer.add(bodyToggle);
        bodyContainer.remove(bodyCurrent);
    } else {
        menuContainer.add('menu--slide_in');
        bodyContainer.add('body--slide_in');
    }  
}

const productsInCart = () => {
    const url = baseURL + '/cart';

    fetch(url, {method: 'GET'})
    .then((response) => {
        return response.json();   
    }).then((data) => {
        let countProducts = data.products.length;
        let counterContainer = document.querySelector('.cart--numb--items');
        
        if(countProducts == null) {
            countProducts = 0
        }

        counterContainer.innerHTML = countProducts;
    });
}
productsInCart();

const addProductToCart = (productKey) => {
    const url = baseURL + '/cart?productKey=' + productKey;

    fetch(url, {method: 'POST'})
    .then((response) => {
        return response.json();   
    }).then((data) => {
        console.log(data);
        productsInCart();
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

const getAllProducts = () => {
    const url = baseURL + '/products';

    fetch(url, {method: 'GET'})
    .then((response) => {
        return response.json();   
    }).then((data) => {
        let productContainer = document.querySelector('.product--container');

        for(i = 0; i < data.length; i++) {
            // extract values from data
            let productKey = data[i].productKey;
            let name = data[i].productName;
            let brand = data[i].productBrand;
            let price = data[i].productPrice;
            
            // create HTML block for product card
            let article = document.createElement("article");
            let productImg = document.createElement("img");
            let inforContainer = document.createElement("div");
            let h3 = document.createElement("h3");
            let brandP = document.createElement("p");
            let priceP = document.createElement("p");
            let button = document.createElement("button");

            // set classes, attributes and innerHTML to all tags
            article.className = 'product--card small--card';
            inforContainer.className = 'product--card__info--container';
            h3.className = 'product--card--heading';
            brandP.className = 'product--card--brand';
            priceP.className = 'product--card--price';
            button.className = 'product--card--addtocart__btn';
            
            button.setAttribute('value', productKey);

            h3.innerHTML = name;
            brandP.innerHTML = brand;
            priceP.innerHTML = price + ' SEK';
            button.innerHTML = 'Add to cart <span class="cart--icon__btn"><i class="fas fa-cart-plus"></i></span>'

            // add all the elements to the page
            productContainer.appendChild(article);

            article.appendChild(productImg);
            article.appendChild(inforContainer);
            
            inforContainer.appendChild(h3);
            inforContainer.appendChild(brandP);
            inforContainer.appendChild(priceP);
            inforContainer.appendChild(button);

            // add eventListener to the add to cart button
            button.addEventListener("click", function() {
                addProductToCart(this.value);
            });
        }
    });
}
numberOfProducts();
getAllProducts(); 


document.querySelector('.burger--menu').addEventListener("click", toggleBurgerMenu); 
document.querySelector('.has__submenu').addEventListener("click", function() {
    toggleBurgerMenu('sub');
});