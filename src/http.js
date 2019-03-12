import axios from 'axios'

const AxiosApi = axios.create({
    baseURL: 'http://' + localStorage.getItem('fqdn_api_url') + '/api'
})

export default AxiosApi