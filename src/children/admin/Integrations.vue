<template>
   <div class="mt-3">
      <div class="d-flex justify-content-between">
      <h3 class="m-0 account-header">Integrations</h3>
      <div class="d-flex">
        <!-- area for opposite side of top bar -->
      </div>
    </div>
    <hr>
    <div class="d-flex flex-column align-items-start">
      <div v-if="true">
          <IntegrationsCard />
      </div>
      <Spinner v-else/>
    </div>
      <!-- this is for viewing children-->
      <router-view></router-view>
  </div>
</template>

<script>
import Spinner from '@/components/loaders/Spinner'
import IntegrationsCard from '@/components/admin/IntegrationsCard'

export default {
    name: 'Integrations',
    components: {Spinner, IntegrationsCard}
}
</script>

<style lang="scss">

</style>