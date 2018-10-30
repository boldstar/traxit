<template>
  <div>
    workflows
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'workflows',
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