<template>
    <a :href="authUrl" class="btn btn-primary align-self-center font-weight-bold">Connect TSHEETS</a>
</template>

<script>
export default {
    name: 'ConnectButton',
    data() {
        return {
            authEndpoint: 'https://rest.tsheets.com/api/v1/authorize?',
            redirectUri: 'https://app.traxit.io',
            clientId: process.env.VUE_APP_TSHEETS_CLIENT_ID,
            state: 'MYSTATE',
            token: process.env.VUE_APP_TSHEETS_TOKEN
        }
    },
    computed: {
        authUrl() {
            var params = {
                response_type: 'code',
                client_id: this.clientId,
                redirect_uri: this.redirectUri,
                state: this.state,
            }

            return this.authEndpoint + this.setParams(params)
        }
    },
    methods: {
        setParams(params) {
            return 'client_id='+params.client_id+'&response_type='+params.response_type+'&redirect_uri='+params.redirect_uri+'&state='+params.state
        } 
    },
}
</script>
