Vue.component('search', {

    data() {
        return {
            userSearch: ''
        }
    },

    methods: {
        filter(comp){
            let regexp = new RegExp(this.userSearch, 'i');
            comp.filtered = comp.products.filter(el => regexp.test(el.product_name));
        }
    },

   template: `<form action="#" class="search-form" @submit.prevent="filter($root.$refs.products)">
                    <input type="text" class="search-field" v-model="userSearch" @keyup="filter($root.$refs.products)">
                    <button class="btn-search" type="submit">
                        <i class="fas fa-search"></i>
                    </button>
                </form>`

})
