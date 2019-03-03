<template>
  <div class="mt-3">
    <div class="d-flex justify-content-between">
      <h3 class="m-0">Subscription</h3>
      <div class="d-flex">
        <div class=" align-self-center">
          <router-link :to="{path: '/administrator/account/add-account'}" class="btn btn-primary font-weight-bold">View Plans</router-link>
        </div>
      </div>
    </div>
    <hr>
     <div class="d-flex justify-content-between">
       <div class="card w-25 mr-3">
         <div class="card-header">
           <span class="font-weight-bold h5">{{plan.nickname}}</span>
         </div>
         <div class="card-body">
           <ul class="p-0 text-left font-weight-bold">
             <li class="mb-3">Active: <input type="checkbox" v-model="plan.active"></li>
             <li>Amount: {{plan.amount}}/{{plan.interval}}</li>
           </ul>
         </div>
         <div class="card-header d-flex justify-content-between">
           <button class="btn btn-sm btn-secondary font-weight-bold">Cancel</button>
           <button class="btn btn-sm btn-primary font-weight-bold">Upgrade</button>
         </div>
       </div>
       <div class="w-75 text-left">
        <div class="card">
          <div class="card-header">
            <span class="h5 font-weight-bold">Invoices</span>
          </div>
        </div>
        <table class="table border table-light table-hover text-left">
          <thead class="text-primary hover">
              <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col" class="text-center">PDF</th>
              </tr>
          </thead> 
          <tbody class="client-info table-bordered font-weight-bold">
              <tr v-for="(invoice, index) in computedInvoices"  :key="index">
                  <td>{{ invoice.date }}</td>
                  <td>{{ invoice.total }}</td>
                  <td class="text-center"><a target="_blank" :href="`${invoice.pdf}`" class="btn btn-sm btn-primary">View</a></td>
              </tr>
          </tbody>
        </table>
       </div>
     </div>

      <!-- this is for viewing the account form -->
      <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'subscription',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters(
        [ 
          'processing',
          'invoices',
          'plan',
          'plans'
        ]
      ),
      computedInvoices() {
        return this.invoices.invoices
      }
  },
  methods: {
   
  },
  created: function() {
    this.$store.dispatch('getInvoices')
    this.$store.dispatch('getPlans');
  },
}
</script>

<style lang="scss" scoped>

ul {
  list-style: none!important;
}
</style>