<template>
  <div class="page-wrapper d-flex justify-content-center">
   <div class="w-100 d-flex justify-content-center">
     <div class="card p-0 shadow-sm profile-card col-6">
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
       </div>
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
  }
}
</script>

<style lang="scss" scoped>

tr {
  cursor: pointer;
}

@media screen and (max-width: 767px) {
  .profile-card {
      width: 100%!important;
      flex: 0 0 100%!important;
      max-width: 100%!important;
  }

  .card-body {
    font-size: 1rem!important;
  }
}

</style>
