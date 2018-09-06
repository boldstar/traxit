<template>

    <!-- the clients data is imported from client info file -->
    <div class="page-wrapper mt-1">
        <client-info :clients="allClients"></client-info>
    </div>

</template>

<script>
import { mapGetters } from 'vuex'
import ClientInfo from '@/components/clients_list_experience/ClientInfo'


export default {
name: 'ClientsList',
  components: {
    ClientInfo,
  },
  computed: {
    ...mapGetters(['allClients']),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">



</style>