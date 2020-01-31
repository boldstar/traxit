import axios from 'axios'
import moment from 'moment';
import router from '../../routes/router'

export default {
    state: {
        business_list: []
    },
    getters: {
        businessList(state) {
            return state.business_list;
        },
    },
    mutations: {
        BUSINESS_LIST(state, list) {
            state.business_list = list
        }
    },
    actions: {
        retrieveBusinessList(context) {
            axios.get('/businesses')
            .then(response => {
                context.commit('BUSINESS_LIST', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}