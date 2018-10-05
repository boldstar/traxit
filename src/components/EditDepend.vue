<template>
    <div class="d-flex flex-column align-items-center mt-3">
        <div class="card-body col-6 bg-light border-primary mb-2">
        <h4 class="text-left text-primary m-0"><i class="far fa-address-book mr-2"></i>Edit Dependent</h4>
        </div>
        <div class="col-6 card-body bg-light">
            <form @submit.prevent="editThisDependent" class="d-flex-column justify-content-center">

                <div class="form-group">
                    <input type="text" class="form-control mb-3" v-model="dependent.first_name" placeholder="First Name">
                    <input type="text" class="form-control mb-3" v-model="dependent.middle_name" placeholder="Middle Initial">
                    <input type="text" class="form-control mb-3" v-model="dependent.last_name" placeholder="Last Name">
                    <input type="text" class="form-control mb-3" v-model="dependent.dob" placeholder="Date Of Birth">
                </div>


                <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary d-flex justify-content-start">Save Changes</button>
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
            dependent: {
            
            }
        }
    },
    computed: {
    ...mapGetters(
        [
          'client',
          'dependent'
        ]
      ),
  },
  methods: {
    ...mapActions(['updateDependent']),
    
    editThisDependent() {
      if(!this.dependent.first_name || !this.dependent.last_name || !this.dependent.dob ) return;
      
      this.updateDependent({
        id: this.idForDependent,
        client_id: this.client.id,
        first_name: this.dependent.first_name,
        middle_name: this.dependent.middle_name,
        last_name: this.dependent.last_name,
        dob: this.dependent.dob,
      })   
      .then(() => {
        this.$router.push({path: '/contact/' +this.client.id+ '/account', query: {alert: 'The dependent has been edited!'}});
      })
    },
  },
  created: function(){
    this.$store.dispatch('getDetails', this.$route.params.id);
  }

}
</script>


<style>

</style>

