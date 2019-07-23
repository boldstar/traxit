import axios from 'axios'
import moment from 'moment';
import router from '../../router'
import {notLastItem, getMonday} from '../../plugins/tsheets'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tsheets_access_token')

export default {
    state: {
       tsheets_user: null,
       current_tsheet: null,
       total_tsheets: null,
       weeks_tsheets: null,
       data_received: false,
       customFields: null,
       customFieldsLength: 0,
       customFieldsReceived: false,
       getItemPage: 1,
       getPage: 1,
       allPagesDone: false,
       itemIndex: 0,
       field_items: [],
       job_codes: [],
       job_codes_received: false,
       switch: false,
       tsheet_id: localStorage.getItem('tsheets_tsheet_id') || 'undefined',
       tsheet_alert: null
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
      },
      weeks_tsheets(state) {
        return state.weeks_tsheets
      },
      data_received(state) {
        return state.data_received
      },
      tsheets_access(state) {
        return localStorage.getItem('tsheets_access_token')
      },
      custom_fields(state) {
        return state.customFields
      },
      custom_field_items(state) {
        return state.field_items
      },
      custom_fields_received(state) {
        return state.customFieldsReceived
      },
      job_codes(state) {
        return state.job_codes
      },
      job_codes_received(state) {
        return state.job_codes_received
      },
      tsheet_id(state) {
        return state.tsheet_id
      },
      tsheet_alert(state) {
        return state.tsheet_alert
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
        },
        TOTAL_WEEKS_TIMESHEETS(state, total) {
          state.weeks_tsheets = total
        },
        DATA_RECEIVED(state, bool) {
          state.data_received = bool
        },
        CUSTOM_FIELD_ITEMS(state, items) {
          if(localStorage.has_fielditems) {
            state.field_items = items
          } else {
            state.field_items.push(items)
          }
        },
        CUSTOM_FIELDS(state, fields) {
          state.customFields = fields
        },
        CUSTOM_FIELDS_LENGTH(state, length) {
          state.customFieldsLength = length
        },
        CUSTOM_FIELDS_RECEIVED(state, boolean) {
          state.customFieldsReceived = true
        },
        JOB_CODES_RECEIVED(state, bool) {
          state.job_codes_received = bool
        },
        JOB_CODES(state, codes) {
          if(localStorage.has_jobcodes) {
            state.job_codes = codes
          } else {
            state.job_codes.push(codes)
          }
        },
        TSHEET_ALERT(state, alert) {
          state.tsheet_alert = alert
        }
    },
    actions: {
      // GET
      // Retrives token from tsheets api after clicking the connect button
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
            'code': localStorage.getItem('tsheets_code'),
            'redirect_uri': "http://localhost:8080"
          }
        }).then(res => {
          localStorage.tsheets_access_token = res.data.access_token
          localStorage.tsheets_refresh_token = res.data.refresh_token
          localStorage.tsheets_expires_in = res.data.expires_in
          localStorage.tsheets_company_id = res.data.company_id
          localStorage.tsheets_client_url = res.data.client_url
          localStorage.tsheets_user_id = res.data.user_id
          router.replace({'query': null})
          setTimeout(() => {
            context.commit('toggleTimesheet')
          }, 300)
        }).catch(err => {
          console.log(err.response)
        })
      },
      // GET
      // Retrieves the user information of the tsheet account
      requestCurrentUser(context) {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://rest.tsheets.com/api/v1/current_user'
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tsheets_access_token')
        axios.get(proxy+url).then(res => {
          context.commit('TSHEETS_USER', res.data)
        }).catch(err => {
          console.log(err.response)
        })
      },
      //GET
      // Retrieves the current time sheet of the user
      requestTimesheet(context) {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://rest.tsheets.com/api/v1/timesheets'
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tsheets_access_token')
        axios({
          url: proxy+url,
          method: 'get',
          params: {
            'user_ids': localStorage.tsheets_user_id,
            'start_date': new Date().toJSON().slice(0,10),
            'on_the_clock': true
          }
        }).then(res => {
          localStorage.tsheets_tsheet_id = Object.keys(res.data.results.timesheets)[0]
          context.commit('CURRENT_TIMESHEET', res.data.results.timesheets[localStorage.tsheets_tsheet_id])
        }).catch(err => {
          console.log(err.response)
        })
      },
      // GET
      // Retrieves all of the timesheets for the user for the day
      requestTimesheetTotal(context) {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://rest.tsheets.com/api/v1/timesheets'
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tsheets_access_token')
        axios({
          url: proxy+url,
          method: 'get',
          params: {
            'user_ids': localStorage.tsheets_user_id,
            'start_date': new Date().toJSON().slice(0,10)
          }
        }).then(res => {
          context.commit('TOTAL_TIMESHEETS', res.data)
        }).catch(err => {
          console.log(err.response)
        })
      },
      // GET
      // Retrieves all of the timesheets for the user for the day
      requestWeeksTimesheets(context) {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://rest.tsheets.com/api/v1/timesheets'
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tsheets_access_token')
        axios({
          url: proxy+url,
          method: 'get',
          params: {
            'user_ids': localStorage.tsheets_user_id,
            'start_date': moment(getMonday(new Date())).format('YYYY-MM-DD')
          }
        }).then(res => {
          context.commit('TOTAL_WEEKS_TIMESHEETS', res.data.results.timesheets)
        }).catch(err => {
          console.log(err.response)
        })
      },
      // GET
      // Retrieve custom fields that are used to get custom field items
      requestCustomFields({commit, state, dispatch}) {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://rest.tsheets.com/api/v1/customfields'
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tsheets_access_token')
        axios({
          url: proxy+url,
          method: 'get'
        }).then(res => {
          commit('CUSTOM_FIELDS', res.data.results.customfields)
          commit('CUSTOM_FIELDS_LENGTH', Object.keys(state.customFields).length)
          dispatch('requestCustomFieldItems')
        }).catch(err => {
          console.log(err.response)
        })
      },
      // GET
      // Retrieve custom fields items for the custom fields
      requestCustomFieldItems({commit, state, dispatch}) {
        if(localStorage.has_fielditems) {
          commit('CUSTOM_FIELD_ITEMS', JSON.parse(localStorage.customfield_items))
          commit('CUSTOM_FIELDS_RECEIVED', true)
          return
        }
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://rest.tsheets.com/api/v1/customfielditems'
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tsheets_access_token')
        axios({
          url: proxy+url,
          method: 'get',
          params: {
            customfield_id: Object.keys(state.customFields)[state.itemIndex],
            page: state.getItemPage
          }
        }).then(res => {
          commit('CUSTOM_FIELD_ITEMS', res.data.results.customfielditems)
          if(res.data.more) {
            state.getItemPage++
            dispatch('requestCustomFieldItems')
          } else if(!notLastItem(state.customFields, state.customFieldsLength)) {
            state.itemIndex++
            dispatch('requestCustomFieldItems')
          } else {
            commit('CUSTOM_FIELDS_RECEIVED', true)
            localStorage.setItem('customfield_items',  JSON.stringify(state.field_items))
            localStorage.has_fielditems = true
          }
        }).catch(err => {
          if(err.response.status === 417) {
            if(state.field_items.length > 0) {
              localStorage.setItem('customfield_items',  JSON.stringify(state.field_items))
              localStorage.has_fielditems = true
            }
            commit('CUSTOM_FIELDS_RECEIVED', true)
          }
        })
      },
      // GET
      // Retrieve job codes that contain the customer information
      requestJobCodes({commit, state, dispatch}) {
        if(localStorage.has_jobcodes) {
          commit('JOB_CODES', JSON.parse(localStorage.jobcodes))
          commit('JOB_CODES_RECEIVED', true)
          commit('DATA_RECEIVED', true)
          return
        }
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://rest.tsheets.com/api/v1/jobcodes'
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tsheets_access_token')
        axios({
          url: proxy+url,
          method: 'get',
          params: {
            active: 'both',
            page: state.getPage
          }
        }).then(res => {
          commit('JOB_CODES', res.data.results.jobcodes)
          if(res.data.more) {
            state.getPage++
            dispatch('requestJobCodes')
          } else {
            commit('JOB_CODES_RECEIVED', true)
            commit('DATA_RECEIVED', true)
            localStorage.setItem('jobcodes',  JSON.stringify(state.job_codes))
            localStorage.has_jobcodes = true
          }
        }).catch(err => {
          console.log(err.response)
        })
      },
      clockIn(context, job) {
        context.commit('startProcessing')
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://rest.tsheets.com/api/v1/timesheets'
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tsheets_access_token')
        var payload = {'data': [{
          'user_id': localStorage.tsheets_user_id,
          'type': 'regular',
          'start': moment().format(),
          'end': '',
          'jobcode_id': job.id,
          'customfields': job.customFields
        }]}
        fetch(proxy+url, {
          method: "POST",
          headers: {"Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('tsheets_access_token')},
          body: JSON.stringify(payload)
        }).then(function(response) {
          return response.json();
        }).then(function(responsebody) {
          localStorage.tsheets_tsheet_id = responsebody.results.timesheets[1].id
          context.commit('CURRENT_TIMESHEET', responsebody.results.timesheets[1])
          context.commit('stopProcessing')
          commit('TSHEET_ALERT', 'Clocked In')
        }).catch(function(error) {
          console.log(error)
          context.commit('stopProcessing')
        });
      },
      clockOut({commit, state, dispatch}, job) {
        commit('startProcessing')
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://rest.tsheets.com/api/v1/timesheets'
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tsheets_access_token')
        var payload = {'data': [{
            'id': JSON.parse(localStorage.tsheets_tsheet_id),
            'end': moment().format(),
            'jobcode_id': job
          }]}
          axios({
            method: 'put',
            url: proxy+url,
            data: payload
          }).then(res => {
          commit('stopProcessing')
          localStorage.removeItem('tsheets_tsheet_id')
          commit('CURRENT_TIMESHEET', null)
          commit('TSHEET_ALERT', 'Clocked Out')
        }).catch(err => {
          commit('stopProcessing')
          console.log(err.response)
        })
      },
      switchJob({commit, dispatch}, job) {
        commit('startProcessing')
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://rest.tsheets.com/api/v1/timesheets'
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tsheets_access_token')
        var payload = {'data': [{
          'id': JSON.parse(localStorage.tsheets_tsheet_id),
            'end': moment().format(),
            'jobcode_id': job.id
          }]}
        axios({
          method: 'put',
          url: proxy+url,
          data: payload
        }).then(res => {
          dispatch('newJob', job)
        }).catch(err => {
          console.log(err.response)
        })
      },
      newJob({commit, state}, job) {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://rest.tsheets.com/api/v1/timesheets'
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tsheets_access_token')
        var payload = {'data': [{
          'user_id': localStorage.tsheets_user_id,
          'type': 'regular',
          'start': moment().format(),
          'end': '',
          'jobcode_id': job.id,
          'customfields': job.customFields
        }  ]}
        fetch(proxy+url, {
          method: "POST",
          headers: {"Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('tsheets_access_token')},
          body: JSON.stringify(payload)
        }).then(function(response) {
          return response.json();
        }).then(function(responsebody) {
          localStorage.tsheets_tsheet_id = responsebody.results.timesheets[1].id
          commit('CURRENT_TIMESHEET', responsebody.results.timesheets[1])
          commit('stopProcessing')
          commit('TSHEET_ALERT', 'Customer Switched')
          }).catch(function(error) {
            console.log(error)
          });
      },
      updateFieldItems({commit, state, dispatch}, job) {
        commit('startProcessing')
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://rest.tsheets.com/api/v1/timesheets'
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tsheets_access_token')
        var payload = {'data': [{
            'id': JSON.parse(localStorage.tsheets_tsheet_id),
            'jobcode_id': job.id,
            'customfields':  job.customFields
          }]}
          axios({
            method: 'put',
            url: proxy+url,
            data: payload
          }).then(res => {
          commit('stopProcessing')
          commit('CURRENT_TIMESHEET', res.data.results.timesheets[1])
          commit('TSHEET_ALERT', 'Service Item Updated')
        }).catch(err => {
          commit('stopProcessing')
          console.log(err.response)
        })
      },
      syncTsheets(context) {

      }
    }
}