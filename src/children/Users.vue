<template>
  <div class="mt-3">
    <div v-if="$route.name == 'users'">
      <div class="d-flex justify-content-between">
        <span class="h3 m-0">Team Members</span>
        <router-link :to="'add-user'" class="btn btn-primary">Add Team Member</router-link>
      </div>
      <hr>
      <Alert v-if="passwordAlert" v-bind:message="passwordAlert.message" />
      <table class="mt-4 table border table-light table-hover text-left">
        <thead class="text-primary hover">
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col" class="text-center px-0">Password</th>
                <th scope="col" class="text-center">Edit</th>
            </tr>
        </thead> 
        <tbody class="client-info table-bordered">
            <tr v-for="(user, index) in computedUsers"  :key="index" v-if="users.length > 0">
                <td class="text-capitalize">{{ user.user }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role.name }}</td>
                <td class="text-center"><button type="button" class="btn btn-sm btn-outline-primary" @click="selectedEmail(user.email)">Reset</button></td>
                <td class="text-center"><router-link :to="{path: '/administrator/users/edit-user/' + user.id}" class="btn btn-sm btn-secondary">Edit</router-link></td>
            </tr>
        </tbody>
    </table>

    <b-modal ref="modal" v-model="myModal" hide-footer title="Password Reset">
        <span class="h4">We will send a link to the following user, <strong>{{ userEmail }}</strong></span>
        <div class="d-flex">
          <b-btn class="mt-3" variant="secondary" @click="myModal = !myModal">Cancel</b-btn>
          <b-btn class="mt-3 ml-auto" variant="outline-primary" @click="requestReset()">Confirm</b-btn>
        </div>
    </b-modal>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Alert from '@/components/Alert.vue'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

export default {
  name: 'users',
  data () {
    return {
      myModal: false,
      userEmail: ''
    }
  },
   components:{
    'b-modal': bModal,
    Alert
  },
  directives: {
    'b-modal': bModalDirective
  },
  computed: {
    ...mapGetters(['users', 'passwordAlert']),
     computedUsers() {
       if(this.users.length > 0 ) {
          const index = 0
  		    return this.users.map((user) =>({id: user.id, user: user.name, email: user.email, role: user.roles[index]}))
       }  
    }
  },
  methods: {
    requestReset() {
      this.$store.dispatch('requestReset', this.userEmail)
      this.myModal = false
    },
    selectedEmail(email) {
      this.userEmail = email
      this.myModal = true
    }
  },
  created: function() {
    this.$store.dispatch('retrieveUsers');
  },
}
</script>


