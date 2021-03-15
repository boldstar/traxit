<template>
  <div class="page-wrapper mb-3 contact-form">

    <div class="server-error" v-if="serverError">{{ serverError }}</div>

    <div class="justify-content-start d-flex mb-1 p-3 shadow">
      <router-link to="/add" class="btn btn-sm btn-outline-secondary"><i class="fas fa-arrow-circle-left mr-2"></i>Back</router-link>
    </div>
    <div class="card-body bg-light border mb-2">
      <h4 class="text-left text-primary m-0"><i class="far fa-address-book mr-2"></i>New Contact</h4>
    </div>

    <form @submit.prevent="validateBeforeSubmit" class="d-flex-column justify-content-center bg-light border px-3 pt-3 pb-0 mb-3 text-left">
      <div class="form-group">

        <div class="input-group mb-3">
          <div class="input-group-prepend">
              <label class="input-group-text text-primary" for="option">Category</label>
          </div>
          <select :class="{ 'input-error': errors.has('Category Type') }"  class="form-control" id="type" v-model="client.category" name="Category Type" v-validate="{ is_not: option }">
            <option disabled>{{option}}</option>
            <option v-for="(category, index) in categoryList" :key="index + category.name" :value="category.name" v-show="categorySetting">{{ category.name }}</option>
            <option v-for="(category, index) in categories" :key="index" :value="category">{{ category }}</option>
          </select>
        </div>
        <span class="form-error" v-show="errors.has('Category Type')">{{ errors.first('Category Type') }}</span>


          <input type="text" :class="{ 'input-error': errors.has('Referral Type') }"  class="form-control mb-3" placeholder="Referral Type" v-model="client.referral_type" v-validate="'required'" name="Referral Type">
        <span class="form-error" v-show="errors.has('Referral Type')">{{ errors.first('Referral Type') }}</span>
        

        <h5 class="text-left mb-3">Taxpayer:</h5>
        <div class="d-flex mb-3 flex-mobile">
          <div class="col-5 px-0 form-div">
            <input type="text" :class="{ 'input-error': errors.has('First Name') }" class="form-control input-margin" placeholder="First Name" v-model="client.first_name" v-validate="'required'" name="First Name">
            <span class="form-error" v-show="errors.has('First Name')">{{ errors.first('First Name') }}</span>
          </div>
          <div class="mx-2 initial-input">
            <input type="text" class="form-control input-margin" placeholder="Middle Initial" v-model="client.middle_initial" name="Middle Initial">
          </div>
          <div class="col-5 px-0 form-div">
            <input type="text" :class="{ 'input-error': errors.has('Last Name') }" class="form-control" placeholder="Last Name" v-model="client.last_name" v-validate="'required'" name="Last Name">
            <span class="form-error" v-show="errors.has('Last Name')">{{ errors.first('Last Name') }}</span>
          </div>
        </div>      
 
        <div class="d-flex mb-3 flex-mobile">
          <input type="text" class="form-control mr-2 input-margin" placeholder="Occupation" v-model="client.occupation" name="Occupation">
          <date-input v-model="client.dob" :placeholder="'Date Of Birth'" mask-type="date" :name="'Date Format'"></date-input>
        </div>

        <div class="d-flex mb-3 flex-mobile">
          <input type="email" class="form-control input-margin" placeholder="email@example.com" v-model="client.email" name="Email" :class="{'border-danger':taxpayerEmailInvalid}" @change="taxpayerEmailInvalid = false">
          <number-input :placeholder="'Cell Phone'" v-model="client.cell_phone" mask-type="number" class="mx-2 input-margin form-control"></number-input>
          <number-input :placeholder="'Work Phone'" v-model="client.work_phone" mask-type="number" class="form-control"></number-input>
        </div>
        <label for="email" class="text-danger font-weight-bold" v-if="taxpayerEmailInvalid">Please Remove Or Provide A Valid Email</label>


        <div class="d-flex mb-3 bg-light p-2 custom-control custom-checkbox bg-white form-control" v-bind:class="{'input-error' : has_spouse_alert}">
          <span class="mr-3 font-weight-bold mb-1 h6">Does Contact Have Spouse?</span>
          <input type="checkbox" v-model="client.has_spouse" class="custom-control-input" id="customCheck1" @change="has_spouse_alert = false">
          <label class="custom-control-label ml-3 align-self-start" for="customCheck1"></label>
          <small v-if="has_spouse_alert" class="text-danger">If contact does not have spouse, please uncheck the has spouse checkbox</small>
        </div>
        

        <h5 class="text-left mb-3" v-if="client.has_spouse == true">Spouse:</h5>
        <small v-if="clear_spouse_field" class="text-danger">Please clear spouse input fields if client does not have spouse</small>
        <div class="d-flex mb-3 flex-mobile" v-if="client.has_spouse == true">
          <input type="text" class="form-control col-5 form-div input-margin" placeholder="First Name" v-model="client.spouse_first_name" name="Spouse First Name">
          <input type="text" class="form-control mx-2 input-margin" placeholder="Middle Initial" v-model="client.spouse_middle_initial" name="Spouse Middle Inital">
          <input type="text" class="form-control col-5 form-div" placeholder="Last Name" v-model="client.spouse_last_name" name="Spouse Last Name">
        </div>

        <div class="d-flex mb-3 flex-mobile" v-if="client.has_spouse == true">
          <input type="text" class="form-control mr-2 input-margin" placeholder="Occupation" v-model="client.spouse_occupation" name="Spouse Occupation">
          <date-input v-model="client.spouse_dob" :placeholder="'Date Of Birth'" mask-type="date" :name="'Spouse Date Format'"></date-input>
        </div>

        <div class="d-flex mb-3 flex-mobile" v-if="client.has_spouse == true">
          <input type="email" id="spouse_email" class="form-control input-margin" placeholder="email@example.com" v-model="client.spouse_email" name="Spouse Email" :class="{'border-danger': spouseEmailInvalid}" @change="spouseEmailInvalid = false">
          <number-input :placeholder="'Cell Phone'"  v-model="client.spouse_cell_phone" mask-type="number" class="mx-2 input-margin form-control"></number-input>
          <number-input :placeholder="'Work Phone'"  v-model="client.spouse_work_phone" mask-type="number" class="form-control"></number-input>
        </div>
        <label for="spouse_email" class="text-danger font-weight-bold" v-if="spouseEmailInvalid">Please Remove Or Provide A Valid Email</label>

        <h5 class="text-left mb-3">Address:</h5>
        <div class="d-flex mb-4 flex-mobile">
          <input type="text" class="form-control input-margin" placeholder="Street Address" v-model="client.street_address" name="Street Address">
          <input type="text" class="form-control ml-2 mr-1 input-margin" placeholder="City" v-model="client.city" name="City">
          <input type="text" class="form-control ml-1 mr-2 input-margin" placeholder="State" v-model="client.state" name="State">
          <input type="text" class="form-control" placeholder="Postal Code" v-model="client.postal_code" name="Postal Code">
        </div>

      <button type="submit" class="btn btn-primary d-flex justify-content-start">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NumberInput from '@/components/forms/NumberInput.vue'
