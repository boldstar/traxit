<template>
    <div>
       
       <Alert v-if="alert" v-bind:message="alert" />
  
        <div class="page-wrapper mt-1">

            <engagements-list :engagements="engagements" :key="engagementFilter"></engagements-list>
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
    ...mapGetters(['allEngagements', 'engagementFilter', 'allWorkflows']),
    engagements() {
        return this.allEngagements.filter(engagement => {
                if(this.engagementFilter === 'All'){ 
                    return engagement
                } else { 
                    const workflow = this.allWorkflows.filter(flow => flow.id === engagement.workflow_id)[0].statuses
                    const statuses = workflow.filter(st => st.state == this.engagementFilter)
                    if(statuses && statuses.length >= 1) {
                        for(var i = 0; i < statuses.length; i++)
                        if(statuses[i].status == engagement.status) {
                            return engagement
                        }
                    }
                } 
            })
        }   
    },
    created() {
        if(this.$route.query.alert) {
            this.alert  = this.$route.query.alert;
        }
        this.$store.dispatch('retrieveWorkflows')
        this.$router.replace({ path: '/engagements'})
        var self = this;
        setTimeout(() => {
        self.alert = '';
        }, 7000)
  }

}
</script>