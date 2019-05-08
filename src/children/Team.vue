<template>
  <div class="mt-3">
    <div v-if="$route.name == 'team'">
      <div class="d-flex justify-content-between">
        <span class="h3 m-0 team-title">Team Members</span>
        <router-link :to="{path: '/administrator/team/user/' + 0}" class="btn btn-primary font-weight-bold">Add Team Member</router-link>
      </div>
      <hr>
      <Alert v-if="passwordAlert" v-bind:message="passwordAlert.message" />
      <Alert v-if="successAlert" v-bind:message="successAlert" />
      <Alert v-if="processing" v-bind:message="'Sending Email To The Requested User...'" />
      <table class="mt-4 table border table-light table-hover text-left">
        <thead class="text-primary hover">
            <tr>
                <th scope="col">Name</th>
                <th scope="col" class="hide-row">Email</th>
                <th scope="col" class="hide-row">Role</th>
                <th scope="col" class="text-center px-0 hide-row">Password</th>
                <th scope="col" class="text-center">Edit</th>
                <th scope="col" class="text-center">Delete</th>
            </tr>
        </thead> 
        <tbody class="client-info table-bordered">
            <tr v-for="(user, index) in computedUsers"  :key="index" v-if="users.length > 0 && user.user != 'Admin'">
                <td class="text-capitalize">{{ user.user }}</td>
                <td class="hide-row">{{ user.email }}</td>
                <td class="hide-row">{{ user.role.name }}</td>
                <td class="text-center hide-row"><button type="button" class="btn btn-sm btn-outline-primary" @click="selectedEmail(user.email)">Reset</button></td>
                <td class="text-center"><router-link :to="{path: '/administrator/team/user/' + user.id}" class="btn btn-sm btn-secondary">Edit</router-link></td>
                <td class="text-center hide-row"><button type="button" class="btn btn-sm btn-danger" @click="requestDelete(user.id, user.user)">X</button></td>
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

    <b-modal v-model="deleteModal"  hide-footer title="Delete User">
        <div class="d-flex flex-column">
            <span>Are you sure you want to delete this user?</span>
            <span class="m-3">User: <strong>{{selectedName}}</strong></span>
        </div>
        <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-primary btn-sm" @click="confirmDelete">Confirm</button>
            <button type="button" class="btn btn-secondary btn-sm" @click="closeModal">Cancel</button>
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
  name: 'team',
  data () {
    return {
      myModal: false,
      deleteModal: false,
      selectedUser: null,
      selectedName: null,
      userEmail: '',
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
    ...mapGetters(['users', 'passwordAlert', 'successAlert', 'processing']),
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
    },
    requestDelete(id, name) {
          this.deleteModal = true
          this.selectedUser = id
          this.selectedName = name 
    },
    confirmDelete() {
        this.$store.dispatch('deleteUser', this.selectedUser)
        .then(() => {
            this.deleteModal = false
        })
    },
    closeModal() {
        this.deleteModal = false
    }
  },
  created: function() {
    this.$store.dispatch('retrieveUsers');
  },
}
</script>

<style scoped>

@media screen and (max-width: 840px) {
  .table {
    font-size: .8rem!important;
  }

  .hide-row {
    display: none!important;
  }

  .team-title {
    font-size: 1rem!important;
    align-self: center;
  }
}

@media screen and (max-width: 325px) {
  .btn-primary {
    display: none!important;
  }
}
</style>



