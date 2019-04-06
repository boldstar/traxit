<template>
    <div class="mt-3">
        <div class="d-flex justify-content-between">
            <span class="h3 m-0">Add Team Member</span>
            <router-link :to="'/administrator/team'" class="btn btn-primary">Back</router-link>
        </div>
        <hr>
        <div class="card shadow col-6 mx-auto mt-5">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h5 class="mb-0">Edit Team Member</h5>
                    <button class="btn btn-sm btn-danger" @click="requestDelete">Delete User</button>
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
                        <router-link class="btn btn-secondary" :to="{ path: '/administrator/team' }">Cancel</router-link>
                    </div>   
                </form>
            </div>      
        </div>

        <b-modal v-model="deleteModal"  hide-footer title="Delete User">
        <div class="d-flex flex-column">
            <span>Are you sure you want to delete this user?</span>
            <span class="m-3">User: <strong>{{user.name}}</strong></span>
        </div>
        <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-primary btn-sm" @click="confirmDelete">Confirm</button>
            <button type="button" class="btn btn-secondary btn-sm" @click="closeModal">Cancel</button>
        </div>
      </b-modal>
    </div>
</template>

<script>
import {  mapActions, mapGetters } from 'vuex'
import bModal from 'bootstrap-vue/es/components/modal/modal';
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal';

export default {
    name: 'EditUser',
    data() {
        return {
            roles: ['Admin', 'Manager', 'User', 'Outsource'],
            option: 'Choose Role...',
            deleteModal: false
        }
    },
    components:{
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
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
                this.$router.push({path: '/administrator/team'});
            })
        },
        requestDelete() {
            this.deleteModal = true
        },
        confirmDelete() {
            this.$store.dispatch('deleteUser', {
                id: this.user.id
            })
            .then(() => {
                this.deleteModal = false
                this.$router.push({path: '/administrator/team'})
            })
        },
        closeModal() {
            this.deleteModal = false
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

