<template>
  <div class="mt-3">
    <div class="d-flex justify-content-between">
      <h3 class="m-0">Available Plans</h3>
      <div class="d-flex">
        <div class=" align-self-center">
          <router-link :to="{path: '/administrator/subscription'}" class="btn btn-secondary font-weight-bold">Go Back</router-link>
        </div>
      </div>
    </div>
    <hr>
     <div class="d-flex justify-content-between">
       <div class="card w-25 mr-3" v-for="(plan, index) in computedPlans" :key="index">
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
     </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'plans',
  props: ['plans'],
  computed: {
    ...mapGetters(
        [ 
          'processing',
          'plan',
        ]
      ),
      computedPlans() {
        return this.plans.data
      }
  },
}
</script>

<style lang="scss" scoped>

ul {
  list-style: none!important;
}
</style>