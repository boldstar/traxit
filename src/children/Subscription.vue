<template>
  <div class="mt-3">
    <div class="d-flex justify-content-between">
      <h3 class="m-0">Subscription</h3>
      <div class="d-flex">
        <div class=" align-self-center">
          <router-link :to="{path: '/administrator/account/add-account'}" class="btn btn-primary">Add Details</router-link>
        </div>
      </div>
    </div>
    <hr>
     <div>
       <!-- view of subscription goes here -->
     </div>

      <!-- this is for viewing the account form -->
      <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'subscription',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters(
        [
          
          'processing'
        ]
      ),
  },
  methods: {
   
  },
  created: function() {
    this.$store.dispatch('getSubscription')
  },
}
</script>

<style lang="scss" scoped>


</style>