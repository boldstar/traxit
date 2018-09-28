<template>
    <div>
       
       <Alert v-if="alert" v-bind:message="alert" />
  
        <div class="page-wrapper mt-1">

            <engagements-list :engagements="allEngagements"></engagements-list>
        </div>
    </div>

</template>

<script>
import EngagementsList from '@/components/EngagementsList.vue'
import Alert from '@/components/Alert.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'Engagements',
    components: {
        EngagementsList,
        Alert
    },
    data() {
        return {
            alert: ''
        }
    },
    computed: {
    ...mapGetters(['allEngagements']),
    },
    created: function() {
    if(this.$route.query.alert) {
      this.alert  = this.$route.query.alert;
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">



</style>