import axios from 'axios'
import moment from 'moment';
import {encodeUrl} from '../../plugins/helpers'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('rubex_access_token')

export default {
    state: {
        rubex_access_token: localStorage.getItem('rubex_access_token') || null,
        rubex_refresh_token: localStorage.getItem('rubex_refresh_token') || null,
    },
    getters: {

    },
    mutations: {

    },
    actions: {
      // POST
      // Retrives token from rubex
      requestRubexToken({commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          const url = 'https://rubex.efilecabinet.net/token'
          axios({
            method: 'post',
            url: url,
            withCredentials: true,
            data: encodeUrl(params),
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'Basic ' + btoa('1046:517ECA92-17B7-4311-882C-00C630223F4A')
          }
          }).then(res => {
            localStorage.setItem('rubex_access_tokens', JSON.stringify(res.data))
            resolve(res)
          }).catch(err => {
            console.log(err.response)
            reject(err)
          })
        })
      },
    }
}