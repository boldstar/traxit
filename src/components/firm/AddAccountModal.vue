<template>
  <b-modal v-model="modal" hide-footer title='Add Account'>
        <div class="text-left mb-3 bg-light p-2">
            <p>After adding your account you will be able to keep track of what months have been reconciled.</p>
            <ul>
                <li>Year: The year for which the account is being tracked.</li>
                <li>Account Type: The type of the account.</li>
                <li>Account Name: The name of the bank account or credit card account.</li>
            </ul>
        </div>
        <p v-if="error" class="text-danger">Please fill out form before submitting.</p>
        <form>
            <div class="custom-input-group">
                <label for="account_name">Year</label>
                <select type="text" placeholder="EX: Bank of America 1234" v-model="bookkeeping.year" @change="error = false">
                    <option disabled>{{option}}</option>
                    <option v-for="(year, index) in years" :key="index" :value="year">{{year}}</option>
                </select>
            </div>    
            <div class="custom-input-group">
                <label for="account_name">Account Type</label>
                <select type="text" placeholder="EX: Bank of America 1234" v-model="bookkeeping.account_type"  @change="error = false">
                    <option disabled>{{option}}</option>
                    <option value="credit">Credit Card Account</option>
                    <option value="bank">Bank Account</option>
                    <option value="other">Other Liability</option>
                </select>
            </div>    
            <div class="custom-input-group">
                <label for="account_name">Account Name</label>
                <input type="text" placeholder="EX: Bank of America 1234" v-model="bookkeeping.account_name"  @input="error = false">
            </div>
            <div class="custom-input-group">
                <label>Account Opening Date</label>
                <v-date-picker
                mode='single'
                v-model='bookkeeping.account_start_date'
                id="due_date"
                :popover-direction="'top'"
                ></v-date-picker>
            </div>    
        </form>        

        <div class="d-flex justify-content-between">
            <button class="btn btn-primary font-weight-bold" type="button" @click="confirm" :disabled="processing">
                <span v-if="!processing">Start Tracking</span>
                <span v-if="processing">Starting...</span>
            </button>
            <button class="btn btn-secondary font-weight-bold" type="button" @click="closeModal">Cancel</button>
        </div>
    </b-modal>
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { mapGetters } from 'vuex'
export default {
    name: 'AddAccountModal',
    data() {
      return {
        modal: true,
        option: 'Choose..',
        error: false,
        bookkeeping: {
            year: null,
            account_name: null,
            account_type: null,
            account_start_date: null
        }
      }
    },
    components:{
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
      ...mapGetters(['processing']),
        years() {
            var currentYear = new Date().getFullYear(), years = [];
            var startYear = currentYear - 10;  
            while(startYear <= currentYear) {
            years.push(startYear++)
            } 
            return years.reverse();
        },
    },
    methods: {
      closeModal() {
        this.$emit('close-modal')
      },
      confirm() {
        this.error = false
        if(!this.validated()) {
            this.error = true
            return;
        }
        else {
            this.$emit('submit-form', this.bookkeeping)
        }
      },
      validated() {
          if(this.bookkeeping.year == this.option || this.bookkeeping.account_type == this.option || !this.bookkeeping.account_name) {
              return false
          } else return true
      }
    },
    created() {
        this.bookkeeping.year=this.option
        this.bookkeeping.account_type=this.option
    }
}
</script>