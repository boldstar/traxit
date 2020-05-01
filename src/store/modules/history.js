import axios from 'axios'

export default {
    state: {
        history: null
    },
    getters: {
        userHistory(state) {
            return state.history
        }
    },
    mutations: {
        HISTORY(state, data) {
            state.history = data
        }
    },
    actions: {
       getUserHistory(context, id) {
           return new Promise((resolve, reject) => {
               axios.get('/user-history/'+id)
               .then(response => {
                   context.commit('HISTORY', response.data)
                   resolve(response)
               }).catch(error => {
                   console.log(error.response.data)
                   reject(error)
               })
           })
       }
    }
}