<template>
    <nav class="navbar fixed-top bg-light flex-md-nowrap shadow-sm justify-content-between">
        <div class="d-flex">
            <div class="align-self-center">
                <button class="bg-light" @click="handleClick" data-toggle="tooltip" data-placement="bottom" title="Toggle Sidebar">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
            <div>
                <breadcrumb class="mt-3 ml-3 p-2" :route="route"></breadcrumb>
            </div>
        </div>
        <div v-if="grace">
            <span class="font-weight-bold" v-if="computedGrace.cancel_at_period_end">Account Will Expire On: <span class="text-danger">{{computedGrace.cancel_at}}</span></span>  
        </div>
        <button class="bg-light" data-toggle="tooltip" data-placement="bottom" title="Toggle Drawer">
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

</style>