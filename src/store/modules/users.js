import axios from 'axios'
import router from '../../router'

export default {
    state: {
        users: [],
        userProfile: '',
        user: {
            name: '',
            email: '',
            password: '',
            role: ''
        },
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
            state.user = user
            if(user) {
                state.user = user
                state.user.role = user.roles[0].name
            } else state.user = {
                name: '',
                email: '',
                password: '',
                role: ''
            }
        },
        userProfile(state, user) {
            state.user = user[0]
        }
    },
    actions: {
        retrieveUser(context) {
            axios.get('/userProfile')
            .then(response => {
              context.commit('userProfile', response.data)
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
              context.commit('userDetails', response.data[0])
            })
            .catch(error => {
              console.log(error.response.data)
            })
        },
        updateUser(context, data) {
            context.commit('startProcessing')
            axios.patch('/users/' +data.id, {
                name: data.name,
                email: data.email,
                role: data.role
            })
            .then(response => {
                context.commit('stopProcessing')
                context.commit('updateUser', response.data)
                router.push('/administrator/team')
            })
            .catch(error => {
                context.commit('stopProcessing')
                console.log(error.response.data)
            })
        },
        addUser(context, user) {
              context.commit('startProcessing')
              axios.post('/register', user)
              .then(response => {
                context.commit('stopProcessing')
                context.commit('addUser', response.data)
                router.push('/administrator/team')
            })
            .catch(error => {
                context.commit('stopProcessing')
                console.log(error.response.data)
              })
        },
        deleteUser(context, id) {
            axios.delete('/users/'+ id)
            .then(response => {
              context.commit('successAlert', response.data)
              context.commit('deleteUser', id)
            })
            .catch(error => {
              context.commit('successAlert', error.response.data)
              console.log(error.response.data)
            })
        },
    }
}