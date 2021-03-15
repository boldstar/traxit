<template>
  <div class="mt-3">
      <div class="d-flex justify-content-between">
      <h3 class="m-0 account-header">Customizations</h3>
      <div class="d-flex">
        <!-- area for opposite side of top bar -->
      </div>
    </div>
    <hr>
    <div class="d-flex flex-column align-items-center">
      <CustomizationsList v-if="show"/>
      <Spinner v-else/>
    </div>
      <!-- this is for viewing children-->
      <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CustomizationsList from '@/components/admin/CustomizationsList'
import Spinner from '@/components/loaders/Spinner'
export default {
  name: 'Customizations',
  components: {CustomizationsList, Spinner},
  data() {
    return {
     show: false
    }
  },
  computed: {
   
  },  
  methods: {
    
  },
  created: function() {
    var self = this
    
    setTimeout(() => {
      self.show = true
    }, 2000)
  },
}
</script>

<style lang="scss" scoped>

</style>