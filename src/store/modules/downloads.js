import axios from 'axios'
import router from '../../routes/router'

export default {
    state: {
      confirm: false
    },
    getters: {
      confirmDownload(state) {
        return state.confirm
      }
    },
    mutations: {
      confirmDownloadState(state) {
        state.confirm = !state.confirm
      }
    },
    actions: {
        downloadEngagements(context, engagements) {
            context.commit('startProcessing')
            axios.post('/downloadengagements', engagements, {responseType: 'blob'})
            .then(response => {
              context.commit('stopProcessing')
              context.commit('confirmDownloadState')
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'engagements.xlsx');
              document.body.appendChild(link);
              link.click();
            })
            .catch(error => {
              context.commit('confirmDownloadState')
              context.commit('stopProcessing')
              console.log(error)
            })
        },
        downloadContacts(context) {
            axios.get('/downloadclients', {responseType: 'blob'})
            .then(response => {
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'contacts.xlsx');
              document.body.appendChild(link);
              link.click();
            })
            .catch(error => {
              console.log(error.response.data)
            })
        },
        requestReport(context, data) {
            context.commit('startProcessing')
            axios.post('/reports', {
              year: data.year,
              type: data.type,
              fromValue: data.fromValue,
              toValue: data.toValue,
              workflow_id: data.workflow_id,
              status: data.status,
              action: data.action,
                return_type: data.return_type
              },
              {
                responseType: 'blob'
              }
            )
            .then(response => {
              context.commit('stopProcessing')
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'engagements_report.xlsx');
              document.body.appendChild(link);
              link.click();
            })
            .catch(error => {
              context.commit('stopProcessing')
              console.log(error.response.data)
            })
        },
    }
}