import axios from 'axios'
import moment from 'moment';
import router from '../../routes/router'

export default {
    state: {
        business_list: [],
        business_engagements: [],
        business_details: null,
        businesses: [],
        business: {
            business_name: '',
            address: '',
            city: '',
            state: '',
            postal_code: '',
            email: '',
            phone_number: '',
            fax_number: ''
        },
    },
    getters: {
        business(state) {
            return state.business
        },
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
        },
        getBusiness(state, business) {
            if(business) {
                state.business = business
            } else state.business = {
                business_name: '',
                address: '',
                city: '',
                state: '',
                postal_code: '',
                email: '',
                phone_number: '',
                fax_number: ''
            }
        },
        addNewBusiness(state, business) {
            state.client.businesses.push(business);
        },
        deleteBusiness(state, id) {
            const index = state.client.businesses.findIndex(business => business.id == id)
            state.client.businesses.splice(index, 1)
        },
        updateBusiness(state, business) {
            if(state.client) {
                const index = state.client.businesses.findIndex(item => item.id == business.id)
                state.client.businesses.splice(index, 1, business)
            } else if(state.business) {
                state.business = business
            }
        },
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
        },
        getBusiness({commit}, id) {
            axios.get('/businesses/'+ id)
            .then(response => {
                commit('getBusiness', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        addBusiness(context, business) {
            context.commit('startProcessing')
            axios.post(('/businesses'), business)
            .then(response => {
                context.commit('stopProcessing')
                context.commit('successAlert', response.data.message)
                if(localStorage.getItem('rubex_access_tokens')) {
                    context.dispatch('showRubexIntegrationModal', response.data)
                }
            })
            .catch(error => {
                console.log(error.response.data)
                context.commit('stopProcessing')
                context.commit('errorMsgAlert', error.response.data.message)
            })
        },
        updateBusiness(context, business) {
            axios.patch(('/businesses/' + business.id ), {
                client_id: business.client_id,
                business_name: business.business_name,
                address: business.address,
                city: business.city,
                state: business.state,
                postal_code: business.postal_code,
                email: business.email,
                phone_number: business.phone_number,
                fax_number: business.fax_number
            })
            .then(response => {
                context.commit('updateBusiness', response.data)
                router.push('/contact/' + business.client_id + '/account')
            })
            .catch(error => {
                console.log(error)
                context.commit('errorMsgAlert', error.response.data.message)
            })
        },
        deleteBusiness(context, id) {
            context.commit('startProcessing')
            axios.delete('/businesses/' + id)
            .then(response => {
                context.commit('deleteBusiness', id)
                context.commit('successAlert', response.data)
                context.commit('stopProcessing')
            })
            .catch(error => {
                context.commit('stopProcessing')
                console.log(error)
            })
        },
    }
}