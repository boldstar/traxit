<template>
  <div class="page-wrapper d-flex justify-content-center">
   <div class="row col-12">
     <div class="col-4 card p-0 shadow-sm">
       <div class="card-header border text-left">
         <span class="h2">Profile</span>
       </div>
       <div class="card-body px-0 d-flex flex-column h4" v-if="user">
        <div class="border-bottom mb-3 pb-4">
          <i class="fas fa-user-circle mr-2 fa-5x my-4"></i>
        </div>
        <div class="my-4 px-3 d-flex justify-content-between">
           <span>Name</span>
           {{user.name}}
        </div>
        <div class="mb-4 px-3 d-flex justify-content-between">
           <span>Email</span>
           {{user.email}}
        </div>
        <div class="mb-4 px-3 d-flex justify-content-between">
           <span>Role</span>
           {{user.roles[0].name}}
        </div>
        <div class="px-3 d-flex justify-content-between">
           <span>Password</span>
           <button type="button" class="btn btn-sm btn-outline-primary">Reset</button>
        </div>
       </div>
     </div>
     <div class="col-8">
      <table class="table table-hover">
        <thead class="bg-primary text-light">
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Client</th>
            <th scope="col">Assigned On</th>
          </tr>
        </thead>
        <tbody class="table-bordered">
          <tr v-for="(task, index) in tasks"  :key="index" @click="$router.push('/tasks')">
            <th>{{ task.engagements[0].status }}</th>
            <td>{{ task.engagements[0].name }}</td>
            <td>{{ task.created_at | formatDate }}</td>
          </tr>
        </tbody>
      </table>
     </div>
   </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'profile',
  computed: {
    ...mapGetters(['user', 'tasks'])
  },
  created(){
    this.$store.dispatch('retrieveUser')
    this.$store.dispatch('retrieveTasks')
  }
}
</script>

<style lang="scss" scoped>

tr {
  cursor: pointer;
}

</style>
