<template>
    <nav class="navbar fixed-top bg-light flex-md-nowrap shadow-sm justify-content-between toolbar">
        <div class="d-flex">
            <div class="align-self-center left-sidebar-button">
                <button class="bg-light" @click="handleClick" data-toggle="tooltip" data-placement="bottom" title="Toggle Sidebar">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
            <div>
                <breadcrumb class="breadcrumb" :route="route"></breadcrumb>
            </div>
        </div>
        <div v-if="grace">
            <span class="font-weight-bold" v-if="computedGrace.cancel_at_period_end">Account Will Expire On: <span class="text-danger">{{computedGrace.cancel_at}}</span></span>  
        </div>
        <button class="bg-light right-sidebar-button" data-toggle="tooltip" data-placement="bottom" title="Toggle Drawer" @click="showLinks">
            <i class="fas fa-bars"></i>
        </button>
    </nav>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import {mapGetters} from 'vuex'

export default {
    name: 'toolbar',
    components: {
        Breadcrumb
    },
    props: [
        'route'
    ],
    computed: {
        ...mapGetters(['grace']),
        open () {
            return this.$store.state.sidebarOpen
        },
        computedGrace() {
            return this.grace.data
        },
    },
    methods: {
        handleClick () {
            this.$store.dispatch('toggleSidebar')
        },
        showLinks() {
            this.$store.commit('mobileLinks')
        }
    }
}
</script>

<style lang="scss" scoped>

nav {
    height: 40px;
    margin-top: 52px; //space for the navbar
    z-index: 1;
}

button {
    border: 1px solid rgba(128, 128, 128, 0.322);
    border-radius: 3px;
    text-decoration: none;
    color: #a1a1a1;
    font-size: 1.0rem;
    text-align: center;

    &:hover {
        cursor: pointer;
    }
}

.right-sidebar-button {
    display: none!important;
}

@media screen and (max-width: 950px) {
    .right-sidebar-button {
        display: block!important;
    }

    .left-sidebar-button {
        display: none!important;
    }

    .breadcrumb {
        margin-left: 0!important;
    }
}

@media screen and (max-width: 767px) {
    .toolbar {
        height: 50px!important;
    }

    .left-sidebar-button {
        align-self: flex-start!important;
    }

    .right-sidebar-button {
        align-self: flex-start!important;
    }

    button {
        border: 1px solid rgba(128, 128, 128, 0.322);
        border-radius: 3px;
        text-decoration: none;
        color: #a1a1a1;
        font-size: 1.2rem;
        text-align: center;
    }
}

</style>