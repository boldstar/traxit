import axios from 'axios'
import moment from 'moment';
import router from '../../routes/router'

export default {
    state: {
        portal_modal: false,
        portal_modal_remove_contact: false,
        invite_status: false,
        portal_upload: false,
        portal_files: null,
        file_options: false,
        portal_file: null,
        portal_upload_error_msg: null
    },
    getters: {
        portalModal(state) {
            return state.portal_modal
        },
        portalModalRemoveContact(state) {
            return state.portal_modal_remove_contact
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
        },
        portalUploadErrorMsg(state) {
            return state.portal_upload_error_msg
        }
    },
    mutations: {
        portal_modal(state) {
            state.portal_modal = !state.portal_modal
        },
        portal_modal_remove_contact(state) {
            state.portal_modal_remove_contact = !state.portal_modal_remove_contact
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
        },
        delete_portal_file(state, id) {
            const index = state.portal_files.findIndex(file =>  file.id === id)
            state.portal_files.splice(index, 1)
        },
        update_portal_file(state, file) {
            const index = state.portal_files.findIndex(item => item.id === file.id)
            state.portal_files.splice(index, 1, file)
        },
        remove_portal(state, portal) {

        },
        portal_upload_error_msg(state, msg) {
            state.portal_upload_error_msg = msg
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
                context.commit('successAlert', 'Invitations Sent')
            }).catch(error => {
                context.commit('stopProcessing')
                context.commit('errorMsgAlert', 'Oops, something went wrong')
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
            formData.append('tax_year', data.options.tax_year)
            axios.post('/portal-upload', formData, {headers: {
                'Content-Type': 'multipart/form-data'
            }}).then(response => {
                context.commit('stopProcessing')
                context.commit('portal_upload')
                context.commit('update_files', response.data.documents)
                context.commit('successAlert', response.data.message)
            }).catch(error => {
                console.log(error.response.data)
                context.commit('portal_upload_error_msg', error.response.data)
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
            context.commit('portal_file', null)
            axios.get('/portal-file/' +id)
            .then(response => {
                context.commit('portal_file', response.data)
            }).catch(error => {
                console.log(error.response.data)
            })
        },
        updatePortalFile(context, data) {
            context.commit('startProcessing')
            axios.patch('/update-portal-file/'+data.id, data)
            .then(response => {
                console.log(response.data)
                context.commit('stopProcessing')
                context.commit('successAlert', response.data.message)
                context.commit('update_portal_file', response.data.document)
                context.commit('file_options')
            }).catch(error => {
                console.log(error.response.data)
                context.commit('stopProcessing')
                context.commit('file_options')
                context.commit('errorMsgAlert', error.response.data)
            })
        },
        deletePortalFile(context, id) {
            context.commit('startProcessing')
            axios.delete('/portal-file/'+id)
            .then(response => {
                context.commit('stopProcessing')
                context.commit('delete_portal_file', id)
                context.commit('successAlert', response.data)
                context.commit('toggleDeleteModal', null)
            }).catch(error => {
                console.log(error.response.data)
                context.commit('stopProcessing')
                context.commit('errorMsgAlert', error.response.data)
            })
        },
        removePortal(context, id) {
            context.commit('startProcessing')
            axios.delete('/delete-portal-users/' + id)
            .then(response => {
                context.commit('stopProcessing')
                context.commit('remove_portal')
                context.commit('toggleDeleteModal', null)
                context.commit('portal_files', null)
                context.commit('successAlert', 'Portal Removed')
            }).catch(error => {
                context.commit('stopProcessing')
                context.commit('toggleDeleteModal', null)
                context.commit('errorMsgAlert', 'Oops, Something went wrong')
                console.log(error.response.data)
            })
        },
        removeContact(context, contacts) {
            context.commit('startProcessing')
            axios.post('remove-contact', {contacts: contacts})
            .then(response => {
                console.log(response.data)
                context.commit('stopProcessing')
                context.commit('portal_modal_remove_contact')
            }).catch(error => {
                context.commit('stopProcessing')
                console.log(error.response.data)
            })
        }
    }
}