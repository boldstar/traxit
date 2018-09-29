<template>
  <div>
      <Alert v-if="alert" v-bind:message="alert" />
      <!-- the clients data is imported from client info file -->
      <div class="page-wrapper mt-1">
          
          
          <contacts-list :clients="allClients"></contacts-list>
      
      </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import ContactsList from '@/components/ContactsList'
import Alert from '@/components/Alert'


export default {
name: 'Contacts',
  components: {
    ContactsList,
    Alert,
  },
  data() {
    return {
      alert: ''
    }
  },
  computed: {
    ...mapGetters(['allClients']),
  },
  created: function() {
    if(this.$route.query.alert) {
      this.alert  = this.$route.query.alert;
    }
    this.$router.replace({ path: '/contacts'})
    var self = this;
    setTimeout(() => {
      self.alert = '';
    }, 7000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">



</style>