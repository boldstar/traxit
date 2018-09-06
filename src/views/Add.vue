<template>
  <div class="page-wrapper mt-1">
    <AddClient />
  </div>
</template>

<script>
// @ is an alias to /src
import AddClient from '@/components/clients_list_experience/AddClient.vue'

export default {
  name: 'add',
  components: {
    AddClient
  }
}
</script>

<style>
 .container {
   margin-top: 10px;
 }
</style>
