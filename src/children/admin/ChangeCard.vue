<template>
<div>
    <div class="d-flex justify-content-between">
        <span class="h3 m-0" v-if="plan">Update Card</span>
        <span class="h3 m-0" v-else>Subscribe</span>
        <router-link to="/administrator/subscription" class="btn btn-primary">Back</router-link>
    </div>
    <hr>
    <div class="container d-flex flex-column align-items-center mt-4 cred-card-form">
        <div class="disclosure"><small>All payments are processed and stored by Stripe. <a href="https://stripe.com/privacy">Read More.</a></small></div>
        <div v-if="!plan && plans" class="d-flex justify-content-between bg-light subscribe-card-details">
            <span>{{ plans.data[0].nickname }}</span> 
            <span>{{ plans.data[0].amount }}/mth</span>
        </div>
        <form action="/subscriptions" method="POST" id="payment-form" @submit.prevent="pay()" ref="form" class="form text-left card p-3">

        <div class="form-group text-left">
            <label for="name_on_card">Name on Card</label>
            <input type="text" class="form-control" id="name_on_card" name="name_on_card" v-model="name_on_card">
        </div>

        <div class="form-group text-left">
            <label for="card-element">Credit Card</label>
            <card-element></card-element>
        </div>

        <div class="spacer"></div>

        <button type="submit" class="btn btn-secondary font-weight-bold" :disabled="processing">
           <span v-if="!processing && plan">Update Card</span> 
           <span v-if="!processing && !plan">Subscribe</span> 
           <span v-if="processing">Updating...</span> 
        </button>
    </form>
    </div>
</div>
</template>

<script>
    import { createToken, Card } from 'vue-stripe-elements-plus'
    import CardElement from '@/components/stripe/CardElement.vue'
    import {mapGetters} from 'vuex'

    export default {
        name: 'ChangeCard',
        props: ['plan'],
        data () {
            return {
              name_on_card: '',
              stripeToken: '',
            }
        },
        components: {
            CardElement
        },
        computed: {
            ...mapGetters(['successAlert', 'processing', 'plans']),
        },
        methods: {
            pay () {
              var options = {
                name: this.name_on_card,
              }
              createToken(options).then(result => {
                this.stripeToken = result.token.id
                    if(this.plan) {
                        this.$store.dispatch('updateCard', {
                            stripeToken: this.stripeToken,
                        })
                    }  else {
                        this.$store.dispatch('startSubscription', {
                            stripeToken: this.stripeToken,
                            plan: this.plans.data[0].id
                        })
                    }  
              })
            }
      },
      created() {
          this.$store.dispatch('getPlansOnly')
      }
    }
</script>

<style scoped>
.form {
    width: 500px;
}

.credit-card-form {
    max-width: 500px;
}

.subscribe-card-details {
    width: 100%;
    max-width: 500px;
    padding: 10px;
    font-weight: bold;
    font-size: 1.25rem;
}

.disclosure {
    margin-bottom: 10px;
}
</style>


