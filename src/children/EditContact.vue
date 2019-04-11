<template>
  <div class="page-wrapper mt-1">


  <form @submit.prevent="updateThisClient" class="d-flex-column justify-content-center text-left">
      <div class="form-group">
        <select class="form-control mb-3" id="category" v-model="client.category">
          <option v-for="category in categories" :key="category.id" :value="category">{{ category }}</option>
        </select>
        <input type="text" class="form-control mb-3" placeholder="Referral Type" v-model="client.referral_type">
        <div class="d-flex mb-3 p-2 custom-control custom-checkbox bg-white form-control">
          <span class="mr-3 font-weight-bold mb-1 h6">Is Contact Active?</span>
          <input type="checkbox" v-model="client.active" class="custom-control-input" id="customCheck2">
          <label class="custom-control-label ml-3 align-self-start" for="customCheck2"></label>
        </div>
        <div class="d-flex mb-3 bg-light p-2 custom-control custom-checkbox bg-white form-control" v-bind:class="{'border-danger' : has_spouse_alert}">
          <span class="mr-3 font-weight-bold mb-1 h6">Does Contact Have Spouse?</span>
          <input type="checkbox" v-model="client.has_spouse" class="custom-control-input" id="customCheck1" @change="has_spouse_alert = false">
          <label class="custom-control-label ml-3 align-self-start" for="customCheck1"></label>
          <small v-if="has_spouse_alert" class="text-danger">If contact does not have spouse, please uncheck the has spouse checkbox</small>
        </div>

        <h5 class="text-left mb-3">Taxpayer:</h5>
        <div class="d-flex mb-3">
          <input type="text" class="form-control col-5" placeholder="First Name" v-model="client.first_name">
          <input type="text" class="form-control mx-2" placeholder="Middle Initial" v-model="client.middle_initial">
          <input type="text" class="form-control col-5" placeholder="Last Name" v-model="client.last_name">
        </div>      
 
        <div class="d-flex mb-3">
          <input type="text" class="form-control mr-2" placeholder="Occupation" v-model="client.occupation">
          <input type="text" class="form-control" placeholder="Date Of Birth" v-model="client.dob">
        </div>

        <div class="d-flex mb-3">
          <input type="text" class="form-control" placeholder="email@example.com" v-model="client.email" :class="{'border-danger' : taxpayerEmailInvalid}" @change="taxpayerEmailInvalid = false">
          <number-input :placeholder="'Cell Phone'" v-model="client.cell_phone" mask-type="number" class="mx-2"></number-input>
          <number-input :placeholder="'Work Phone'" v-model="client.work_phone" mask-type="number"></number-input>
        </div>
        <label for="email" class="text-danger font-weight-bold" v-if="taxpayerEmailInvalid">Please Remove Or Provide A Valid Email</label>

        <div v-if="client.has_spouse == true">
          <h5 class="text-left mb-3">Spouse:</h5>
          <div class="d-flex mb-3">
            <input type="text" class="form-control col-5" placeholder="First Name" v-model="client.spouse_first_name">
            <input type="text" class="form-control mx-2" placeholder="Middle Initial" v-model="client.spouse_middle_initial">
            <input type="text" class="form-control col-5" placeholder="Last Name" v-model="client.spouse_last_name">
          </div>

          <div class="d-flex mb-3">
            <input type="text" class="form-control mr-2" placeholder="Occupation" v-model="client.spouse_occupation">
            <input type="text" class="form-control" placeholder="Date Of Birth" v-model="client.spouse_dob">
          </div>

          <div class="d-flex mb-3">
            <input type="text" class="form-control" placeholder="email@example.com" v-model="client.spouse_email" :class="{'border-danger' : spouseEmailInvalid}" @change="spouseEmailInvalid = false">
            <number-input :placeholder="'Cell Phone'"  v-model="client.spouse_cell_phone" mask-type="number" class="mx-2"></number-input>
            <number-input :placeholder="'Work Phone'"  v-model="client.spouse_work_phone" mask-type="number"></number-input>
          </div>
          <label for="spouse_email" class="text-danger font-weight-bold" v-if="spouseEmailInvalid">Please Remove Or Provide A Valid Email</label>
        </div>
        
        <h5 class="text-left mb-3">Address:</h5>
        <div class="d-flex mb-4">
          <input type="text" class="form-control" placeholder="Street Address" v-model="client.street_address">
          <input type="text" class="form-control ml-2 mr-1" placeholder="City" v-model="client.city">
          <input type="text" class="form-control ml-1 mr-2" placeholder="State" v-model="client.state">
          <input type="text" class="form-control" placeholder="Postal Code" v-model="client.postal_code">
        </div>

      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary d-flex justify-content-start">Save Changes</button>
        <router-link :to="'/contact/' +client.id+'/account'" class="btn btn-secondary">Cancel</router-link>
      </div>
      </div>
    </form>

  


  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import DateInput from '@/components/DateInput.vue'
import NumberInput from '@/components/NumberInput.vue'

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
          'client'
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
      this.updateClient( {
        id: this.client.id,
        active: this.client.active,
        category: this.client.category,
        referral_type: this.client.referral_type,
        first_name: this.client.first_name,
        middle_initial: this.client.middle_initial,
        last_name: this.client.last_name,
        occupation: this.client.occupation,
        dob: this.client.dob,
        email: this.client.email,
        cell_phone: this.client.cell_phone,
        work_phone: this.client.work_phone,
        has_spouse: this.client.has_spouse,
        spouse_first_name: this.client.spouse_first_name,
        spouse_middle_initial: this.client.spouse_middle_initial,
        spouse_last_name: this.client.spouse_last_name,
        spouse_occupation: this.client.spouse_occupation,
        spouse_dob: this.client.spouse_dob,
        spouse_email: this.client.spouse_email,
        spouse_cell_phone: this.client.spouse_cell_phone,
        spouse_work_phone: this.client.spouse_work_phone,
        street_address: this.client.street_address,
        city: this.client.city,
        state: this.client.state,
        postal_code: this.client.postal_code,
      })
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
      this.client.category = this.categories[0]
    }
}
</script>
