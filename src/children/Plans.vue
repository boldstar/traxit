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
       <div class="card w-25 mr-3" :class="{'current' : plan.id === current}" v-for="(plan, index) in computedPlans" :key="index">
         <div class="card-header">
           <span class="font-weight-bold h5">{{plan.nickname}}</span>
         </div>
         <div class="card-body">
           <ul class="p-0 text-left font-weight-bold">
             <li class="mb-3">Active: <input type="checkbox" v-model="plan.active"></li>
             <li>Amount: {{plan.amount}}/{{plan.interval}}</li>
           </ul>
         </div>
         <div class="card-footer d-flex justify-content-between" v-if="plan.id != current">
           <button class="btn btn-sm btn-primary font-weight-bold" @click="requestSwap(plan.id, plan.nickname)">Upgrade</button>
         </div>
         <div class="card-footer d-flex justify-content-center" v-else>
           <span class="current-label">Current</span>
         </div>
       </div>
     </div>

     <b-modal v-model="upgradeModal" ref="modal" hide-footer title="Change Subscription Plan">
          <div class="p-3 d-flex flex-column align-items-center">
            <span class="h5">
              Are your sure you would like to change your subscription to the <strong class="text-primary">{{ name }}</strong> plan?
            </span>
          </div>
          <div class="d-flex justify-content-between">
            <button class="btn btn-primary btn-sm" @click="upgradeModal = false">Cancel</button>
            <button class="btn btn-secondary btn-sm font-weight-bold" @click="confirmSwap">Confirm</button>
          </div>
      </b-modal>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

export default {
  name: 'plans',
  props: ['plans', 'current'],
  components: {
    'b-modal': bModal,
  },
  data() {
    return {
      name: '',
      plan_id: '',
      upgradeModal: false
    }
  },
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
  methods: {
    requestSwap(id, name) {
      this.name = name
      this.plan_id = id
      this.upgradeModal = true
    },
    confirmSwap() {
      this.$store.dispatch('swapPlan', {
        product: this.plan_id,
      })
      .then(() => {
        this.upgradeModal = false
        this.name = ''
        this.plan_id = ''
        this.$router.push('/administrator/subscription')
      })
    }
  }
}
</script>

<style lang="scss" scoped>

ul {
  list-style: none!important;
}

.current {
  border-color: #0077ff;
}

.current-label {
  background-color: #0077ff;
  font-weight: 600;
  padding: 5px 20px;
  border-radius: 20px;
  color: white;
}
</style>