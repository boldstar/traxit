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
        }
    },
    computed: {
    ...mapGetters(['allEngagements', 'engagementFilter']),
    engagements() {
        return this.allEngagements.filter(engagement => {
                if(this.engagementFilter === 'All'){ 
                    return engagement
                } else { 
                    return engagement.status === this.engagementFilter
                } 
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