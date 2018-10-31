<template>
  <div class="mt-3">
    <div class="d-flex justify-content-between">
        <span class="h3 m-0">Account</span>
        <button class="btn btn-sm btn-primary">Dont know</button>
      </div>
      <hr>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'account',
  data() {
    return {
     
    }
  },
  computed: {
    ...mapGetters(
        [
          'allClients',
          'users'
        ]
      ),
  },
  methods: {
    ...mapActions(['addEngagement']),
    
  },
  created: function() {
    this.$store.dispatch('retrieveClients');
    this.$store.dispatch('retrieveUsers');
  },
}
</script>

<style lang="scss" scoped>



</style>