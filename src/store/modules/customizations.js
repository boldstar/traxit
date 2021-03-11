import axios from 'axios'

export default {
    state: {
        categories: null
    },
    getters: {
        categoryList(state) {
          return state.categories
        },
    },
    mutations: {
        updateCategoryList(state, data) {
          state.categories = data
        },
    },
    actions: {
        getCategoryOptions(context) {
            return new Promise((resolve, reject) => {
                axios.get('/customizations')
                .then(response => {
                    context.commit('updateCategoryList', response.data)
                    resolve(response)
                }).catch(error => {
                    console.log(response.data.error)
                    error(error)
                })
            })
        },
        saveCategoryOption(context) {
            axios.post('/customization')
            .then(response => {
                context.commit('updateCategoryList', response.data)
            })
            .catch(error => {
              console.log(error.response.data)
            })
        },
    }
}