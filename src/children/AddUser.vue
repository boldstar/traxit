<template>
    <div class="mt-3">
        <div class="d-flex justify-content-between">
            <span class="h3 m-0">Add Team Member</span>
            <router-link :to="'users'" class="btn btn-primary">Back</router-link>
        </div>
        <hr>
        <div class="container card-body bg-light col-6">
            <div class="text-left">
                <h3>User Form</h3>
            </div>
            <form @submit.prevent="validateBeforeSubmit" class="d-flex-column justify-content-center">
                <div class="d-block text-left">
                    <br>
                    <input :class="{ 'input-error': errors.has('Name') }" class="form-control" type="text" placeholder="Name" v-model="name" v-validate="'required|name'" name="Name">.
                    <span class="form-error" v-show="errors.has('Name')">{{ errors.first('Name') }}</span>
                    <br>
                    <input :class="{ 'input-error': errors.has('Email') }" class="form-control" type="text" placeholder="Email" v-model="email" v-validate="'required|email'" name="Email">
                    <span class="form-error"  v-show="errors.has('Email')">{{ errors.first('Email') }}</span>
                    <br>
                    <input :class="{ 'input-error': errors.has('Password') }" class="form-control" type="text" placeholder="Password" v-model="password" v-validate="'required|min:6'" name="Password">
                    <span class="form-error"  v-show="errors.has('Password')">{{ errors.first('Password') }}</span>
                    <br>
                    <select :class="{ 'input-error': errors.has('Role') }" name="Role" id="user" v-model="role" class="form-control" v-validate="{ is_not: option }"> 
                        <option disabled>{{ option }}</option>
                        <option v-for="(role, index) in roles" :key="index" :value="role">{{ role }}</option>
                    </select>
                    <span class="form-error"  v-show="errors.has('Role')">{{ errors.first('Role') }}</span>
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
            role: null,
            roles: ['Admin', 'Manager', 'User'],
            option: 'Choose Role...'
        }
    },
  methods: {
    ...mapActions(['addUser']),
    validateBeforeSubmit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.addNewUser();
                }
            });
        },
    addNewUser() {
      this.addUser({
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role
      }).then(() => {
          this.$router.push({path: '/administrator/users'});
      })
    }
  },
  created() {
      this.role = this.option
  }
}
</script>


<style>
.input-error {
      border: 1px solid red;
  }

</style>

