import axios from 'axios'
import moment from 'moment';
import router from '../../router'

export default {
    state: {
        users: [],
        user: '',
    },
    getters: {
        user(state) {
            return state.user
        },
        users(state) {
            return state.users;
        },
    },
    mutations: {
        addUser(state, user) {
            state.users.push(user)
          },
        updateUser(state, user) {
            const index = state.users.findIndex(item => item.id == user.id);
            state.users.splice(index, 1, user);
        },
        deleteUser(state, id) {
            const index = state.users.findIndex(user => user.id == id)
            state.users.splice(index, 1)
        },
        retrieveUsers(state, users) {
            state.users = users
        },
        userDetails(state, user) {
            state.user = user[0]
        },
    },
    actions: {
        retrieveUser(context) {
            axios.get('/userProfile')
            .then(response => {
              context.commit('userDetails', response.data)
            })
            .catch(error => {
              console.log(error.response.data)
            })
        },
        retrieveUsers(context) {
            axios.get('/users')
            .then(response => {
              context.commit('retrieveUsers', response.data)
            })
            .catch(error => {
              console.log(error)
            })
        },
        retrieveUserToUpdate(context, id) {
            axios.get('/userToUpdate/' + id)
            .then(response => {
              context.commit('userDetails', response.data)
            })
            .catch(error => {
              console.log(error.response.data)
            })
        },
        updateUser(context, data) {
            axios.patch('/users/' +data.id, {
              name: data.name,
              email: data.email,
              role: data.role
            })
            .then(response => {
              context.commit('updateUser', response.data)
            })
            .catch(error => {
              console.log(error.response.data)
            })
        },
        addUser(context, data) {
              axios.post('/register', {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role
              })
              .then(response => {
                context.commit('addUser', response.data)
              })
              .catch(error => {
                console.log(error.response.data)
              })
        },
        deleteUser(context, user) {
            axios.delete('/users/'+ user.id)
            .then(response => {
              context.commit('successAlert', response.data)
              context.commit('deleteUser', user.id)
            })
            .catch(error => {
              context.commit('successAlert', error.response.data)
              console.log(error.response.data)
            })
        },
    }
}