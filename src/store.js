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
        category: client.category,
        referral_type: client.referral_type,
        first_name: client.first_name,
        middle_initial: client.middle_initial,
        last_name: client.last_name,
        occupation: client.occupation,
        dob: client.dob,
        email: client.email,
        cell_phone: client.cell_phone,
        work_phone: client.work_phone,
        spouse_first_name: client.spouse_first_name,
        spouse_middle_initial: client.spouse_middle_initial,
        spouse_last_name: client.spouse_last_name,
        spouse_occupation: client.spouse_occupation,
        spouse_dob: client.spouse_dob,
        spouse_email: client.spouse_email,
        spouse_cell_phone: client.spouse_cell_phone,
        spouse_work_phone: client.spouse_work_phone,
        street_address: client.street_address,
        city: client.city,
        state: client.state,
        postal_code: client.postal_code,
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
      axios.post('http://traxit.test/api/clients', {
        id: client.id,
        category: client.category,
        referral_type: client.referral_type,
        first_name: client.first_name,
        middle_initial: client.middle_initial,
        last_name: client.last_name,
        occupation: client.occupation,
        dob: client.dob,
        email: client.email,
        cell_phone: client.cell_phone,
        work_phone: client.work_phone,
        spouse_first_name: client.spouse_first_name,
        spouse_middle_initial: client.spouse_middle_initial,
        spouse_last_name: client.spouse_last_name,
        spouse_occupation: client.spouse_occupation,
        spouse_dob: client.spouse_dob,
        spouse_email: client.spouse_email,
        spouse_cell_phone: client.spouse_cell_phone,
        spouse_work_phone: client.spouse_work_phone,
        street_address: client.street_address,
        city: client.city,
        state: client.state,
        postal_code: client.postal_code,
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

