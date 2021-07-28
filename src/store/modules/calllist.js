import axios from 'axios'

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
        }
    },
    actions: {
        getCallList(context) {
            return new Promise((resolve, reject) => {
                axios.get('call-list')
                .then(res => {
                    console.log(res.data)
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
        }
    }
}