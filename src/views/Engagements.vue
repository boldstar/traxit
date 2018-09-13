<template>

     <div class="page-wrapper mt-1">
        <engagements-list :engagements="allEngagements"></engagements-list>
    </div>

</template>

<script>
import EngagementsList from '@/components/EngagementsList.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'Engagements',
    components: {
        EngagementsList
    },
    computed: {
    ...mapGetters(['allEngagements']),
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">



</style>