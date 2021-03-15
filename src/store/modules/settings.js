import axios from 'axios'

export default {
    state: {
        settings: null
    },
    getters: {
        settingsList(state) {
          return state.settings
        },
    },
    mutations: {
        updateSettingsList(state, data) {
          state.settings = data
        },
    },
    actions: {
        getSettings(context) {
            return new Promise((resolve, reject) => {
                axios.get('/settings')
                .then(response => {
                    context.commit('updateSettingsList', response.data)
                    resolve(response)
                }).catch(error => {
                    console.log(error)
                    reject(error)
                })
            })
        },
        updateSetting(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/setting', data)
                .then(response => {
                    context.commit('updateSettingsList', response.data)
                    resolve(response)
                }).catch(error => {
                    console.log(error)
                    reject(error)
                })
            })
        },
    }
}