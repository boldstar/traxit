<template>
  <div class="mt-3">
      <div class="d-flex justify-content-between">
        <span class="h3 m-0">Team Members</span>
        <button class="btn btn-sm btn-primary">Add Team Member</button>
      </div>
      <hr>
      <table class="mt-4 table border table-light table-hover text-left">
        <thead class="text-primary hover">
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col" class="text-center">Edit</th>
            </tr>
        </thead> 
        <tbody class="client-info table-bordered">
            <tr v-for="(user, index) in users"  :key="index">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.roles[0].name}}</td>
                <td class="text-center"><button class="btn btn-sm btn-secondary">Edit</button></td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'users',
  data() {
    return {
     
    }
  },
  computed: {
    ...mapGetters(
        [
          'users'
        ]
      ),
  },
  methods: {
    ...mapActions(['addEngagement']),
    
  },
  created: function() {
    this.$store.dispatch('retrieveUsers');
  },
}
</script>

<style lang="scss" scoped>



</style>