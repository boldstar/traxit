import axios from 'axios'
import moment from 'moment';
import router from '../../routes/router'

export default {
    state: {
        browserhistory: false,
    },
    getters: {
        browserHistory(state) {
            return state.browserhistory
        }
    },
    mutations: {
        BROWSER_HISTORY(state) {
            state.browserhistory = !state.browserhistory
        }
    },
    actions: {
        toggleBrowserHistory({commit}) {
            commit('BROWSER_HISTORY')
        }
    }
}