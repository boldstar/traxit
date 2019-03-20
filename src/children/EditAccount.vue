<template>
    <div class="d-flex flex-column align-items-center mt-3">
        <div class="card-body col-6 bg-light border-primary mb-2">
        <h4 class="text-left text-primary m-0"><i class="far fa-address-book mr-2"></i>Edit Account Details</h4>
        </div>
        <div class="col-6 card-body bg-light">
            <form @submit.prevent="editThisAccount" class="d-flex-column justify-content-center text-left">
              <input type="text" class="form-control mb-3" placeholder="Business Name" v-model="accountDetails.business_name">
              <input type="text" class="form-control mb-3" placeholder="Address" v-model="accountDetails.address">
              <input type="text" class="form-control mb-3" placeholder="City" v-model="accountDetails.city">
              <input type="text" class="form-control mb-3" placeholder="State" v-model="accountDetails.state">
              <input type="text" class="form-control mb-3" placeholder="Postal Code" v-model="accountDetails.postal_code">
              <input type="text" class="form-control" placeholder="Email" v-model="accountDetails.email" :class="{'border-danger' : invalidEmail, 'mb-3' : !invalidEmail}" @change="invalidEmail = false">
              <span v-if="invalidEmail" class="text-danger font-weight-bold mb-1">Please remove or provide valid email</span>
              <input type="text" class="form-control mb-3" placeholder="Phone Number" v-model="accountDetails.phone_number">
              <input type="text" class="form-control mb-3" placeholder="Fax Number" v-model="accountDetails.fax_number">
              <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">Update</button>
                <router-link to="/administrator/account" class="btn btn-secondary">Cancel</router-link>
              </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'EditAccount',
    data() {
      return {
        invalidEmail: false
      }
    },
    computed: {
    ...mapGetters(['accountDetails']),
  },
  methods: {
    ...mapActions(['updateAccountDetails']),
    
    editThisAccount() {
      const validate = this.validateEmail();
      if(!validate) {
        return;
      }
      this.updateAccountDetails({
        id: this.accountDetails.id,
        business_name: this.accountDetails.business_name,
        email: this.accountDetails.email,
        phone_number: this.accountDetails.phone_number,
        fax_number: this.accountDetails.fax_number,
        address: this.accountDetails.address,
        city: this.accountDetails.city,
        state: this.accountDetails.state,
        postal_code: this.accountDetails.postal_code,
        logo: this.accountDetails.logo,
      })   
      .then(() => {
        this.$router.push({path: '/administrator/account'});
      })
    },
    validateEmail() {
         var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         var accountEmail = this.accountDetails.email
         if(accountEmail != null) {
           if(accountEmail.length > 0) {
             const s = email.test(String(accountEmail).toLowerCase());
             if(!s) {
               this.invalidEmail = true
               return false
             } else {
               return true;
             }
           }
         }
         return true
    },
  },
  created: function(){
    this.$store.dispatch('getAccountDetails');
  }

}
</script>


<style>

</style>

