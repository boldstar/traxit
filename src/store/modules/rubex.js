import axios from 'axios'
import moment from 'moment';
import {encodeUrl} from '../../plugins/helpers'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('rubex_access_token')

export default {
    state: {
        rubex_access_token: localStorage.getItem('rubex_access_token') || null,
        rubex_refresh_token: localStorage.getItem('rubex_refresh_token') || null,
        rubex_portfolios: null,
        rubex_portfolio_folders: null,
        rubex_modal: false,
        rubex_modal_data: null,
        rubex_nodes: null,
        rubex_account_setting: null
    },
    getters: {
      rubexPortfolios(state) {
        return state.rubex_portfolios
      },
      rubexPortfolioFolders(state) {
        return state.rubex_portfolio_folders
      },
      rubexModal(state) {
        return state.rubex_modal
      },
      rubexModalData(state) {
        return state.rubex_modal_data
      },
      rubexNodes(state) {
        return state.rubex_nodes
      },
      rubexAccountSetting(state) {
        return state.rubex_account_setting
      }
    },
    mutations: {
      RUBEX_PORTFOLIOS(state, data) {
        state.rubex_portfolios = data
      },
      RUBEX_PORTFOLIO_FOLDERS(state, data) {
        state.rubex_portfolio_folders = data
      },
      SHOW_RUBEX_INTEGRATION_MODAL(state, data) {
        state.rubex_modal = !state.rubex_modal
        state.rubex_modal_data = data
      },
      RUBEX_NODES(state, data) {
        state.rubex_nodes = data
      },
      RUBEX_ACCOUNT_SETTING(state, data) {
        state.rubex_account_setting = data
      }
    },
    actions: {
      showRubexIntegrationModal(context, data) {
        if(localStorage.getItem('rubex_access_tokens')) {
          context.commit('SHOW_RUBEX_INTEGRATION_MODAL', data)
        } else {
          console.log('no integration')
        }
      },
      notifyRubexAdmins(context) {
        localStorage.removeItem('rubex_access_tokens')
      },
      requestRubexToken(context, params) {
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
            context.dispatch('saveIntegrationToken', res.data)
            setTimeout(() => {
              context.dispatch('getRefreshToken')
            }, res.data.expires_in - 10000)
            resolve(res)
          }).catch(err => {
            console.log(err.response)
            reject(err)
          })
        })
      },
      getRefreshToken(context) {
        return new Promise((resolve, reject) => {
          const url = 'https://rubex.efilecabinet.net/token'
          axios({
            method: 'post',
            url: url,
            data: encodeUrl({
              grant_type: 'refresh_token',
              refresh_token: JSON.parse(localStorage.getItem('rubex_access_tokens')).refresh_token,
              client_id: '1046',
              client_secret: '517ECA92-17B7-4311-882C-00C630223F4A'
            }),
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
          }
          }).then(res => {
            localStorage.setItem('rubex_access_tokens', JSON.stringify(res.data))
            setTimeout(() => {
              context.dispatch('getRefreshToken')
            }, res.data.expires_in - 10000)
            resolve(res)
          }).catch(err => {
            console.log(err.response)
            reject(err)
          })
        })
      },
      getRubexAccountSetting(context) {
        return new Promise((resolve, reject) => {
          const url = 'https://rubex.efilecabinet.net/api/AccountSetting'
          axios({
            method: 'get',
            url: url,
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('rubex_access_tokens')).access_token
          }
          }).then(res => {
            context.commit('RUBEX_ACCOUNT_SETTING', res.data)
            resolve(res)
          }).catch(err => {
            console.log(err.response)
            reject(err)
          })
        })
      },
      getRubexPortfolios(context) {
        return new Promise((resolve, reject) => {
          const url = 'https://rubex.efilecabinet.net/api/Portfolio'
          axios({
            method: 'get',
            url: url,
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('rubex_access_tokens')).access_token
          }
          }).then(res => {
            context.commit('RUBEX_PORTFOLIOS', res.data)
            resolve(res)
          }).catch(err => {
            console.log(err.response)
            reject(err)
          })
        })
      },
      getRubexNodes(context, parent_id) {
        return new Promise((resolve, reject) => {
          const url = 'https://rubex.efilecabinet.net/api/Node/Children/?id=' + 204049590
          axios({
            method: 'get',
            url: url,
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('rubex_access_tokens')).access_token
          }
          }).then(res => {
            context.commit('RUBEX_NODES', res.data)
            resolve(res)
          }).catch(err => {
            console.log(err.response)
            reject(err)
          })
        })
      },
      getRubexNodeChildren(context, id) {
        return new Promise((resolve, reject) => {
          const url = 'https://rubex.efilecabinet.net/api/Node/Children?id=' + id
          axios({
            method: 'get',
            url: url,
            headers: {
              'Content-Type': "application/x-www-form-urlencoded",
              'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('rubex_access_tokens')).access_token
            }
          }).then(res => {
            context.commit('RUBEX_PORTFOLIO_FOLDERS', res.data)
            resolve(res)
          }).catch(err => {
            console.log(err.response)
            reject(err)
          })
        })
      },
      getRubexTemplates({commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          const url = 'https://rubex.efilecabinet.net/api/Node/Template'
          axios({
            method: 'get',
            url: url,
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('rubex_access_tokens')).access_token
            }
          }).then(res => {
            console.log(res)
            resolve(res)
          }).catch(err => {
            console.log(err.response)
            reject(err)
          })
        })
      },
      addRubexNode(context, params) {
        return new Promise((resolve, reject) => {
          const url = 'https://rubex.efilecabinet.net/api/Node'
          axios({
            method: 'post',
            url: url,
            data: {
              id: null,
              accountID: params.accountID,
              parentID: params.parentID,
              name: params.name,
              size: 0,
              permission: {},
              createdBy: "Test",
              createdByUserID: JSON.parse(localStorage.getItem('rubex_access_tokens')).user_id,
              createdOn: new Date(),
              modifiedOn: new Date(),
              fileInfo: {},
              systemType: 5,
              hasChildren: true,
              nodeProvider: 0
            },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('rubex_access_tokens')).access_token
          }
          }).then(res => {
            context.commit('successAlert', res.data.name + ' Was Added To Rubex!')
            context.dispatch('showRubexIntegrationModal', null)
            resolve(res)
          }).catch(err => {
            console.log(err.response.data)
            reject(err)
          })
        })
      },
      saveIntegrationToken(context, data) {
        return new Promise((resolve, reject) => {
          axios.post('integration', {
            name: 'rubex',
            expires: data['.expires'],
            issued: data['.issued'],
            expires_in: data.expires_in,
            access_token: data.access_token,
            mfa_token: data.mfa_token,
            refresh_token: data.refresh_token,
            token_type: data.token_type,
            user_id: data.user_id,
          })
          .then(res => {
            console.log(res.data)
            resolve(res)
          }).catch(err => {
            console.log(err.response.data)
            reject(err)
          })
        })
      }
    }
}