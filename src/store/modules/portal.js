import axios from 'axios'
import moment from 'moment';
import router from '../../router'

export default {
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        inviteContact(context, data) {
            axios.post('/guest-invite', data)
            .then(response => {
                console.log(response.data)
            }).catch(error => {
                console.log(error.response.data)
            })
        }
    }
}