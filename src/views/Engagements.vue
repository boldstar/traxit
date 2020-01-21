<template>
    <div>
       
       <Alert v-if="alert" v-bind:message="alert" />
  
        <div class="page-wrapper mt-1">

            <engagements-list :engagements="engagements"></engagements-list>
        </div>
    </div>

</template>

<script>
import EngagementsList from '@/components/engagement/EngagementsList.vue'
import Alert from '@/components/Alert.vue'
import moment from 'moment'
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
                } else if(this.engagementFilter === 'In Progress') {
                    return engagement.in_progress == true && engagement.done == false
                } else if(this.engagementFilter === 'Priority') {
                    return engagement.priority >= 4 && engagement.done == false
                } else if(this.engagementFilter === 'Past Due') {
                    if(engagement.estimated_date && engagement.done == false) {
                        if(moment(new Date(engagement.estimated_date)).format('YYYYMMDDHHMMSS') < moment(new Date()).format('YYYYMMDDHHMMSS')) {
                            return engagement
                        }
                    }
                } else { 
                    //filter workflow that matches engagement
                    const workflow = this.allWorkflows.filter(flow => flow.id === engagement.workflow_id)[0].statuses
                    //find status state that matches engagement filter
                    const statuses = workflow.filter(st => st.state == this.engagementFilter)
                    //for each status return engagement where status equals engagement status
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