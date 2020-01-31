<template>
  <div>
      <Alert v-if="alert" v-bind:message="alert" />
      <Alert v-if="successAlert" v-bind:message="successAlert" />

      <div class="page-wrapper mt-1"> 
          <BusinessList :businesses="businessList" v-if="contactFilter == 'Business'" />
          <ContactsList :clients="allClients" v-else />
      </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import ContactsList from '@/components/contact/ContactsList'
import BusinessList from '@/components/contact/BusinessList'
import Alert from '@/components/alerts/Alert'


export default {
name: 'Contacts',
  components: {
    ContactsList,
    BusinessList,
    Alert,
  },
  data() {
    return {
      alert: ''
    }
  },
  computed: {
    ...mapGetters(['allClients', 'businessList', 'contactFilter', 'successAlert']),
  },
  created: function() {
    if(this.$route.query.alert) {
      this.alert  = this.$route.query.alert;
    }
    this.$store.dispatch('retrieveBusinessList')
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