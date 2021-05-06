const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class Cart {
    constructor() {
        this.items = [];
    }

    add(product) {
        let item = this.items.find(item => item.product.id_product === product.id_product);

        if (!item) {
            item = new CartItem(product);
            this.items.push(item);
        }

        item.incCount();

        return this.items.length;
    }

    desc() {
        return `Корзина [${this.isEmpty() ? 'пусто' : this.size()}]`;
    }

    remove(product) {
        const index = this.items.indexOf(product);
        if (index >= 0) {
            this.items.splice(index, 1);
        }

        return this.items.length;
    }

    clear() {
        this.items = [];
    }

    totalPrice() {
        return this.items.reduce((total, i) => total + i.product.price, 0) ;
    }

    size() {
        return this.items.reduce((total, i) => total + i.count, 0);
    }

    isEmpty() {
        return this.size() === 0;
    }

}

class CartItem {
    constructor(product) {
        this.product = product;
        this.count = 0;
    }

    incCount() {
        return ++this.count;
    }

    decCount() {
        if (this.count > 0) {
            this.count--
        }
        return this.count;
    }

    price() {
        return this.product.price * this.count;
    }
}

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        cart: new Cart(),
        imgCatalog: 'https://placehold.it/200x150',
        searchLine: '',
        isVisibleCart: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        filterGoods() {
            const regex = new RegExp(this.searchLine, "i");
            const filteredProducts = this.products.filter(p => regex.test(p.product_name));
            console.log(filteredProducts);
            return filteredProducts;
        },

        toggleCart() {
            this.isVisibleCart = !this.isVisibleCart
        }
    },
    beforeCreate() {
    },
    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
    },


    beforeMount() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
    },
    beforeDestroy() {
    },
    destroyed() {
    },
});
