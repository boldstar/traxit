import axios from 'axios'
import router from '../routes/router'
import store from '../store/store'
import {destroySession} from './session'

axios.interceptors.response.use((response) => {return response},(error) => {
    return Promise.reject(error)
    if(error.response.status === 401) {
        destroySession()
        router.push('/login')
        store.commit('sessionEndedMsg', 'Your session has ended, please log back in!')
    }
    return Promise.reject(error)
});