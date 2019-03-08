<template>
<div>
    <div class="d-flex justify-content-between">
        <span class="h3 m-0">Update Card</span>
        <router-link to="/administrator/subscription" class="btn btn-primary">Back</router-link>
    </div>
    <hr>
    <div class="container d-flex justify-content-center mt-4">
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
           <span v-if="!processing">Update Card</span> 
           <span v-if="processing">Updating...</span> 
        </button>
    </form>
    </div>
</div>
</template>

<script>
    import { createToken, Card } from 'vue-stripe-elements-plus'
    import CardElement from '@/components/CardElement.vue'
    import {mapGetters} from 'vuex'

    export default {
        name: 'ChangeCard',
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
            ...mapGetters(['successAlert', 'processing']),
        },
        methods: {
            pay () {
              var options = {
                name: this.name_on_card,
              }
              createToken(options).then(result => {
                this.stripeToken = result.token.id
                this.$store.dispatch('updateCard', {
                    stripeToken: this.stripeToken,
                })
              })
            }
      },
    }
</script>

<style scoped>
.form {
    width: 500px;
}
</style>


