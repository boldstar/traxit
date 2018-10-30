<template>
  <div>
    Account
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