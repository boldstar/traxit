import axios from 'axios'
import store from '../store'
import automation_options from '../../plugins/automations'
import {automate, approveAutomationModal} from '../../plugins/automations'

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
       },
       DELETE_AUTOMATION_ITEM(state, automation) {
            const index = state.automations.findIndex(a => a.id === automation)
            state.automations.splice(index, 1)
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
                   reject(err)
               })
           })
       },
       addAutomation(context, data) {
           context.commit('startProcessing')
           return new Promise((resolve, reject) => {
               axios.post('/automation', data)
               .then(res => {
                   context.commit('ADD_AUTOMATION', res.data)
                   context.commit('successAlert', 'Automation Added')
                   context.commit('stopProcessing')
                   resolve(res)
                }).catch(err => {
                    context.commit('stopProcessing')
                    console.log(err.response.data)
                    reject(err)
                })
            })
        },
        updateAutomation(context, data) {
            context.commit('startProcessing')
            return new Promise((resolve, reject) => {
                axios.patch('/update-automation/' + data.id, data)
                .then(res => {
                    context.commit('UPDATE_AUTOMATIONS', res.data)
                    context.commit('successAlert', 'Automation Updated')
                    context.commit('stopProcessing')
                    resolve(res)
                }).catch(err => {
                    context.commit('stopProcessing')
                    context.commit('errorMsgAlert', 'Automation Already Exists')
                    console.log(err.response.data)
                    reject(err)
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
                    reject(err)
                })
            })
       },
       performAutomation(context, data) {
           context.commit('startProcessing')
           const options = automation_options.options
           const automations = []
           if(data.length > 0) {
               data.forEach(d => {
                   if(d.approved) {
                       automations.push({ action_id: d.action_id, data: data})
                   }
               });
               automate(automations)
           } else {
               console.log('no automation')
           }
       },
       automatedRemoveFromCallList(context, data) {
           return new Promise((resolve, reject) => {
               axios.get('call-list-item/'+ data.id)
               .then(res => {
                    store.dispatch('removeFromCallList', {id: res.data.id, automated: true})
                    resolve(res)
               }).catch(err => {
                    console.log(err.response.data)
                    reject(err)
               })
           })
       },
       automatedNotifyAdminsOfStatusChange(context, data) {
           return new Promise((resolve, reject) => {
               axios.post('notify-admin', data)
               .then(res => {
                   context.commit('successAlert', res.data)
                   context.commit('stopProcessing')
                   resolve(res)
                }).catch(err => {
                   context.commit('stopProcessing')
                   console.log(err.response.data)
                   reject(err)
               })
           })
       },
       deleteAutomation(context, id) {
        context.commit('startProcessing')
        return new Promise((resolve, reject) => {
            axios.delete('automation/' + id)
            .then(res => {
                context.commit('DELETE_AUTOMATION_ITEM', id)
                store.commit('toggleDeleteModal', null)
                context.commit('successAlert', 'Automation Deleted')
                context.commit('stopProcessing')
                resolve(res)
            }).catch(err => {
                console.log(err.response.data)
                context.commit('stopProcessing')
                reject(err)
            })
        })
       }
    }
}