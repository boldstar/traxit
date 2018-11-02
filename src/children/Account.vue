<template>
  <div class="mt-3">
    <div class="d-flex justify-content-between">
        <span class="h3 m-0">Account</span>
        <button class="btn btn-sm btn-primary">Dont know</button>
      </div>
      <hr>
      <ul class="h4 text-left">
        <li>
          <span>Business Name:</span>
        </li>
        <li>
          <span>Account Email:</span>
        </li>
        <li>
          <span>Logo:</span>
        </li>
        <li>
          <span>Subscription:</span>
        </li>
      </ul>
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

  li {
    list-style: none;
    padding: 30px 0;
  }

</style>