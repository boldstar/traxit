<template>
    <div class="mt-3">
        <div class="d-flex justify-content-between">
            <span class="h3 m-0">Add Team Member</span>
            <router-link :to="'users'" class="btn btn-primary">Back</router-link>
        </div>
        <hr>
        <div class="container card-body bg-light">
            <form @submit.prevent="addNewUser" class="d-flex-column justify-content-center">
                <div class="d-block text-left">
                    <br>
                    <input class="form-control" type="text" placeholder="Name" v-model="name">
                    <br>
                    <input class="form-control" type="text" placeholder="Email" v-model="email">
                    <br>
                    <input class="form-control" type="text" placeholder="Password" v-model="password">
                    <br>
                </div>
                <div class="d-flex">
                    <button type="submit" class="btn btn-primary">Create</button>
                </div>   
            </form>
        </div>      
    </div>
</template>

<script>
import {  mapActions } from 'vuex'

export default {
    name: 'AddUser',
    data() {
        return {
            name: '',
            email: '',
            password: '',
        }
    },
  methods: {
    ...mapActions(['addUser']),
    addNewUser() {
      this.addUser({
        name: this.name,
        email: this.email,
        password: this.password,
      }).then(() => {
          this.$router.push({path: '/administrator/users'});
      })
    }
  },

}
</script>


<style>

</style>

