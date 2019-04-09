<template>
    <div id="administrator">
        <hr class="mb-0">
        <div class="d-flex">
            <AdminSidebar />
            <div class="px-5 border-left d-flex justify-content-center admin-content">
                <router-view class="flex-fill"></router-view>
            </div>
        </div>
    </div>

</template>

<script>
import { mapGetters } from 'vuex'
import AdminSidebar from '@/components/AdminSidebar'

export default {
    name: 'administrator',
    components: {
        AdminSidebar
    },
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

.admin-content {
    width: 100%!important;
}

@media screen and (max-width: 767px) {

    .admin-content {
        padding-right:25px!important;
        padding-left:10px!important;
    }
}

</style>



