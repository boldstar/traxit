<template>
    <div class="d-flex flex-column align-items-center mt-3">
        <div class="card-body col-6 bg-light border-primary mb-2">
        <h4 class="text-left text-primary m-0"><i class="far fa-address-book mr-2"></i>New Dependent</h4>
        </div>
        <div class="col-6 card-body bg-light">
            <form @submit.prevent="addNewDependent" class="d-flex-column justify-content-center">

                <div class="form-group">
                    <input type="text" class="form-control" v-model="dependent.first_name" placeholder="First Name" :class="{'border-danger': dependentName, 'mb-3': !dependentName}" @change="dependentName = false">
                    <span v-if="dependentName" class="text-danger">Please Provide First Name</span>
                    <input type="text" class="form-control mb-3" v-model="dependent.middle_name" placeholder="Middle Initial">
                    <input type="text" class="form-control mb-3" v-model="dependent.last_name" placeholder="Last Name">
                    <input type="text" class="form-control mb-3" v-model="dependent.dob" placeholder="Date Of Birth">
                </div>


                <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary d-flex justify-content-start">Create</button>
                <router-link v-bind:to="'/contact/' +client.id+ '/account' " class="btn btn-secondary float-right">Cancel</router-link>
                </div>
        
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'AddDependent',
    data() {
        return {
            dependentName: false,
            dependent: {
                first_name: '',
                middle_name: '',
                last_name: '',
                dob: '',
            }
        }
    },
    computed: {
    ...mapGetters(
        [
          'client',
        ]
      ),
  },
  methods: {
    ...mapActions(['addDependent']),
    
    addNewDependent() {
      if(!this.dependent.first_name){
          this.dependentName = true
          return
      }
      this.addDependent({
        id: this.idForDependent,
        client_id: this.client.id,
        first_name: this.dependent.first_name,
        middle_name: this.dependent.middle_name,
        last_name: this.dependent.last_name,
        dob: this.dependent.dob,
      })   
      .then(() => {
        this.dependent = "" 
        this.idForDependent++
        this.$router.push({path: '/contact/' +this.client.id+ '/account', query: {alert: 'A new dependent has been added!'}});
      })
    },
  },

}
</script>


<style>

</style>

