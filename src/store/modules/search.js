import axios from 'axios'
import moment from 'moment';
import router from '../../router'

export default {
    state: {
        result: '',
    },
    getters: {
        searchResults(state) {
            return state.result
          },
    },
    mutations: {
        searchDatabase(state, keyword) {
            state.result = keyword;
          },
    },
    actions: {
        searchDatabase(context, data) {
            context.commit('startProcessing')
            axios.post('/search', {
              keyword: data.keyword,
              category: data.category
            }).then(response => {
              context.commit('searchDatabase', response.data)
              context.commit('stopProcessing')
            }).catch(error => {
              context.commit('stopProcessing')
              console.log(error)
            })
        },
    }
}