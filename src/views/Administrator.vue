<template>
    <div id="administrator">
        <div class="text-left">
            <span class="h2 ml-4">Administrator</span>
            <hr class="mb-0">
        </div>
        <div class="row">
            <div class="col-2 pr-0">
                <ul class="admin-nav text-right h5 d-flex flex-column pr-0">
                    <router-link class="py-3 text-muted pr-4" :to="{ path: 'account' }" :class="{ 'is-selected': $route.name === 'app-account' }">Account</router-link>
                    <router-link class="py-3 text-muted pr-4" :to="{ path: 'workflows' }" :class="{ 'is-selected': $route.name === 'workflows' }">Workflows</router-link>
                    <router-link class="py-3 text-muted pr-4" :to="{ path: 'users' }" :class="{ 'is-selected': $route.name === 'users' }">Team Members</router-link>
                </ul>
            </div>
            <div class="col-10 pl-5 border-left d-flex justify-content-center">
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
    }



</style>



