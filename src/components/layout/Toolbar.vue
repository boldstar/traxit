<template>
    <nav class="navbar fixed-top bg-white flex-md-nowrap shadow-sm justify-content-between toolbar" :class="{'toolbar-collapsed': !sidebarOpen}">
        <div class="d-flex">
            <div class="align-self-center left-sidebar-button">
                <button class="bg-light" @click="toggleSidebar" data-toggle="tooltip" data-placement="bottom" title="Toggle Sidebar">
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
        <div>
            <div class="align-self-center">
                <button class="bg-light" @click="handleClick('timesheet')" data-toggle="tooltip" data-placement="bottom" title="Toggle Timesheet">
                    <i class="fas fa-stopwatch text-primary"></i> <span v-if="current_time" :key="timesheet" class="ml-2 font-weight-bold text-dark">{{ current_time }}</span>
                </button>
                <button class="bg-light ml-2" @click="handleClick('browserhistory')" data-toggle="tooltip" data-placement="bottom" title="Toggle Browser History">
                    <i class="fas fa-history text-primary"></i>
                </button>
            </div>
        </div>
    </nav>
</template>

<script>
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
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
        ...mapGetters(['grace', 'current_time', 'sidebarOpen', 'timesheet']),
        open () {
            return this.$store.state.sidebarOpen
        },
        computedGrace() {
            return this.grace.data
        },
    },
    methods: {
        handleClick (value) {
            if(value == 'timesheet') {
                this.$store.dispatch('toggleTimesheet')
            } else {
                this.$store.dispatch('toggleBrowserHistory')
            }
        },
        toggleSidebar() {
            this.$store.commit('toggleSidebar')
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

@media screen and (max-width: 950px) {

    .left-sidebar-button {
        display: none!important;
    }

    .breadcrumb {
        margin-left: 0!important;
    }
}

@media screen and (max-width: 767px) {
    .toolbar {
        height: 40px!important;
    }

    .left-sidebar-button {
        align-self: flex-start!important;
    }
}

</style>