import axios from 'axios'
import store from '../../store/store'
export default {
    state: {
        call_list: null,
        call_list_item: null
    },
    getters: {
        callList(state) {
            return state.call_list
        },
        callListItem(state) {
            return state.call_list_item
        }
    },
    mutations: {
        CALL_LIST(state, data) {
            state.call_list = data
        },
        CALL_LIST_ITEM(state, data) {
            state.call_list_item = data
        },
        UPDATE_CALL_LIST(state, data) {
            const index = state.call_list.findIndex(s => s.id === data.id)
            state.call_list.splice(index, 1, data)
        },
        UPDATE_CALL_LIST_ITEM(state, data) {
            state.call_list_item = data
        },
        DELETE_CALL_LIST_ITEM(state, id) {
            state.call_list_item = null
            if(state.call_list) {
                const index = state.call_list.findIndex(c => c.id === id)
                state.call_list.splice(index, 1)
            }
        },
        REMOVE_FROM_CALL_LIST(state, data) {
            state.call_list_item = data
            if(state.call_list) {       
                const index = state.call_list.findIndex(c => c.id === data.id)
                state.call_list.splice(index, 1)
            }
        }
    },
    actions: {
        getCallList(context) {
            return new Promise((resolve, reject) => {
                axios.get('call-list')
                .then(res => {
                    context.commit('CALL_LIST', res.data)
                    resolve(res)
                }).catch(err => {
                    console.log(err.response.data)
                    reject(err)
                })
            })
        },
        getCallListItem(context, id) {
            return new Promise((resolve,reject) => {
                axios.get('call-list-item/' + id)
                .then(res => {
                    context.commit('CALL_LIST_ITEM', res.data)
                    resolve(res)
                }).catch(err => {
                    console.log(err.response.data)
                    reject(err)
                })
            })
        },
        addToCallList(context, data) {
            context.commit('startProcessing')
            return new Promise((resolve, reject) => {
                axios.post('call-list', data)
                .then(res => {
                    context.commit('UPDATE_CALL_LIST_ITEM', res.data)
                    context.commit('successAlert', 'Call List Item Added')
                    context.commit('stopProcessing')
                    resolve(res)
                }).catch(err => {
                    context.commit('stopProcessing')
                    console.log(err.response.data)
                    reject(err)
                })
            })
        },
        updateCallListItem(context, data) {
            context.commit('startProcessing')
            return new Promise((resolve, reject) => {
                axios.post('call-list-update-item', data)
                .then(res => {
                    context.commit('UPDATE_CALL_LIST_ITEM', res.data)
                    context.commit('UPDATE_CALL_LIST', res.data)
                    context.commit('successAlert', 'Call List Item Updated')
                    context.commit('stopProcessing')
                    resolve(res)
                }).catch(err => {
                    context.commit('stopProcessing')
                    console.log(err.response.data)
                    reject(err)
                })
            })
        },
        updateLastCalled(context, data) {
            context.commit('startProcessing')
            return new Promise((resolve, reject) => {
                axios.post('call-list-item', data)
                .then(res => {
                    context.commit('UPDATE_CALL_LIST_ITEM', res.data)
                    context.commit('UPDATE_CALL_LIST', res.data)
                    context.commit('successAlert', 'Call List Item Updated')
                    context.commit('stopProcessing')
                    resolve(res)
                }).catch(err => {
                    context.commit('stopProcessing')
                    console.log(err.response.data)
                    reject(err)
                })
            })
        },
        removeFromCallList(context, id) {
            context.commit('startProcessing')
            return new Promise((resolve, reject) => {
                axios.post('remove-from-call-list', {id: id})
                .then(res => {
                    context.commit('REMOVE_FROM_CALL_LIST', res.data)
                    context.commit('successAlert', 'Call List Item Archived')
                    context.commit('stopProcessing')
                    resolve(res)
                }).catch(err => {
                    context.commit('stopProcessing')
                    console.log(err.response.data)
                    reject(err)
                })
            })
        },
        deleteCallListItem(context, id) {
            context.commit('startProcessing')
            return new Promise((resolve, reject) => {
                axios.delete('call-list/' + id)
                .then(res => {
                    context.commit('DELETE_CALL_LIST_ITEM', id)
                    store.commit('toggleDeleteModal', null)
                    context.commit('successAlert', 'Call History Deleted')
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