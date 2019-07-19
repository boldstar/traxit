import axios from 'axios'
import moment from 'moment';
import router from '../../router'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('tsheets_access_token')

export default {
    state: {
       tsheets_user: null,
       current_tsheet: null,
       total_tsheets: null
    },
    getters: {
      tsheets_user(state) {
        return state.tsheets_user
      },
      current_tsheet(state) {
        return state.current_tsheet
      },
      total_tsheets(state) {
        return state.total_tsheets
      }
    },
    mutations: {
        TSHEETS_USER(state, user) {
          state.tsheets_user = user
        },
        CURRENT_TIMESHEET(state, tsheet) {
          state.current_tsheet = tsheet
        },
        TOTAL_TIMESHEETS(state, total) {
          state.total_tsheets = total
        }
    },
    actions: {
      requestTsheetsToken(context) {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://rest.tsheets.com/api/v1/grant'
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'S.9__a3309368c6e004fd4fa3a01a333bf6eb5719a091'
        axios({
          method: 'post',
          url: proxy+url,
          data: {
            'grant_type': "authorization_code",
            'client_id': "7334d612a8cc42fe9b699f79e1f562e5",
            'client_secret': "45d60ca0fcee4cba901eadbfef5b46d8",
            'code': sessionStorage.getItem('code'),
            'redirect_uri': "http://localhost:8082"
          }
        }).then(res => {
          sessionStorage.tsheets_access_token = res.data.access_token
          sessionStorage.tsheets_refresh_token = res.data.refresh_token
          sessionStorage.tsheets_expires_in = res.data.expires_in
          sessionStorage.tsheets_company_id = res.data.company_id
          sessionStorage.tsheets_client_url = res.data.client_url
          sessionStorage.tsheets_user_id = res.data.user_id
          router.replace({'query': null})
        }).catch(err => {
          console.log(err.response)
        })
      },
      requestCurrentUser(context) {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://rest.tsheets.com/api/v1/current_user'
        axios.get(proxy+url).then(res => {
          context.commit('TSHEETS_USER', res.data)
        }).catch(err => {
          console.log(err.response)
        })
      },
      requestTimesheet(context) {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://rest.tsheets.com/api/v1/timesheets'
        axios({
          url: proxy+url,
          method: 'get',
          params: {
            'user_ids': sessionStorage.tsheets_user_id,
            'start_date': new Date().toJSON().slice(0,10),
            'on_the_clock': true
          }
        }).then(res => {
          context.commit('CURRENT_TIMESHEET', res.data)
          sessionStorage.tsheets_tsheet_id = Object.keys(res.data.results.timesheets)[0]
        }).catch(err => {
          console.log(err.response)
        })
      },
      requestTimesheetTotal(context) {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://rest.tsheets.com/api/v1/timesheets'
        axios({
          url: proxy+url,
          method: 'get',
          params: {
            'user_ids': sessionStorage.tsheets_user_id,
            'start_date': new Date().toJSON().slice(0,10)
          }
        }).then(res => {
          context.commit('TOTAL_TIMESHEETS', res.data)
        }).catch(err => {
          console.log(err.response)
        })
      },
    }
}