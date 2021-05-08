Vue.component('error', {
    data() {
        return {
            message: '',
            isVisible: false,
        }
    },

    methods: {
        show(message = 'Error') {
            this.isVisible = true;
            this.message = message;

        }
    },

    template: `<div v-if="isVisible">
                <h3>{{message}}</h3>
              </div>`
})