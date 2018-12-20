<template>
    <div class="d-flex flex-column align-items-center mt-3">
        <div class="card-body col-6 bg-light border-primary mb-2">
        <h4 class="text-left text-primary m-0"><i class="far fa-address-book mr-2"></i>New Business</h4>
        </div>
        <div class="col-6 card-body bg-light">
            <form @submit.prevent="addNewBusiness" class="d-flex-column justify-content-center">

                <div class="form-group">
                    <input type="text" class="form-control mb-3" v-model="business.business_name" placeholder="Business Name">
                    <input type="text" class="form-control mb-3" v-model="business.business_type" placeholder="LLC SCORP CORP">
                    <input type="text" class="form-control mb-3" v-model="business.address" placeholder="Address">
                    <input type="text" class="form-control mb-3" v-model="business.city" placeholder="City">
                    <input type="text" class="form-control mb-3" v-model="business.state" placeholder="State">
                    <input type="text" class="form-control mb-3" v-model="business.postal_code" placeholder="Postal Code">
                    <input type="email" class="form-control mb-3" v-model="business.email" placeholder="Email">
                    <input type="text" class="form-control mb-3" v-model="business.phone_number" placeholder="Phone Number">
                    <input type="text" class="form-control mb-3" v-model="business.fax_number" placeholder="Fax Number">
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
    name: 'AddBusiness',
    data() {
        return {
            business: {
                business_name: '',
                business_type: '',
                address: '',
                city: '',
                state: '',
                postal_code: '',
                email: '',
                phone_number: '',
                fax_number: ''
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
    ...mapActions(['addBusiness']),
    
    addNewBusiness() {
      
      this.addBusiness({
        id: this.idForBusiness,
        client_id: this.client.id,
        business_name: this.business.business_name,
        business_type: this.business.business_type,
        address: this.business.address,
        city: this.business.city,
        state: this.business.state,
        postal_code: this.business.postal_code,
        email: this.business.email,
        phone_number: this.business.phone_number,
        fax_number: this.business.fax_number
      })   
      .then(() => {
        this.business = "" 
        this.idForBusiness++
        this.$router.push({path: '/contact/' +this.client.id+ '/account', query: {alert: 'A new business has been added!'}});
      })
    },
  },

}
</script>


<style>

</style>