import DateInput  from '@/components/forms/DateInput.vue'

export default {
  name: 'contact',
  components: {
    NumberInput,
    DateInput
  },
  data () {
    return {
      has_spouse_alert: false,
      clear_spouse_field: false,
      spouseEmailInvalid: false,
      taxpayerEmailInvalid: false,
      client: {
        id: '',
        category: null,
        referral_type: '',
        first_name: '',
        middle_initial: '',
        last_name: '',
        occupation: '',
        dob: '',
        email: '',
        cell_phone: '',
        work_phone: '',
        has_spouse: true,
        spouse_first_name: '',
        spouse_middle_initial: '',
        spouse_last_name: '',
        spouse_occupation: '',
        spouse_dob: '',
        spouse_email: '',
        spouse_cell_phone: '',
        spouse_work_phone: '',
        street_address: '',
        city: '',
        state: '',
        postal_code: '',
      },
        categories: ['Client', 'Prospect'],
        option: 'Choose..',
        serverError: '',
    }
  },
  computed: {
    ...mapGetters(['categoryList', 'settingsList']),
    categorySetting() {
      if(this.settingsList && this.settingsList.length > 0) {
        return this.settingsList.filter(setting => setting.name == 'contact_categories')[0].state
      }
    }
  },
  methods: {
    ...mapActions(['addClient']),

    validateBeforeSubmit() {
            const validate = this.validateEmail()
            if(!validate) {
              return;
            }
            this.$validator.validateAll().then((result) => {
                if(this.client.has_spouse == true && this.client.spouse_first_name === '') {
                  this.has_spouse_alert = true
                  return;
                }
                if(this.client.has_spouse == false && this.client.spouse_first_name != '' || this.client.has_spouse == false && this.client.spouse_last_name != '') {
                  this.clear_spouse_field = true
                  this.client.has_spouse = true

                  return;
                }
                else if (result) {
                    this.addNewClient();
                }
            });
        },

    addNewClient() {
        this.addClient({
          id: this.idForClient,
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
          this.client = "" 
          this.idForClient++
          this.$router.push({path: '/add'})
        })
        .catch(error => {
            this.serverError = error.response.data
        })
    },
    validateEmail() {
         var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         var taxpayer = this.client.email
         var spouse = this.client.spouse_email
         if(taxpayer != '' && spouse != '') {
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
         if(taxpayer != '') {
            const t = email.test(String(taxpayer).toLowerCase());
            if(!t) {
              this.taxpayerEmailInvalid = true
              return false;
            } else {
              return true;
            }
         }
         if(spouse != '') {
            const s = email.test(String(spouse).toLowerCase());
            if(!s) {
              this.spouseEmailInvalid = true
              return false
            } else {
              return true;
            }
         }
         return true;
    },
  },
  created: function() {
    this.$store.dispatch('getCategoryOptions', {belongs_to: 'contact_categories'})
    this.client.category = this.option
  }
}
</script>

<style scoped>
.input-error {
      border: 1px solid red;
  }

.contact-form {
  width: 70%;
}

@media screen and (max-width: 800px) {
  .contact-form {
    width: 100%!important;
  }
}

@media screen and (max-width: 600px) {
  .flex-mobile {
    flex-direction: column!important;
  }

  .form-control {
    width: 100%!important;
    margin: 0!important;
  }

  .form-div{
    width: 100%!important;
    flex: 0 0 100%!important;
    max-width: 100%!important;
  }

  .initial-input {
    margin: 0!important;
  }

  .input-group {
    display: flex!important;
    flex-wrap: nowrap;
  }

  .input-margin {
    margin-bottom: 5px!important;
  }
}
</style>
