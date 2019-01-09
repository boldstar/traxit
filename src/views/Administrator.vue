<template>
    <div id="administrator">
        <hr class="mb-0">
        <div class="row">
            <div class="col-2 p-0 sidebar">
                <ul class="admin-nav text-right h5 d-flex flex-column p-0 m-0 bg-light">
                    <router-link class="py-3 text-muted pr-4" to="/administrator/account" :class="{ 'is-selected': $route.name === 'app-account' }">Account</router-link>
                    <router-link class="py-3 text-muted pr-4" to="/administrator/users" :class="{ 'is-selected': $route.name === 'users' }">Team</router-link>
                    <router-link class="py-3 text-muted pr-4" to="/administrator/workflows" :class="{ 'is-selected': $route.name === 'workflows' }">Workflows</router-link>
                    <router-link class="py-3 text-muted pr-4" to="/administrator/reports" :class="{ 'is-selected': $route.name === 'reports' }">Reports</router-link>
                </ul>
            </div>
            <div class="col-10 px-5 border-left d-flex justify-content-center">
                <router-view class="flex-fill"></router-view>
            </div>
        </div>
    </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'administrator',
    data () {
        return {
            isActive: false,
        }
    },
    computed: {
        ...mapGetters(['allWorkflows', 'users']),
    },
    created() {
        this.$store.dispatch('retrieveWorkflows')
        this.$store.dispatch('retrieveUsers')
    }
}
</script>

<style lang="scss">

.is-selected {
        border-right: 5px solid #0077ff;
        padding: 40px 0;
        background-color: #0077ff41;
    }

.sidebar {
    min-height: calc(100vh - 52px);
}

</style>



