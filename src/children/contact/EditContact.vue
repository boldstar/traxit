<template>
  <div class="page-wrapper mt-1">

  <form @submit.prevent="updateThisClient" class="d-flex-column justify-content-center text-left card p-2 pt-3 shadow-sm mb-4">
      <div class="form-group">

        <div class="custom-input-group">
          <label for="category">Category</label>
          <select id="category" v-model="client.category">
            <option v-for="category in categoryList" :key="category.id + category.name" :value="category.name">{{ category.name }}</option>
            <option v-for="category in categories" :key="category.id" :value="category">{{ category }}</option>
          </select>
        </div>

        <div class="custom-input-group">
          <label for="referral_type">Referral Type</label>
          <input type="text" placeholder="Referral Type" v-model="client.referral_type">
        </div>
        
        <div class="custom-checkbox-group mb-2">
          <div class="d-flex bg-light p-2 custom-control custom-checkbox" v-bind:class="{'border-danger' : has_spouse_alert}">
            <span class="mr-3 font-weight-bold mb-1 h6">Has Spouse: </span>
            <input type="checkbox" v-model="client.has_spouse" class="custom-control-input" id="customCheck1" @change="has_spouse_alert = false">
            <label class="custom-control-label ml-3 align-self-start" for="customCheck1"></label>
            <small v-if="has_spouse_alert" class="text-danger">If contact does not have spouse, please uncheck the has spouse checkbox</small>
          </div>
        </div>

        <h5 class="text-left m-2">Taxpayer:</h5>
        <div class="d-flex">
          <div class="custom-input-group client-input-33">
            <label for="first_name">First Name</label>
            <input type="text" placeholder="First Name" v-model="client.first_name">
          </div>
          <div class="custom-input-group client-input-33">
            <label for="middle_init">Middle Initial</label>
            <input type="text" placeholder="Middle Initial" v-model="client.middle_initial">
          </div>
          <div class="custom-input-group client-input-33">
            <label for="last_name">Last Name</label>
            <input type="text" placeholder="Last Name" v-model="client.last_name">
          </div>
        </div>      
 
        <div class="d-flex">
          <div class="custom-input-group client-input-50">
            <label for="occupation">Occupation</label>
            <input type="text" placeholder="Occupation" v-model="client.occupation">
          </div>
          <div class="custom-input-group client-input-50">
            <label for="dob">Date of Birth</label>
            <input type="text" placeholder="Date Of Birth" v-model="client.dob">
          </div>
        </div>

        <div class="d-flex">
          <div class="custom-input-group client-input-33">
            <label for="email">Email</label>
            <input type="text" placeholder="email@example.com" v-model="client.email" :class="{'border-danger' : taxpayerEmailInvalid}" @change="taxpayerEmailInvalid = false">
          </div>
          <div class="custom-input-group client-input-33">
            <label for="cell_phone">Cell Phone</label>
            <number-input :placeholder="'Cell Phone'" v-model="client.cell_phone" mask-type="number"></number-input>
          </div>
          <div class="custom-input-group client-input-33">
            <label for="work_phone">Work Phone</label>
            <number-input :placeholder="'Work Phone'" v-model="client.work_phone" mask-type="number"></number-input>
          </div>
        </div>
        <label for="email" class="text-danger font-weight-bold" v-if="taxpayerEmailInvalid">Please Remove Or Provide A Valid Email</label>

        <div v-if="client.has_spouse == true">
          <h5 class="text-left m-2">Spouse:</h5>
          <div class="d-flex">
            <div class="custom-input-group client-input-33">
              <label for="spouse_first_name">First Name</label>
              <input type="text" placeholder="First Name" v-model="client.spouse_first_name">
            </div>
            <div class="custom-input-group client-input-33">
              <label for="spouse_middle_name">Middle Name</label>
              <input type="text" placeholder="Middle Initial" v-model="client.spouse_middle_initial">
            </div>
            <div class="custom-input-group client-input-33">
              <label for="spouse_last_name">Last Name</label>
              <input type="text" placeholder="Last Name" v-model="client.spouse_last_name">
            </div>
          </div>

          <div class="d-flex">
            <div class="custom-input-group client-input-50">
              <label for="spouse_occupation">Occupation</label>
              <input type="text" placeholder="Occupation" v-model="client.spouse_occupation">
            </div>
            <div class="custom-input-group client-input-50">
              <label for="spouse_dob">Date of Birth</label>
              <input type="text" placeholder="Date Of Birth" v-model="client.spouse_dob">
            </div>
          </div>

          <div class="d-flex">
            <div class="custom-input-group client-input-33">
              <label for="spouse_email">Email</label>
              <input type="text" placeholder="email@example.com" v-model="client.spouse_email" :class="{'border-danger' : spouseEmailInvalid}" @change="spouseEmailInvalid = false">
            </div>
            <div class="custom-input-group client-input-33">
              <label for="spouse_cell_phone">Cell Phone</label>
              <number-input :placeholder="'Cell Phone'"  v-model="client.spouse_cell_phone" mask-type="number"></number-input>
            </div>
            <div class="custom-input-group client-input-33">
              <label for="spouse_work_phone">Work Phone</label>
              <number-input :placeholder="'Work Phone'"  v-model="client.spouse_work_phone" mask-type="number"></number-input>
            </div>
          </div>
          <label for="spouse_email" class="text-danger font-weight-bold" v-if="spouseEmailInvalid">Please Remove Or Provide A Valid Email</label>
        </div>
        
        <h5 class="text-left m-2">Address:</h5>
        <div class="d-flex">
          <div class="custom-input-group client-input-25">
            <label for="address">Address</label>
            <input type="text" placeholder="Street Address" v-model="client.street_address">
          </div>
          <div class="custom-input-group client-input-25">
            <label for="city">City</label>
            <input type="text" placeholder="City" v-model="client.city">
          </div>
          <div class="custom-input-group client-input-25">
            <label for="state">State</label>
            <input type="text" placeholder="State" v-model="client.state">
          </div>
          <div class="custom-input-group client-input-25">
            <label for="postal_code">Postal Code</label>
            <input type="text" placeholder="Postal Code" v-model="client.postal_code">
          </div>
        </div>

      <div class="d-flex justify-content-between p-2">
        <button type="submit" class="btn btn-primary font-weight-bold">Save Changes</button>
        <router-link :to="'/contact/' +client.id+'/account'" class="btn btn-secondary font-weight-bold">Cancel</router-link>
      </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import DateInput from '@/components/forms/DateInput.vue'
