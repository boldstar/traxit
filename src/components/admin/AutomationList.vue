<template>
  <div class="automation-list">
      <WorkflowAutomations class="mt-3" :state="false" />
  </div>
</template>

<script>
import WorkflowAutomations from '@/components/admin/WorkflowAutomations'

export default {
    name: 'AutomationList',
    components: {WorkflowAutomations}
}
</script>

<style lang="scss">
.automation-list {
    width: 100%;
}

</style>