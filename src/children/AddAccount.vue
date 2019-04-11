<template>
    <div class="d-flex flex-column align-items-center mt-3">
        <div class="card-body col-6 bg-light border-primary mb-2">
        <h4 class="text-left text-primary m-0 account-header"><i class="far fa-address-book mr-2"></i>Add Account Details</h4>
        </div>
        <div class="col-6 card-body bg-light account-form">
            <form @submit.prevent="addThisAccount" class="d-flex-column justify-content-center">
              <input type="text" class="form-control mb-3" placeholder="Business Name" v-model="accountDetails.business_name">
              <input type="text" class="form-control mb-3" placeholder="Address" v-model="accountDetails.address">
              <input type="text" class="form-control mb-3" placeholder="City" v-model="accountDetails.city">
              <input type="text" class="form-control mb-3" placeholder="State" v-model="accountDetails.state">
              <input type="text" class="form-control mb-3" placeholder="Postal Code" v-model="accountDetails.postal_code">
              <input type="text" class="form-control mb-3" placeholder="Email" v-model="accountDetails.email">
              <input type="text" class="form-control mb-3" placeholder="Phone Number" v-model="accountDetails.phone_number">
              <input type="text" class="form-control mb-3" placeholder="Fax Number" v-model="accountDetails.fax_number">
              <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">Submit</button>
                <router-link to="/administrator/account" class="btn btn-secondary">Cancel</router-link>
              </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'AddAccount',
    data() {
      return {
       accountDetails: {
         business_name: '',
         email: '',
         phone_number: '',
         fax_number: '',
         address: '',
         city: '',
         state: '',
         postal_code: '',
       }
      }
    },
  methods: {
    ...mapActions(['addAccountDetails']),
    
    addThisAccount() {
      
      this.addAccountDetails({
        id: this.idForAccount,
        business_name: this.accountDetails.business_name,
        email: this.accountDetails.email,
        phone_number: this.accountDetails.phone_number,
        fax_number: this.accountDetails.fax_number,
        address: this.accountDetails.address,
        city: this.accountDetails.city,
        state: this.accountDetails.state,
        postal_code: this.accountDetails.postal_code,
      })   
      .then(() => {
        this.idForAccount++ 
        this.$router.push({path: '/administrator/account'});
      })
    },
  },
  created: function(){
    this.$store.dispatch('getAccountDetails');
  }

}
</script>

<style scoped>
@media screen and (max-width: 767px) {
  .account-form {
    width: 100%!important;
    flex: 0 0 100%!important;
    max-width: 100%!important;
  }

  .account-header {
    font-size: 1rem!important;
  }
}

</style>