import NumberInput from '@/components/forms/NumberInput.vue'

export default {
  name: 'EditContact',
  components: {
    DateInput,
    NumberInput
  },
  data () {
    return {
      has_spouse_alert: false,
      spouseEmailInvalid: false,
      taxpayerEmailInvalid: false,
      categories: [ 'Choose Category...', 'Client', 'Prospect'],
    }
  },
  computed: {
    ...mapGetters(
        [
          'client',
          'categoryList'
        ]
      )
  },
  methods: {
    ...mapActions(['updateClient']),
    updateThisClient() {
        if(this.client.dob == 'Invalid date') {
          this.client.dob = null
        } else if (this.client.spouse_dob == 'Invalid date') {
          this.client.spouse_dob = null
        }
        if(this.client.has_spouse == false) {
          this.client.spouse_first_name = null
          this.client.spouse_middle_initial = null
          this.client.spouse_last_name = null
          this.client.spouse_dob = null
          this.client.spouse_occupation = null
          this.client.spouse_email = null
          this.client.spouse_cell_phone = null
          this.client.spouse_work_phone = null
          this.proceedWithUpdate()
        } else if(this.client.has_spouse == true && this.client.spouse_first_name == '' || this.client.spouse_first_name == null){
          this.has_spouse_alert = true;
          return;
        } else {
          this.proceedWithUpdate()
        } 
    },
    proceedWithUpdate() {
      const validate = this.validateEmail()
      if(!validate) {
        return;
      }
      this.updateClient(this.client)
      .then(() => {
        this.$router.push({path: '/contact/' +this.client.id+ '/account'})
      })
    },
     validateEmail() {
         var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         var taxpayer = this.client.email
         var spouse = this.client.spouse_email
         if(taxpayer != null && spouse !=  null) {
           if(taxpayer.length > 0 && spouse.length > 0) {
             if(email.test(String(taxpayer).toLowerCase()) && email.test(String(spouse).toLowerCase())) {
                 return true;
             } else {
               if(!email.test(String(taxpayer).toLowerCase())) {
                 this.taxpayerEmailInvalid = true
               }
               if(!email.test(String(spouse).toLowerCase())) {
                 this.spouseEmailInvalid = true
               }
                 return false
             }
           }
         }
         if(taxpayer !=  null) {
           if(taxpayer.length > 0) {
             const t = email.test(String(taxpayer).toLowerCase());
             if(!t) {
               this.taxpayerEmailInvalid = true
               return false;
             } else {
               return true;
             }
           }
         }
         if(spouse !=  null) {
           if(spouse.length > 0 ) {
             const s = email.test(String(spouse).toLowerCase());
             if(!s) {
               this.spouseEmailInvalid = true
               return false
             } else {
               return true;
             }
           }
         }
         return true;
    },
    },
    created: function() {
      this.$store.dispatch('editDetails', this.$route.params.id);
      this.$store.dispatch('getCategoryOptions', {belongs_to: 'contact_categories'})
      this.client.category = this.categories[0]
    }
}
</script>

<style lang="scss" scoped>
  .custom-checkbox-group {
    border: 2px inset rgb(228, 228, 228);
    margin: 0 10px;
    border-radius: 5px;
    margin-bottom: 8px;
  }

  .client-input-25 {
    width: 25%;
  }

  .client-input-33 {
    width: 33%;
  }

  .client-input-50 {
    width: 50%;
  }
</style>
