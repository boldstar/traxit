<template>
    <div class="mt-3">
        <div class="d-flex justify-content-between">
            <span class="h3 m-0">Add Team Member</span>
            <router-link :to="'/administrator/users'" class="btn btn-primary">Back</router-link>
        </div>
        <hr>
        <div class="container card-body bg-light col-6">
            <div class="text-left">
                <h3>Edit Team Member</h3>
            </div>
            <form @submit.prevent="validateBeforeSubmit" class="d-flex-column justify-content-center" v-if="user">
                <div class="d-block text-left">
                    <br>
                    <input :class="{ 'input-error': errors.has('Name') }" class="form-control" type="text" placeholder="Name" v-model="user.name" v-validate="'required'" name="Name">.
                    <span class="form-error" v-show="errors.has('Name')">{{ errors.first('Name') }}</span>
                    <br>
                    <input :class="{ 'input-error': errors.has('Email') }" class="form-control" type="text" placeholder="Email" v-model="user.email" v-validate="'required'" name="Email">
                    <span class="form-error"  v-show="errors.has('Email')">{{ errors.first('Email') }}</span>
                    <br>
                    <select :class="{ 'input-error': errors.has('Role') }" name="Role" id="user" v-model="user.roles[0].name" class="form-control" v-validate="{ is_not: option }">
                        <option disabled>{{ option }}</option> 
                        <option v-for="(role, index) in roles" :key="index" :value="role">{{ role }}</option>
                    </select>
                    <span class="form-error"  v-show="errors.has('Role')">{{ errors.first('Role') }}</span>
                    <br>
                </div>
                <div class="d-flex justify-content-between">
                    <button type="submit" class="btn btn-primary">Update</button>
                    <router-link class="btn btn-secondary" :to="{ path: '/administrator/users' }">Cancel</router-link>
                </div>   
            </form>
        </div>      
    </div>
</template>

<script>
import {  mapActions, mapGetters } from 'vuex'

export default {
    name: 'EditUser',
    data() {
        return {
            roles: ['Admin', 'Manager', 'User'],
            option: 'Choose Role...'
        }
    },
    computed: {
        ...mapGetters(['user'])
    },
  methods: {
    ...mapActions(['updateUser']),
    validateBeforeSubmit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.updateThisUser();
                }
            });
        },
    updateThisUser() {
      this.updateUser({
        id: this.user.id,
        name: this.user.name,
        email: this.user.email,
        role: this.user.roles[0].name
      }).then(() => {
          this.$router.push({path: '/administrator/users'});
      })
    }
  },
  created() {
      this.$store.dispatch('retrieveUserToUpdate', this.$route.params.id)
  }
}
</script>


<style>
.input-error {
      border: 1px solid red;
  }

</style>

