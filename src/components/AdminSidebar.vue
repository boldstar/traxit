<template>
    <div class="p-0 sidebar">
        <ul class="admin-nav text-right h5 d-flex flex-column p-0 m-0">
            <router-link class="py-3 text-muted pr-4 link" to="/administrator/account" :class="{ 'is-selected': $route.name === 'app-account' }">
                <span class="link-span">Account</span>
                <i class="fas fa-book-open ml-2"></i>
            </router-link>
            <router-link class="py-3 text-muted pr-4 link" to="/administrator/team" :class="{ 'is-selected': $route.name === 'team' }">
                <span class="link-span">Team</span>
                <i class="fas fa-users ml-2"></i>
            </router-link>
            <router-link class="py-3 text-muted pr-4 link" to="/administrator/workflows" :class="{ 'is-selected': $route.name === 'workflows' }">
                <span class="link-span">Workflows</span>
                <i class="fas fa-route ml-2"></i>
            </router-link>
            <router-link class="py-3 text-muted pr-4 link" to="/administrator/reports" :class="{ 'is-selected': $route.name === 'reports' }">
                <span class="link-span">Reports</span>
                <i class="fas fa-database ml-2"></i>
            </router-link>
            <router-link class="py-3 text-muted pr-4 link" to="/administrator/templates" :class="{ 'is-selected': $route.name === 'templates' }">
                <span class="link-span">Templates</span>
                <i class="far fa-envelope ml-2"></i>
            </router-link>
            <router-link class="py-3 text-muted pr-4 link" to="/administrator/subscription" :class="{ 'is-selected': $route.name === 'subscription' }">
                <span class="link-span">Subscription</span>
                <i class="fas fa-money-check-alt ml-2"></i>
            </router-link>
        </ul>
    </div>
</template>

<script>
import Toaster from '@/components/Toaster.vue'
import {mapGetters} from 'vuex'

export default {
    name: 'AdminSidebar',
    components: {
        Toaster
    },
    data () {
        return {
        isActive: false,
        }
    },
    computed: {
        ...mapGetters([])
    }
}
</script>

<style lang="scss" scoped>

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
    width: 215px;
}


@media screen and (max-width: 767px) {
    .link {
        font-size: .8rem!important;
        padding: 10px!important;
    }

    .admin-nav {
        width: 40px;
        padding-left: 25px;
    }

    .sidebar {
        width: 40px;
    }

    .link-span {
        display: none;
    }
}

</style>

