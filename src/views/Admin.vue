<template>
    <div>

    </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'admin',
    data () {
        return {
            
        }
    },
    computed: {
        ...mapGetters(['allWorkflows', 'users'])
    },
    created() {
        this.$store.dispatch('retrieveWorkflows')
        this.$store.dispatch('retrieveUsers')
    }
}
</script>
