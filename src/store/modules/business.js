import axios from 'axios'
import moment from 'moment';
import router from '../../routes/router'

export default {
    state: {
        business_list: [],
        business_engagements: [],
        business_details: null
    },
    getters: {
        businessList(state) {
            return state.business_list;
        },
        businessDetails(state) {
            return state.business_details
        },
        businessEngagements(state) {
            return state.business_engagements
        }
    },
    mutations: {
        BUSINESS_LIST(state, list) {
            state.business_list = list
        },
        BUSINESS_DETAILS(state, details) {
            state.business_details = details
        },
        BUSINESS_ENGAGEMENTS(state, engagements) {
            state.business_engagements = engagements
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
        },
        getBusinessDetails(context, id) {
            axios.get('/businesses/' + id)
            .then(response => {
                context.commit('BUSINESS_DETAILS', response.data)
            }).catch(error => {
                console.log(error.response.data)
            })
        },
        getBusinessEngagements(context, id) {
            axios.get('/business-engagements/' + id)
            .then(response => {
                context.commit('BUSINESS_ENGAGEMENTS', response.data)
            }).catch(error => {
                console.log(error.response.data)
            })
        }
    }
}