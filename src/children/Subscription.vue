<template>
  <div class="mt-3">
    <div v-if="$route.name == 'subscription'">

    <div class="d-flex justify-content-between">
      <h3 class="m-0">Subscription</h3>
      <span v-if="subscription.cancel_at_period_end" class="align-self-center font-weight-bold">Account Will Expire On: {{formatDate(subscription.cancel_at)}}</span>
      <div class="d-flex" v-if="plan">
        <div class=" align-self-center">
          <button class="btn btn-secondary font-weight-bold mr-3" @click="requestToCancel()" v-if="!subscription.cancel_at_period_end">Cancel Subscription</button>
          <button class="btn btn-secondary font-weight-bold mr-3" @click="resumeSub()" v-if="subscription.cancel_at_period_end">Resume Subscription</button>
        </div>
        <div class=" align-self-center">
          <router-link to="/administrator/subscription/update-card" class="btn btn-info font-weight-bold mr-3">Update Card</router-link>
        </div>
        <div class=" align-self-center">
          <router-link to="/administrator/subscription/plans" class="btn btn-primary font-weight-bold">Available Plans</router-link>
        </div>
      </div>
      <div v-else>
        <div class=" align-self-center">
          <router-link to="/administrator/subscription/update-card" class="btn btn-info font-weight-bold mr-3">Subscribe</router-link>
        </div>
      </div>
    </div>
    <hr>
    <Alert v-if="successAlert" :message="successAlert" />
    <div class="processing p-2 mb-3 font-weight-bold text-light text-center bg-primary" v-if="processing">Resuming Your Account, Just A Moment!</div>
     <div class="d-flex justify-content-between" v-if="plan">
       <div class="card w-25 mr-3">
         <div class="card-header d-flex justify-content-between">
           <span class="font-weight-bold h5">{{plan.nickname}}</span>
           <span class="font-weight-bold h5 text-primary">{{plan.amount}}/{{plan.interval}}</span>
         </div>
         <div class="card-body">
           <ul class="p-0 text-left font-weight-bold">
             <li class="d-flex justify-content-between">
               <span>Tasks</span>
               <span><i class="fas fa-check"></i></span>
             </li>
             <li class="d-flex justify-content-between">
               <span>Workflows</span>
               <span><i class="fas fa-check"></i></span>
             </li>
             <li class="d-flex justify-content-between">
               <span>Reports</span>
               <span><i class="fas fa-check"></i></span>
             </li>
             <li class="d-flex justify-content-between">
               <span>Data Visualization</span>
               <span><i class="fas fa-check"></i></span>
             </li>
             <li class="d-flex justify-content-between">
               <span>Team</span>
               <span>{{plan.metadata.team}}</span>
             </li>
             <li class="d-flex justify-content-between">
               <span>Engagements</span>
               <span>{{plan.metadata.engagements}}</span>
             </li>
             <li class="d-flex justify-content-between">
               <span>Support</span>
               <span>{{plan.metadata.support}}</span>
             </li>
           </ul>
         </div>
         <div class="card-header d-flex justify-content-between">
           <button class="btn btn-sm btn-secondary font-weight-bold" @click="requestToCancel()" v-if="!subscription.cancel_at_period_end">Cancel</button>
           <button class="btn btn-sm btn-secondary font-weight-bold" @click="resumeSub()" v-if="subscription.cancel_at_period_end">Resume</button>
           <router-link to="/administrator/subscription/plans" class="btn btn-sm btn-primary font-weight-bold">Change</router-link>
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

    <div class="not-subscribed-card" v-else>
      <span class="h5 font-weight-bold">Your trial ends on: {{ trial.date | formatDate }}</span>
      <div class="not-subscribed-details text-left mt-3">
        <p>To subscribe <router-link to="/administrator/subscription/update-card" class="btn btn-sm btn-info font-weight-bold">click here</router-link> or the "Subscribe" button on the right hand corner, or feel free to contact sales once the trial has ended.</p>
        <p>We hope you are enjoying TRAXIT and will continue to use it going into the future!</p>
      </div>
    </div>

    </div>

      <b-modal v-model="cancelModal" ref="modal" hide-footer title="Cancel Subscription">
          <div class="p-3 d-flex flex-column align-items-center">
            <i class="far fa-frown fa-5x mb-3 text-primary"></i>
            <span class="h5">
              Are your sure you would like to cancel your subscription?
            </span>
          </div>
          <div class="d-flex justify-content-between">
            <button class="btn btn-primary btn-sm font-weight-bold" @click="cancelModal = false">Nevermind</button>
            <button class="btn btn-secondary btn-sm font-weight-bold" @click="confirmCancel">Yes, Cancel Subscription</button>
          </div>
      </b-modal>

      <!-- this is for viewing the subscription plans -->
      <router-view :plans="plans" :plan="plan" :current="plan.id" v-if="$route.name == 'plans' || $route.name == 'update-card'"></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Alert from '@/components/alerts/Alert.vue'
import moment from 'moment';
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

export default {
  name: 'subscription',
  components: {
    'b-modal': bModal,
    Alert
  },
  data() {
    return {
      cancelModal: false,
      current: ''
    }
  },
  computed: {
    ...mapGetters(
        [ 
          'processing',
          'invoices',
          'plan',
          'plans',
          'subscription',
          'successAlert',
          'trial'
        ]
      ),
      computedInvoices() {
        return this.invoices.invoices
      }
  },
  methods: {
    requestToCancel() {
      this.cancelModal = true
    },
    confirmCancel() {
      this.$store.dispatch('cancelSubscription')
      .then(() => {
        this.cancelModal = false
      })
    },
    resumeSub() {
      this.$store.dispatch('resumeSubscription')
    },
    formatDate(date) {
      const formattedDate = moment.unix(date).format('d/m/Y');
      return formattedDate
    }
  },
  created: function() {
    this.$store.dispatch('getInvoices')
    this.$store.dispatch('getPlans');
    this.$store.dispatch('getTrialDate')
  },
}
</script>

<style lang="scss" scoped>

ul {
  list-style: none!important;
}

.card {
  max-height: 375px !important;
}

.processing {
  border-radius: 8px;
}
li {
  margin-bottom: 5px;
}

.not-subscribed-card {
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,.200);
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
  font-weight: bold;
  margin-top: 40px;
}

.not-subscribed-details {
  background-color: rgb(236, 236, 236);
  border-radius: 5px;
  padding: 30px;
}
</style>