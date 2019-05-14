<template>
    <div class="d-flex flex-column align-items-center mt-3">
         <Spinner v-if="!dataSet" />
         <Form
            v-if="dataSet"
            :title="formName"
            :inputs="8"
            :placeholders="placeHolders" 
            :data="business"
            :datakeys="dataKeys"
            :errs="errorArray" 
            :btn="'Submit'" 
            :key="key"
            :rules="[]" 
            @submit-form="validateSubmit"
            @change="clear"
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Form from '@/components/Form.vue'
import {validate} from '../plugins/validate.js'
import Spinner from '@/components/Spinner.vue'
export default {
    name: 'BusinessCrud',
    components: {
      Form,
      Spinner
    },
    data() {
      return {
        dataSet: false,
        key: false,
        placeHolders: ['Business Name', 'Address', 'City', 'State', 'Postal Code', 'Email', 'Phone Number', 'Fax Number'],
        dataKeys: ['business_name', 'address', 'city', 'state', 'postal_code', 'email', 'phone_number', 'fax_number'],
        required: ['business_name'],
        errorArray: [],
      }
    },
    computed: {
    ...mapGetters(
        [
          'client',
          'business'
        ]
      ),
      formName() {
        if(this.$route.params.business == 0) {
          return 'Add Business'
        } return `Edit Business | ${this.business.business_name}`
      }
  },
  methods: {
    ...mapActions(['updateBusiness', 'addBusiness']),
    validateSubmit() {
      const check = validate(this.business, this.required)
      if(check.length >= 1) {
        this.errorArray = check
        return
      } this.submitForm()
    },
    submitForm() {
      if(this.$route.params.business == 0) {
        this.business.client_id = this.client.id
        this.addBusiness(this.business) 
      } else {
        this.updateBusiness(this.business)
      }
      this.key = !this.key
    },
    clear() {
        this.errorArray = []
    }
  },
  created: function(){
    this.$store.dispatch('getBusiness', this.$route.params.business);
    setTimeout(() => {
      this.dataSet = true
    }, 2500)
  }

}
</script>

