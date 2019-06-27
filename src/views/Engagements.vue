<template>
    <div>
       
       <Alert v-if="alert" v-bind:message="alert" />
  
        <div class="page-wrapper mt-1">

            <engagements-list :engagements="engagements"></engagements-list>
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
            alert: '',
            key: 'All',
        }
    },
    computed: {
    ...mapGetters(['allEngagements']),
    engagements() {
        return this.allEngagements.filter(engagement => {
                if(this.key === 'All'){ return engagement } else{ return engagement.status === this.key} 
            })
        }   
    },
    created() {
    if(this.$route.query.alert) {
        this.alert  = this.$route.query.alert;
    }
    this.$router.replace({ path: '/engagements'})
    var self = this;
    setTimeout(() => {
      self.alert = '';
    }, 7000)
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">



</style>