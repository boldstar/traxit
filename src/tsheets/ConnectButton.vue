<template>
    <a :href="authUrl" class="btn btn-primary align-self-center font-weight-bold">Connect TSHEETS</a>
</template>

<script>
export default {
    name: 'ConnectButton',
    data() {
        return {
            authEndpoint: 'https://rest.tsheets.com/api/v1/authorize?',
            redirectUri: 'http://localhost:8080',
            clientId: '7334d612a8cc42fe9b699f79e1f562e5',
            state: 'MYSTATE',
            token: 'S.9__a3309368c6e004fd4fa3a01a333bf6eb5719a091'
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
