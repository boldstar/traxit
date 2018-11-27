<template>
  <div>
      <Alert v-if="alert" v-bind:message="alert" />
      <Alert v-if="successAlert" v-bind:message="successAlert" />

      <!-- the clients data is imported from client info file -->
      <processing v-if="processing"></processing>
      <div class="page-wrapper mt-1"> 
          <contacts-list :clients="allClients"></contacts-list>
      </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import ContactsList from '@/components/ContactsList'
import Alert from '@/components/Alert'
import Processing from '@/components/Processing'


export default {
name: 'Contacts',
  components: {
    ContactsList,
    Alert,
    Processing,
  },
  data() {
    return {
      alert: ''
    }
  },
  computed: {
    ...mapGetters(['allClients', 'processing', 'successAlert']),
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
.message {
  background-color: aqua;
  color: black;
  padding: 20px;
  text-align: center;
  margin-bottom: 10px;
}


</style>