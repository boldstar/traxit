<template>
    <div class="business-form mb-3">
        <div class="justify-content-between d-flex mb-1 border shadow p-3">
            <router-link to="/add" class="btn btn-sm btn-outline-secondary"><i class="fas fa-arrow-circle-left mr-2"></i>Back</router-link>
            <div class="d-flex">
            <router-link to="/add/contact" class="btn btn-sm btn-outline-primary"><i class="fas fa-plus mr-2"></i>Contact</router-link>
            </div>
        </div>
        <div class="card-body bg-light border mb-2">
        <h4 class="text-left text-primary m-0"><i class="far fa-building mr-2"></i>New Business</h4>
        </div>
        <div class="card-body bg-light border">
            <form @submit.prevent="validateBeforeSubmit" class="d-flex-column justify-content-center">

                <div class="form-group">
                    <div class="input-group my-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text text-primary" for="option">Find Contact</label>
                        </div>
                        <select :class="{ 'input-error': errors.has('Contact') }" class="form-control" id="client_id" v-model.number="business.client_id" v-validate="{ is_not: option }" name="Contact">
                            <option disabled>{{ option }}</option>
                            <option v-for="client in sortClients" :key="client.id" :value="client.id">
                            {{ client.last_name }}, {{client.first_name}} <span v-if="client.has_spouse == 1"> & </span>{{client.spouse_first_name }}
                            </option>
                        </select>
                    </div>
                    <span class="form-error" v-show="errors.has('Contact')">{{ errors.first('Contact') }}</span>

                    <input type="text" :class="{ 'input-error': errors.has('Business Name') }" class="form-control mb-3" v-model="business.business_name" placeholder="Business Name" name="Business Name" v-validate="'required'">
                    <span class="form-error" v-show="errors.has('Business Name')">{{ errors.first('Business Name') }}</span>
                    
                    <input type="text" class="form-control mb-3" v-model="business.address" placeholder="Address">
                    <input type="text" class="form-control mb-3" v-model="business.city" placeholder="City">
                    <input type="text" class="form-control mb-3" v-model="business.state" placeholder="State">
                    <input type="text" class="form-control mb-3" v-model="business.postal_code" placeholder="Postal Code">
                    <input type="email" class="form-control mb-3" v-model="business.email" placeholder="Email">
                    <input type="text" class="form-control mb-3" v-model="business.ein" placeholder="Employment Identification Number">
                    <input type="text" class="form-control mb-3" v-model="business.tax_return_type" placeholder="Tax Return Type">
                    <input type="text" class="form-control mb-3" v-model="business.state_tax_id" placeholder="State Tax ID">
                    <input type="text" class="form-control mb-3" v-model="business.xt_number" placeholder="XT Number">
                    <input type="text" class="form-control mb-3" v-model="business.rt_number" placeholder="RT Number">
                    <input type="text" class="form-control mb-3" v-model="business.formation_date" placeholder="Formation Date">
                    <input type="text" class="form-control mb-3" v-model="business.twc_account" placeholder="TWC Account">
                    <input type="text" class="form-control mb-3" v-model="business.qb_password" placeholder="QB Password">
                    <input type="text" class="form-control mb-3" v-model="business.sos_file_number" placeholder="SOS File Number">
                    <number-input class="mb-3 form-control" v-model="business.phone_number" :placeholder="'Phone Number'" mask-type="number"></number-input>
                    <number-input class="mb-3 form-control" v-model="business.fax_number" :placeholder="'Fax Number'" mask-type="number"></number-input>
                </div>


                <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary d-flex justify-content-start">Create</button>
                </div>
        
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NumberInput from '@/components/forms/NumberInput.vue'

export default {
    name: 'BusinessForm',
    components: {
        NumberInput
    },
    data() {
        return {
            business: {
                client_id: '',
                business_name: '',
                address: '',
                city: '',
                state: '',
                postal_code: '',
                email: '',
                phone_number: '',
                fax_number: '',
                ein: '',
                tax_return_type: '',
                state_tax_id: '',
                xt_number: '',
                rt_number: '',
                formation_date: '',
                twc_account: '',
                qb_password: '',
                sos_file_number: ''
            },
            option: 'Choose...'
        }
    },
    computed: {
    ...mapGetters(['allClients']),
      sortClients() {
        return this.allClients.sort((a,b) => {
        if(a.last_name < b.last_name) return -1;
        if(a.last_name > b.last_name)  return 1;
        return 0;
        })
    }
  },
  methods: {
    ...mapActions(['addBusiness']),
     validateBeforeSubmit() {
          this.$validator.validateAll().then((result) => {
              if (result) {
                  this.addNewBusiness();
              }
          });
      },
    
    addNewBusiness() {
      
      this.addBusiness(this.business)   
      .then(() => {
        this.business = "" 
        this.idForBusiness++
        this.$router.push({path: '/add'});
        this.$store.dispatch('retrieveTasks')
      })
    },
  },
  created() {
      this.$store.dispatch('retrieveClientsWithBusinesses');
      this.business.client_id = this.option
  }

}
</script>

<style scoped>
    .business-form {
        width: 70%;
    }

    @media screen and (max-width: 950px) {
        .business-form {
            width: 100%!important;
        }
    }

</style>


