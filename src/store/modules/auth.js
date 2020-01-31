import axios from 'axios'
import moment from 'moment';
import router from '../../routes/router'
import {destroySession} from '../../plugins/session'
import {startSession} from '../../plugins/session'

if(localStorage.getItem('fqdn_api_url')!= null) {
    axios.defaults.baseURL = 'http://' + localStorage.getItem('fqdn_api_url') + '/api'
}else {
axios.defaults.baseURL = 'http://traxit.test/api'
}
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

export default {
    state: {
        rules: '',
        token: localStorage.getItem('access_token') || null,
        role: localStorage.getItem('role')
    },
    getters: {
        loggedIn(state) {
            return state.token != null || undefined;
          },
          role(state) {
            return state.role
          }
    },
    mutations: {
        createSession(state, session) {
            state.rules = session[0]
            state.token = session.access_token
          },
          destroySession(state) {
            state.rules = ''
          },
          destroyToken(state) {
            state.token = null
            state.expiresIn = null
          },
          clearAlert(state) {
            state.alert = ''
            state.resetError = ''
            state.resetSuccess = ''
            state.successAlert = ''
            state.errorAlert = ''
          },
          errorAlert(state, alert) {
            state.errorAlert = alert
          },
    },
    actions: {
        destroyToken(context) {
            if (context.getters.loggedIn) {
              return new Promise((resolve, reject) => {
                axios.post('/logout')
                .then(response => {
                  destroySession()
                  context.commit('destroyToken')
                  context.commit('destroySession')
                  context.commit('clearTour')
                  router.push('/login')
                  resolve(response)
                })
                .catch(error => {
                  destroySession()
                  context.commit('destroyToken')
                  router.push('/login')
                  reject(error)
                })
              })
            }
          },
          retrieveToken({ commit }, credentials) {
      
            return new Promise((resolve, reject) => {
                axios.post('/login', {
                    username: credentials.username,
                    password: credentials.password,
                    fqdn: localStorage.getItem('fqdn_api_url')
                })
                .then(response => {
                  commit('clearAlert')
                  // start session sets a couple of the local storage items and make sure that the response contains the proper data
                  if(startSession(response)) {
                      setTimeout(() => {
                        commit('createSession', response.data.rules);
                        localStorage.setItem('rules', JSON.stringify(response.data.rules[0]))
                        localStorage.setItem('access_token', response.data.rules.access_token);
                        router.push('/')
                      }, 2000)
                    }
                  resolve(response)
                })
                .catch(error => {
                  console.log(error.response.data)
                  commit('errorAlert', error.response.data)
                  reject(error)
                })
            })
          },
    },
}