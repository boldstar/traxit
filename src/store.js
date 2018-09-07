import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://client-api.test/api'

export default new Vuex.Store({
  state: {
    clients: [],
    client:[],
    token: localStorage.getItem('access_token') || null,
    sidebarOpen: true,
    loading: false,
  },
  getters: {
    sidebarOpen(state) {
      return state.sidebarOpen
    },
    loggedIn(state) {
      return state.token != null
    },
    allClients(state) {
      return state.clients;
    },
    client(state) {
      return state.client;
    },
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    retrieveClients(state, clients) {
      state.clients = clients
    },
    addClient(state, client) {
      state.clients.push({
        id: client.id,
        name: client.name,
        type: client.type,
        email: client.email,
        phone: client.phone,
        address: client.address,
      })
    },
    deleteClient(state, id) {
      const index = state.clients.findIndex(client => client.id == id);
      state.clients.splice(index, 1);
    },
    getDetails(state, client) {
      state.client = client
    },
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    }
  },
  actions: {
    toggleSidebar({commit, state}) {
      commit('toggleSidebar')
    },
    retrieveName(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token


        return new Promise((resolve, reject) => {
          axios.get('http://traxit.test/api/user')
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        })
    },
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('http://traxit.test/api/register', {
          name: data.name,
          email: data.email,
          password: data.password,
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('http://traxit.test/api/logout')
          .then(response => {
            
            localStorage.removeItem('access_token')
            context.commit('destroyToken')
            resolve(response)
          })
          .catch(error => {
            localStorage.removeItem('access_token')
            context.commit('destroyToken')
            reject(error)
          })
        })
      }
    },
    retrieveToken(context, credentials) {

      return new Promise((resolve, reject) => {
          axios.post('http://traxit.test/api/login', {
              username: credentials.username,
              password: credentials.password,
          })
          .then(response => {
              const token = response.data.access_token

              localStorage.setItem('access_token', token)
              context.commit('retrieveToken', token)
              resolve(response)
          })
          .catch(error => {
              console.log(error)
              reject(error)
          })
      })
    },
    retrieveClients(context) {
      this.loading = true
      axios.get('/clients')
      .then(response => {
        this.loading = false
        context.commit('retrieveClients', response.data)
      })
      .catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    getDetails({commit}, id) {
      axios.get('/clients/'+id)
      .then(response => {
        // console.log(response.data)
        commit('getDetails', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    addClient(context, client) {
      axios.post('/clients', {
        id: client.id,
        name: client.name,
        type: client.type,
        email: client.email,
        phone: client.phone,
        address: client.address,
      })
      .then(response => {
        context.commit('getDetails', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    deleteClient(context, id) {
      axios.delete('/clients/' + id)
      .then(response => {
          context.commit('deleteClient', id)
      })
      .catch(error => {
          console.log(error)
      })                
    },
  }
})

