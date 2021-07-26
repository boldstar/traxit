import axios from 'axios'
import store from '../store'

export default {
    state: {
        automations: null
    },
    getters: {
        automations(state) {
            return state.automations
        }
    },
    mutations: {
       AUTOMATIONS(state, automations) {
           state.automations = automations
       },
       ADD_AUTOMATION(state, automation) {
            state.automations.findIndex(a => a.id === automation.id) === -1 
            ? state.automations.push(automation) && store.commit('successAlert', 'Automation added')
            : store.commit('successAlert', 'This automation already exists') 
       },
       UPDATE_AUTOMATIONS(state, automation) {
           const index = state.automations.findIndex(a => a.id === automation.id)
           state.automations.splice(index, 1, automation)
       }
    },
    actions: {
       getAutomations(context) {
           return new Promise((resolve, reject) => {
               axios.get('/automations')
               .then(res => {
                   context.commit('AUTOMATIONS', res.data)
                   resolve(res)
               }).catch(err => {
                   console.log(err.response.data)
                   reject(error)
               })
           })
       },
       addAutomation(context, data) {
           return new Promise((resolve, reject) => {
               axios.post('/automation', data)
               .then(res => {
                    context.commit('ADD_AUTOMATION', res.data)
                    resolve(res)
                }).catch(err => {
                    console.log(err.response.data)
                    reject(error)
                })
            })
        },
        switchAutomationState(context, id) {
            return new Promise((resolve, reject) => {
                axios.patch('/automation-state/' + id)
                .then(res => {
                    context.commit('UPDATE_AUTOMATIONS', res.data)
                    context.commit('successAlert', 'Automation Updated')
                    resolve(res)
                }).catch(err => {
                    console.log(err.response.data)
                    reject(error)
                })
            })
       }
    }
}