import axios from 'axios'
import moment from 'moment';
import router from '../../router'

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
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      
            if (context.getters.loggedIn) {
              return new Promise((resolve, reject) => {
                axios.post('/logout')
                .then(response => {
                  
                  localStorage.removeItem('access_token')
                  localStorage.removeItem('expires_on')
                  localStorage.removeItem('role')
                  localStorage.removeItem('rules')
                  context.commit('destroyToken')
                  context.commit('destroySession')
                  router.push('/login')
                  resolve(response)
                })
                .catch(error => {
                  localStorage.removeItem('access_token')
                  localStorage.removeItem('expires_on')
                  localStorage.removeItem('role')
                  localStorage.removeItem('rules')
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
                  const token = response.data.rules.access_token
                  const fqdn = response.data.fqdn
                  const role = response.data.role[0][0].name
                  if(token != null || token != undefined && fqdn != null || fqdn != undefined) {
                    localStorage.removeItem('fqdn_api_url')
                    const date = new Date(moment().add(1, 'day').toDate());
                    localStorage.setItem('fqdn_api_url', fqdn)
                    localStorage.setItem('expires_on', date);
                    localStorage.setItem('role', role)
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                    axios.defaults.baseURL = 'http://' + response.data.fqdn + '/api'
                    setTimeout(() => {
                      commit('createSession', response.data.rules);
                      localStorage.setItem('rules', JSON.stringify(response.data.rules[0]))
                      localStorage.setItem('access_token', token);
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