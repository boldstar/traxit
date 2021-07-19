<template>
  <div class="customizations-list w-100">
    <CustomCard :setting="'contact_categories'" :state="contactCategorySetting" />
    <WorkflowAutomations class="mt-3" :state="false" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CustomCard from '@/components/admin/CustomCard'
import WorkflowAutomations from '@/components/admin/WorkflowAutomations'
export default {
    name: 'CustomizationList',
    components: {CustomCard, WorkflowAutomations},
    computed: {
       ...mapGetters(['settingsList']),
       contactCategorySetting() {
         if(this.settingsList&&this.settingsList.length > 0) {
           return this.settingsList.filter(setting => setting.name == 'contact_categories')[0].state
         } else {
           return 0
         }
       }
    }
}
</script>

<style lang="scss" scoped>

</style>