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
        getCategoryOptions(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/customizations', data)
                .then(response => {
                    context.commit('updateCategoryList', response.data)
                    resolve(response)
                }).catch(error => {
                    console.log(error)
                    reject(error)
                })
            })
        },
        saveCategoryOption(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/customization', data)
                .then(response => {
                    context.commit('updateCategoryList', response.data)
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                    console.log(error)
                })
            })
        },
        deleteCategoryOptions(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/customizations-delete', {list: data})
                .then(response => {
                    context.commit('updateCategoryList', response.data)
                    resolve(response)
                }).catch(error => {
                    console.log(error)
                    reject(error)
                })
            })
        }
    }
}