import axios from 'axios'
import store from '../store'
import automation_options from '../../plugins/automations'
import {automate} from '../../plugins/automations'

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
       },
       performAutomation(context, data) {
           const options = automation_options.options
           const automations = []
           if(data.automations.length > 0) {
               data.automations.forEach(d => {
                   automations.push({ action_id: d.action_id, data: data})
               });
               automate(automations)
               console.log('automations complete')
           } else {
               console.log('no automation')
           }
       },
       removeFromCallList(context, data) {
           console.log(data)
       },
       notifyAdminsOfStatusChange(context, data) {
           console.log(data)
       }
    }
}