<template>
    <div class="mt-3">
        <div class="d-flex justify-content-between">
            <span class="h3 m-0 user-title align-self-center">Add Team Member</span>
            <router-link :to="'team'" class="btn btn-primary">Back</router-link>
        </div>
        <hr>
        <div class="container card-body bg-light col-6 user-form">
            <div class="text-left">
                <h3 class="user-title">User Form</h3>
            </div>
            <form @submit.prevent="validateBeforeSubmit" class="d-flex-column justify-content-center">
                <div class="d-block text-left">
                    <br>
                    <input :class="{ 'input-error': errors.has('Name') }" class="form-control" type="text" placeholder="Name" v-model="name" v-validate="'required'" name="Name">.
                    <span class="form-error" v-show="errors.has('Name')">{{ errors.first('Name') }}</span>
                    <br>
                    <input :class="{ 'input-error': errors.has('Email'), 'input-error': invalidEmail }" class="form-control" type="email" placeholder="Email" v-model="email" v-validate="'required'" name="Email" @change="invalidEmail = false">
                    <span class="form-error"  v-show="errors.has('Email')">{{ errors.first('Email') }}</span>
                    <span v-if="invalidEmail" class="text-danger font-weight-bold mb-1">Please provide valid email: email@example.com</span>
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
            roles: ['Admin', 'Manager', 'User', 'Outsource'],
            option: 'Choose Role...',
            invalidEmail: false,
        }
    },
  methods: {
    ...mapActions(['addUser']),
    validateBeforeSubmit() {
            const validate = this.validateEmail()
            if(!validate) {
                return;
            }
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
          this.$router.push({path: '/administrator/team'});
      })
    },
    validateEmail() {
         var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         var user = this.email
         if(user) {
            const s = email.test(String(user).toLowerCase());
            if(!s) {
              this.invalidEmail = true
              return false
            } else {
              return true;
            }
         }
    },
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

  @media screen and (max-width: 767px) {
      .user-form {
          width: 100%!important;
          flex: 0 0 100%!important;
          max-width: 100%!important;
      }
  }

  @media screen and (max-width: 500px) {
      .user-title {
          font-size: 1rem!important;
      }
  }

</style>

