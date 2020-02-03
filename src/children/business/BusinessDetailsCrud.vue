<template>
    <div class="d-flex flex-column align-items-center mt-3 mx-auto">
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
import Form from '@/components/forms/Form.vue'
import {validate} from '../../plugins/validate.js'
import Spinner from '@/components/loaders/Spinner.vue'
export default {
    name: 'BusinessDetailsCrud',
    props: ['business'],
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
      formName() {
        return `Edit Business | ${this.business.business_name}`
      }
  },
  methods: {
    ...mapActions(['updateBusiness']),
    validateSubmit() {
      const check = validate(this.business, this.required)
      if(check.length >= 1) {
        this.errorArray = check
        return
      } this.submitForm()
    },
    submitForm() {
      this.updateBusiness(this.business)
      this.key = !this.key
    },
    clear() {
        this.errorArray = []
    }
  },
  created: function(){
    setTimeout(() => {
      this.dataSet = true
    }, 2500)
  }

}
</script>

