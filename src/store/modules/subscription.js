import axios from 'axios'
import moment from 'moment';
import router from '../../routes/router'

export default {
    state: {
        subscribe: null,
        invoices: '',
        plan: '',
        plans: '',
        subscription: '',
        grace: null,
        stripekey: null,
        trial_date: null
    },
    getters: {
        invoices(state) {
            return state.invoices
        },
        plan(state) {
            return state.plan
        },
        plans(state) {
            return state.plans
        },
        subscription(state) {
            return state.subscription
        },
        grace(state) {
            return state.grace
        },
        stripekey(state) {
            return state.stripekey
        },
        trial(state) {
            return state.trial_date
        }
    },
    mutations: {
        subscriptionInvoices(state, data) {
            state.invoices = data
        },
        subscriptionPlan(state, data) {
            state.plan = data
        },
        subscriptionPlans(state, data) {
            state.plans = data
        },
        subscriptionSub(state, data) {
            state.subscription = data
        },
        gracePeriod(state, data) {
            state.grace = data
        },
        stripeKey(state, data) {
            state.stripekey = data
        },
        trialPeriod(state, data) {
            state.trial_date = data
        }
    },
    actions: {
        getInvoices(context) {
            axios.get('/subscription')
            .then(response => {
              context.commit('subscriptionInvoices', response.data)
            })
            .catch(error => {
              console.log(error.response.data)
            })
        },
        getPlansOnly(context) {
            axios.get('/plans-only')
            .then(response => {
              context.commit('subscriptionPlans', response.data);
            })
            .catch(error => {
              console.log(error.response.data)
            })
        },
        getPlans(context) {
            axios.get('/plans')
            .then(response => {
              context.commit('subscriptionPlan', response.data.plan);
              context.commit('subscriptionPlans', response.data.plans);
              context.commit('subscriptionSub', response.data.subscription);
            })
            .catch(error => {
              console.log(error.response.data)
            })
        },
        getTrialDate(context) {
            axios.get('/trial-date')
            .then(response => {
              context.commit('trialPeriod', response.data);
            })
            .catch(error => {
              console.log(error.response.data)
            })
        },
        swapPlan(context, plan) {
            context.commit('startProcessing')
            axios.post('/upgrade-subscription', {
              product: plan.product
            })
            .then(response => {
              context.commit('stopProcessing')
              router.push('/administrator/subscription')
              context.commit('successAlert', response.data.message)
            })
            .catch(error => {
              context.commit('stopProcessing')
              console.log(error.response.data)
            })
        },
        startSubscription(context, card) {
            context.commit('startProcessing')
            axios.post('/start-subscription', {
                stripeToken: card.stripeToken,
                plan: card.plan
            })
            .then(response=> {
              context.commit('stopProcessing')
              context.commit('successAlert', response.data.message)
              router.push('/administrator/subscription')
            })
            .catch(error => {
              context.commit('stopProcessing')
              console.log(error.response.data)
            })
        },    
        cancelSubscription(context) {
            axios.post('/cancel-subscription')
            .then(response => {
              context.commit('subscribeView', response.data)
            })
            .catch(error => {
              console.log(error.response.data)
            })
        },
        resumeSubscription(context) {
            context.commit('startProcessing')
            axios.post('/resume-subscription')
            .then(response=> {
              context.commit('stopProcessing')
              context.commit('successAlert', response.data.message)
              context.commit('subscriptionSub', response.data.subscription)
            })
            .catch(error => {
              context.commit('stopProcessing')
              console.log(error.response.data)
            })
        },
        checkGracePeriod(context) {
            axios.get('/grace')
            .then(response => {
              if(response.data) {
                context.commit('gracePeriod', response.data)
              }
            })
            .catch(error => {
              console.log(error.response.data)
            })
        },
        updateCard(context, card) {
            context.commit('startProcessing')
            axios.post('/update-card', {
              name: card.name_on_card,
              stripeToken: card.stripeToken
            })
            .then(response => {
              context.commit('stopProcessing')
              router.push('/administrator/subscription')
              context.commit('successAlert', response.data.message)
            })
            .catch(error => {
              context.commit('stopProcessing')
              console.log(error.response.data)
            })
        },
        getStripeKey(context) {
            axios.get('/stripe-key')
            .then(response => {
              context.commit('stripeKey', response.data)
            })
            .catch(error => {
              console.log(error.response.data)
            })
        },
    }
}