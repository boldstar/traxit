<template>
    <div id="app">
        <component :is="layout"> 
                <router-view/>
        </component> 
    </div>
</template>

<script>
const default_layout = "default";
import {mapActions} from 'vuex'
import moment from 'moment'

export default {
    computed: {
        layout() {
            return (this.$route.meta.layout || default_layout) + '-layout';
        },
    },
    methods: {
        ...mapActions(['destroyToken']),
        destroySessionIfTokenIsExpired() {
            const expiresOn = localStorage.getItem('expires_on')
            const expiresDate = moment(expiresOn).format('YYYYMMDDHHMMSS')
            if(expiresOn == null) return;
            const current = new Date(moment())
            const currentDate = moment(current).format('YYYYMMDDHHMMSS')
            if(currentDate >= expiresDate) {
                this.$store.dispatch('destroyToken')
                this.$router.push('/login')
            } else return;
        }
    },
    watch: {
        '$route': function(to, from) {
            this.destroySessionIfTokenIsExpired()
        }
    },
    mounted() {
        this.destroySessionIfTokenIsExpired()
    }
}
</script>

<style lang="scss">

    @import url('https://fonts.googleapis.com/css?family=Ubuntu:400');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');

    #app {
        font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    body {
        font-size: .875rem;
        height: 100%;
    }


    /*
    * Content
    */

    [role="main"] {
        padding-top: 120px; /* Space for fixed navbar and toolbar / adds space below navbar */
    }

    #administrator ul.admin-nav {
    

        a {
            text-decoration: none;
        }
    }


    //this is the transition between router views
    .page-wrapper {
        animation-duration: .5s;
    }

    //this is the css for the loading spinner
    .lds-dual-ring {
        display: inline-block;
        width: 64px;
        height: 64px;
        margin-top: 100px;
        margin-bottom: 100px;
    }

    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 46px;
        height: 46px;
        margin: 1px;
        border-radius: 50%;
        border: 5px solid #0077ff;
        border-color: #0077ff transparent #0077ff transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
        @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .lds-ellipsis-container {
        position: absolute;
        right: 50%;
        padding-right: 20px;
    }

    .lds-ellipsis {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 11px;
    }

    .lds-ellipsis div {
        position: absolute;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: #fff;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    .lds-ellipsis div:nth-child(1) {
        left: 6px;
        animation: lds-ellipsis1 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(2) {
        left: 6px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(3) {
        left: 26px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(4) {
        left: 45px;
        animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
        }
        @keyframes lds-ellipsis3 {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
        }
        @keyframes lds-ellipsis2 {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(19px, 0);
        }
    }

    .server-error {
        margin-bottom: 15px;
        font-size: 16px;
        padding: 10px 16px;
        color: #a94442;
        background: #F3DEDE;
        border-radius: 4px;
    }

    .form-error {
        font-size: 16px;
        color: #a94442;
    }

    .input-error {
        border: 1px solid red;
    }

    .success-message {
        background-color: #dff0d8;
        color: #3c763d;
        margin-bottom: 12px;
        font-size: 16px;
        padding: 10px 16px;
        border-radius: 4px;
    }
</style>


