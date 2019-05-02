<template>
    <div id="app">
        <component :is="layout" v-if="subscribeView">
            <div v-html="subscribeView"></div>
        </component> 
        <component :is="layout" v-else> 
                <router-view/>
        </component>
    </div>
</template>

<script>
const default_layout = "default";
import {mapActions, mapGetters} from 'vuex'
import session from './plugins/session.js'

export default {
    computed: {
        ...mapGetters(['subscribeView']),
        layout() {
            return (this.$route.meta.layout || default_layout) + '-layout';
        },
    },
    methods: {
        ...mapActions(['destroyToken']),
        destroySessionIfTokenIsExpired() {
            if(session.destroyToken()) {
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
        //checks if session is expired
        this.destroySessionIfTokenIsExpired()
    },
    created() {
        this.$store.dispatch('getTours')
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

    *,
    *:before,
    *:after {
    box-sizing: border-box;
    }

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

</style>


