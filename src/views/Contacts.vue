<template>

    <!-- the clients data is imported from client info file -->
    <div class="page-wrapper mt-1">
        <contacts-list :clients="allClients"></contacts-list>
    </div>

</template>

<script>
import { mapGetters } from 'vuex'
import ContactsList from '@/components/ContactsList'


export default {
name: 'Contacts',
  components: {
    ContactsList,
  },
  computed: {
    ...mapGetters(['allClients']),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">



</style>