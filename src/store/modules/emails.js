import axios from 'axios'
import moment from 'moment';
import router from '../../routes/router'

export default {
    state: {
        templates: '',
    },
    getters: {
        templates(state) {
            return state.templates
        },
    },
    mutations: {
        emailTemplates(state, templates) {
            state.templates = templates
        },
    },
    actions: {
        getTemplates(context) {
            axios.get('/templates')
            .then(response => {
              context.commit('emailTemplates', response.data)
            })
            .catch(error => {
              console.log(error.response.data)
            })
        },
        sendTestMail(context, id) {
            context.commit('startProcessing')
            axios.post('/send-test-mail', {
              id: id
            })
            .then(response => {
              context.commit('stopProcessing')
              context.commit('successAlert', response.data)
            })
            .catch(error => {
              context.commit('stopProcessing')
              context.commit('successAlert', error.response.data)
              console.log(error.response.data)
            })
        },
    }
}