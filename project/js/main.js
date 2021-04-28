const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr);
                } else {
                    reject(xhr)
                }
            }
        };
        xhr.send();
    });
}

getRequest('https://raw.githubusercontent.com/Solyankina/js_2_learning/homework_1/README.md')
    .then((xhr) => {
        console.log(xhr.responseText)
    })
    .catch((xhr) => {
        console.log(`Status code: ${xhr.status}`)
    })


// –--------------------------------

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];

        this._getProducts()
            .then((data) => {
                this._goods = data;
                this._render();
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then((response) => response.json())
            .catch((error) => {
                console.log(error);
            });
    }

    _render() {
        const block = document.querySelector(this.container);

        for (const good of this._goods) {
            const productObject = new ProductItem(good);
            // console.log(productObject);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('afterbegin', productObject.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                      <img src="${this.img}" alt="Some img">
                      <div class="desc">
                          <h3>${this.title}</h3>
                          <p>${this.price} \u20bd</p>
                          <button class="buy-btn">Купить</button>
                      </div>
                  </div>`;
    }
}

class Cart {
    constructor() {
        this._items = [];
    }

    add(product) {
        let item = new CartItem(product, this);
        return this._items.push(item);
    }

    remove(product) {
        let index = this._items.indexOf(this._product);
        this._items.splice(index, 1);
        return this._items.length;
    }

    clear() {
        this._items = [];
    }

    goods() {
        return this._items;
    }

    totalPrice() {
        let sum = 0;
        this._items.forEach(i => sum += i._product.price);
        return sum;
    }

    size() {
        return this._items.length;
    }

}

class CartItem {
    constructor(product, cart) {
        this._product = product;
        this._cart = cart;
    }

    incCount() {
        return this._cart.add(this._product);
    }

    decCount() {
        return this._cart.remove(this._product);
    }
}

const pl = new ProductList();
const cart = new Cart();



