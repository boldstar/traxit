import axios from 'axios'
import moment from 'moment';
import router from '../../routes/router'

export default {
    state: {
        resetError:'',
        resetSuccess: '',
        passwordAlert: '',
        resetToken: '',
    },
    getters: {
        resetSuccess(state) {
            return state.resetSuccess
        },
        resetError(state) {
            return state.resetError
        },
        passwordAlert(state) {
            return state.passwordAlert
        },
        resetToken(state) {
            return state.resetToken
        },
    },
    mutations: {
        resetSuccess(state, alert) {
            state.resetSuccess = alert
        },
        resetError(state, error) {
            state.resetError = error
        },
        passwordAlert(state, alert) {
            state.passwordAlert = alert
            state.loading = false
        },
        clearResetToken(state) {
            state.resetToken = ''
        },
        resetToken(state, token) {
            state.resetToken = token
        },
    },
    actions: {
        requestReset(context, email) {
            context.commit('startProcessing')
            axios.post('/password/create', {
              email: email
            })
            .then(response => {
              context.commit('stopProcessing')
              context.commit('passwordAlert', response.data)
            })
            .catch(error => {
              context.commit('stopProcessing')
              console.log(error.response.data)
            })
        },
        forgotReset(context, email) {
            context.commit('loading')
            axios.post('/password/create', {
              email: email.email
            })
            .then(response => {
              context.commit('passwordAlert', response.data)
            })
            .catch(error => {
              console.log(error.response.data)
              context.commit('passwordAlert', error.response.data)
            })
        },
        retrieveResetToken(context, token) {
            axios.get('/password/find/' + token)
            .then(response => {
              context.commit('resetToken', response.data)
            })
            .catch(error => {
              console.log(error.response.data)
            })
        },
        updatePassword(context, data) {
            context.commit('clearAlert')
            context.commit('loading')
            axios.post('/password/reset', {
              email: data.email,
              password: data.password,
              password_confirmation: data.password_confirmation,
              token: data.token
            })
            .then(response => {
              context.commit('resetSuccess', response.data)
              context.commit('loading')
            })
            .catch(error => {
              context.commit('loading')
              context.commit('resetError', error.response.data)
            })
        },
    }
}