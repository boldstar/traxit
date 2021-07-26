<template>
  <div class="mt-3">
      <div class="d-flex justify-content-between">
      <h3 class="m-0 account-header">Automations</h3>
      <div class="d-flex">
        <!-- area for opposite side of top bar -->
      </div>
    </div>
    <hr>
    <div class="d-flex flex-column align-items-center">
      <Alert v-if="successAlert" :message="successAlert" class="my-2 w-100" />
      <AutomationList :automations="automations" :workflows="allWorkflows" :state="automationSetting" v-if="show"/>
      <Spinner v-else/>
    </div>
      <!-- this is for viewing children-->
      <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AutomationList from '@/components/admin/AutomationList'
import Spinner from '@/components/loaders/Spinner'
import Alert from '@/components/alerts/Alert'
export default {
  name: 'Automations',
  components: {AutomationList, Spinner, Alert},
  data() {
    return {
     show: false
    }
  },
  computed: {
   ...mapGetters(['automations', 'allWorkflows', 'successAlert', 'settingsList']),
       automationSetting() {
         if(this.settingsList && this.settingsList.length > 0) {
             if(this.settingsList.findIndex(s => s.name === 'workflow_automations') != -1) {
                 return this.settingsList.filter(setting => setting.name == 'workflow_automations')[0].state
             } else {
                 return 0
             }
         } else {
           return 0
         }
       }
  },  
  methods: {
    
  },
  created: function() {
    this.$store.dispatch('getAutomations')
    this.$store.dispatch('retrieveWorkflows')
    var self = this
    
    setTimeout(() => {
      self.show = true
    }, 2000)
  },
}
</script>

<style lang="scss" scoped>

</style>