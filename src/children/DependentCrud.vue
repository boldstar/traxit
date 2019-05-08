<template>
    <div class="d-flex flex-column align-items-center mt-3">
        <Spinner v-if="!dataSet" />
         <Form
            v-if="dataSet"
            :title="formName"
            :inputs="4"
            :placeholders="placeHolders" 
            :data="dependent"
            :datakeys="dataKeys"
            :errs="errorArray" 
            :btn="'Submit'" 
            :key="key" 
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
    name: 'EditDependent',
    components: {
      Form,
      Spinner
    },
    data() {
      return {
        dataSet: false,
        key: false,
        placeHolders: ['First Name', 'Middle Name', 'Last Name', 'Date of birth'],
        dataKeys: ['first_name', 'middle_name', 'last_name', 'dob'],
        required: ['first_name'],
        errorArray: [],
      }
    },
    computed: {
      ...mapGetters(['client','dependent']),
      formName() {
        if(this.$route.params.dependent == 0) {
          return 'Add Dependent'
        } return `Edit Dependent | ${this.dependent.first_name} ${this.dependent.last_name}`
      }
  },
  methods: {
    ...mapActions(['updateDependent', 'addDependent']),
     validateSubmit() {
      const check = validate(this.dependent, this.required)
      if(check.length >= 1) {
        this.errorArray = check
        return
      } this.submitForm()
    },
    submitForm() {
      if(this.$route.params.dependent == 0) {
        this.dependent.client_id = this.client.id
        this.addDependent(this.dependent)      
      } else this.updateDependent(this.dependent)
      this.key = !this.key
    },
    clear() {
        this.errorArray = []
    }
  },
  created: function(){
    this.$store.dispatch('getDependent', this.$route.params.dependent);
    setTimeout(() => {
      this.dataSet = true
    }, 2500)
  }

}
</script>

