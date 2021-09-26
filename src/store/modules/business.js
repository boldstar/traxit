import axios from 'axios'
import moment from 'moment';
import router from '../../routes/router'
import store from '../store';

export default {
    state: {
        business_list: [],
        business_engagements: [],
        business_details: null,
        businesses: [],
        business_services: null,
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
        },
        businessServices(state) {
            return state.business_servcies
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
        UPDATE_BUSINESS_SERVICE(state, data) {
            state.business_details.services = data
        },
        BUSINESS_SERVICES(state, data) {
            state.business_servcies = data
        },
        UPDATE_BUSINESS_NOTES(state, data) {
            state.business_details.notes = data
        },
        DELETE_BUSINESS_NOTE(state, id) {
            const index = state.business_details.notes.findIndex(n => n.id === id)
            state.business_details.notes.splice(index, 1)
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
            axios.patch(('/businesses/' + business.id ), business)
            .then(response => {
                context.commit('updateBusiness', response.data)
                router.push('/business/' + business.id + '/details')
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
        updateBusinessServices(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/update-business-services', data)
                .then(res => {
                    context.commit('successAlert', 'Business Service Updated')
                    context.commit('UPDATE_BUSINESS_SERVICE', res.data)
                    resolve(res)
                }).catch(err => {
                    console.log(err.response.data)
                    reject(err)
                })
            })
        },
        getBusinessServices(context, id) {
            return new Promise((resolve, reject) => {
                axios.get('/business-services/' + id)
                .then(res => {
                    context.commit('BUSINESS_SERVICES', res.data)
                    resolve(res)
                }).catch(err => {
                    console.log(err.response.data)
                    reject(err)
                })
            })
        },
        updateBusinessNotes(context, note) {
            return new Promise((resolve, reject) => {
                axios.post('business-note', note)
                .then(res => {
                    context.commit('successAlert', 'Business Notes Updated')
                    context.commit('UPDATE_BUSINESS_NOTES', res.data)
                    router.push('/business/' + note.business_id + '/notes')
                    resolve(res)
                }).catch(err => {
                    console.log(err.response.data)
                    reject(err)
                })
            })
        },
        deleteBusinessNote(context, id) {
            return new Promise((resolve, reject) => {
                axios.delete('business-note/' + id)
                .then(res => {
                    context.commit('DELETE_BUSINESS_NOTE', id)
                    context.commit('successAlert', res.data)
                    resolve(res)
                }).catch(err => {
                    console.log(err.response.data)
                    reject(err)
                })
            })
        }
    }
}