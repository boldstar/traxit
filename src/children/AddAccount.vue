<template>
    <div class="d-flex flex-column align-items-center mt-3">
        <div class="card-body col-6 bg-light border-primary mb-2">
        <h4 class="text-left text-primary m-0"><i class="far fa-address-book mr-2"></i>Add Account Details</h4>
        </div>
        <div class="col-6 card-body bg-light">
            <form @submit.prevent="addThisAccount" class="d-flex-column justify-content-center">
              <input type="text" class="form-control mb-3" placeholder="Business Name" v-model="account.business_name">
              <input type="text" class="form-control mb-3" placeholder="Address" v-model="account.address">
              <input type="text" class="form-control mb-3" placeholder="City" v-model="account.city">
              <input type="text" class="form-control mb-3" placeholder="State" v-model="account.state">
              <input type="text" class="form-control mb-3" placeholder="Postal Code" v-model="account.postal_code">
              <input type="text" class="form-control mb-3" placeholder="Email" v-model="account.email">
              <input type="text" class="form-control mb-3" placeholder="Phone Number" v-model="account.phone_number">
              <input type="text" class="form-control mb-3" placeholder="Fax Number" v-model="account.fax_number">
              <input type="text" class="form-control mb-3" placeholder="Subscription" v-model="account.subscription">
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
    name: 'EditDependent',
    data() {
      return {
        account: {
          business_name: '',
          email: '',
          phone_number: '',
          fax_number: '',
          address: '',
          city: '',
          state: '',
          postal_code: '',
          subscription: '',
        }
      }
    },
    computed: {
    ...mapGetters(['accountDetails']),
  },
  methods: {
    ...mapActions(['addAccountDetails']),
    
    addThisAccount() {
      
      this.addAccountDetails({
        id: this.idForAccount,
        business_name: this.account.business_name,
        email: this.account.email,
        phone_number: this.account.phone_number,
        fax_number: this.account.fax_number,
        address: this.account.address,
        city: this.account.city,
        state: this.account.state,
        postal_code: this.account.postal_code,
        logo: this.account.logo,
        subscription: this.account.subscription
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

