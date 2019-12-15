import axios from 'axios'
import moment from 'moment';
import router from '../../router'

export default {
    state: {
        portal_modal: false,
        invite_status: false,
        portal_upload: false,
        portal_files: null,
        file_options: false,
        portal_file: null
    },
    getters: {
        portalModal(state) {
            return state.portal_modal
        },
        portalUpload(state) {
            return state.portal_upload
        },
        inviteStatus(state) {
            return state.invite_status
        },
        portalFiles(state) {
            return state.portal_files
        },
        fileOptions(state) {
            return state.file_options
        },
        portalFile(state) {
            return state.portal_file
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
        },
        portal_upload(state) {
            state.portal_upload = !state.portal_upload
        },
        portal_files(state, files) {
            state.portal_files = files
        },
        update_files(state, files) {
            state.portal_files = files
        },
        file_options(state) {
            state.file_options = !state.file_options
        },
        portal_file(state, blob) {
            state.portal_file = blob
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
        },
        uploadDocument(context, data) {
            context.commit('startProcessing')
            let formData = new FormData();
            for( var i = 0; i < data.files.length; i++ ){
                let file = data.files[i];
                formData.append('files[' + i + ']', file);
            } 
            formData.append('account', data.options.account)
            formData.append('client_id', data.options.client_id)
            formData.append('payment_required', data.options.payment_required)
            formData.append('signature_required', data.options.signature_required)
            formData.append('downloadable', data.options.downloadable)
            formData.append('message', data.options.message)
            axios.post('/portal-upload', formData, {headers: {
                'Content-Type': 'multipart/form-data'
            }}).then(response => {
                context.commit('stopProcessing')
                context.commit('portal_upload')
                context.commit('update_files', response.data.documents)
                context.commit('successAlert', response.data.message)
            }).catch(error => {
                console.log(error.response.data)
                context.commit('stopProcessing')
            })
        },
        getPortalFiles(context, id) {
            axios.get('/portal-files/'+ id)
            .then(response => {
                context.commit('portal_files', response.data)
            }).catch(error => {
                console.log(error.response.data)
            })
        },
        getPortalFile(context, id) {
            axios.get('/portal-file/' +id,  {responseType: 'blob'})
            .then(response => {
                context.commit('portal_file', response.data)
            }).catch(error => {
                console.log(error.response.data)
            })
        }
    }
}