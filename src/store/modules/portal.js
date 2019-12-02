import axios from 'axios'
import moment from 'moment';
import router from '../../router'

export default {
    state: {
        portal_modal: false,
        invite_status: false
    },
    getters: {
        portalModal(state) {
            return state.portal_modal
        },
        inviteStatus(state) {
            return state.invite_status
        }
    },
    mutations: {
        portal_modal(state) {
            state.portal_modal = !state.portal_modal
        },
        invite_status(state, status) {
            if(status.length > 0) {
                state.invite_status = true
            } else {
                state.invite_status = false
            }
        }
    },
    actions: {
        checkInvitations(context, id) {
            axios.get('/invite-status/'+id)
            .then(response => {
                context.commit('invite_status', response.data)
            }).catch(error => {
                console.log(error.response.data)
            })
        },
        inviteContact(context, data) {
            context.commit('startProcessing')
            axios.post('/guest-invite', data)
            .then(response => {
                context.commit('stopProcessing')
                context.commit('portal_modal')
            }).catch(error => {
                context.commit('stopProcessing')
                console.log(error.response.data)
            })
        }
    }
}