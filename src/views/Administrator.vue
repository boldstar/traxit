<template>
    <div id="administrator">
        <hr class="mb-0">
        <div class="row">
            <div class="col-2 p-0 sidebar">
                <ul class="admin-nav text-right h5 d-flex flex-column p-0 m-0">
                    <router-link class="py-3 text-muted pr-4 link" to="/administrator/account" :class="{ 'is-selected': $route.name === 'app-account' }">Account<i class="fas fa-book-open ml-2"></i></router-link>
                    <router-link class="py-3 text-muted pr-4 link" to="/administrator/users" :class="{ 'is-selected': $route.name === 'users' }">Team<i class="fas fa-users ml-2"></i></router-link>
                    <router-link class="py-3 text-muted pr-4 link" to="/administrator/workflows" :class="{ 'is-selected': $route.name === 'workflows' }">Workflows<i class="fas fa-route ml-2"></i></router-link>
                    <router-link class="py-3 text-muted pr-4 link" to="/administrator/reports" :class="{ 'is-selected': $route.name === 'reports' }">Reports<i class="fas fa-database ml-2"></i></router-link>
                    <router-link class="py-3 text-muted pr-4 link" to="/administrator/templates" :class="{ 'is-selected': $route.name === 'templates' }">Templates<i class="far fa-envelope ml-2"></i></router-link>
                    <router-link class="py-3 text-muted pr-4 link" to="/administrator/subscription" :class="{ 'is-selected': $route.name === 'subscription' }">Subscription<i class="fas fa-money-check-alt ml-2"></i></router-link>
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
        padding: 40px 0;
        background-color: #0077ff41;

        i {
            color: #0077ff;
        }

        &:hover {
            background-color: #0077ff50;
        }
    }

.link {
     &:hover {
            background-color: #0077ff21;
            transition: 1s;
        }
}

.sidebar {
    min-height: calc(100vh - 52px);
}

</style>



