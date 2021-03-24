<template>
    <div id="app">
        <component :is="layout" v-if="subscribeView">
            <div v-html="subscribeView"></div>
        </component> 
        <component :is="layout" v-else> 
                <router-view id="page"/>
        </component>
    </div>
</template>

<script>
const landing_layout = "landing";
import {mapActions, mapGetters} from 'vuex'
import {destroyToken} from './plugins/session.js'
import axios from 'axios'
export default {
    computed: {
        ...mapGetters(['subscribeView', 'timesheet']),
        layout() {
            return (this.$route.meta.layout || landing_layout) + '-layout';
        },
    },
    methods: {
        ...mapActions(['destroyToken', 'tsheet']),
        destroySessionIfTokenIsExpired() {
            if(destroyToken()) {
                this.$store.dispatch('destroyToken')
                this.$router.push('/login')
            } else return;
        }
    },
    watch: {
        '$route': function(to, from) {
            this.destroySessionIfTokenIsExpired()
        },
        'timesheet': function(open) {
            if(!open) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
            }
        }
    },
    mounted() {
        //checks if session is expired
        this.destroySessionIfTokenIsExpired()
        this.$store.dispatch('getSettings')
    },
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

    *,
    *:before,
    *:after {
    box-sizing: border-box;
    }

    html { height: 100%; overflow:auto; }

    body {
        font-size: .875rem;
        height: 100%;
        min-height: 100vh;
        overflow-x: hidden;
    }

    //this is the transition between router views
    .page-wrapper {
        animation-duration: .5s;
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

    .custom-input-group {
        position: relative;
        margin: 10px;
        margin-bottom: 15px;

        label {
            position: absolute;
            top: -13px;
            left: 10px;
            background: white;
            padding: 0 10px;
            z-index: 2;
            white-space: nowrap!important;
            font-weight: bold;
            margin: 0;
        }

        span {
            font-weight: bold;
        }

        input {
            outline: none;
            padding: 10px;
            padding-top: 10px;
            border: 2px solid lightgray;
            border-radius: 5px;
            width: 100%;
            min-width: 200px;
        }

        select {
            padding: 12px;
            padding-top: 10px;
            border: 2px solid lightgray;
            border-radius: 5px;
            width: 100%;
            min-width: 200px;
        }

        .input-legend {
            font-weight: bold;
            background: rgb(231, 231, 231);
            border-radius: 0 0 5px 5px;
            padding-left: 12px;
            position: absolute;
            width: 100%;
            top: 45px;
            font-size: .8rem;
            padding-bottom: 2px;
            border: 2px solid lightgray;
            border-top: transparent;
        }

        .custom-input-error {
            border: 2px solid red;
        }
    }

    .input-group-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;

        .input-group-grid-section {
            width: 100%;
        }
    }
</style>


