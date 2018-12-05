<template>
    <div class="reset page-wrapper w-25">

        <Alert v-if="passwordAlert" v-bind:message="passwordAlert.message" />

        <div class="card shadow">
            <div class="card-header bg-light text-primary border-primary d-flex justify-content-between">
                <h6 class="mt-2">Request Reset</h6>
                <router-link class="btn btn-sm btn-secondary" to="/login">Back To Login</router-link>
            </div>
            <div class="card-body">
                <div class="text-left">
                    <span class="font-weight-bold">For your safety we will email a reset link!</span>
                </div>
                <form @submit.prevent="validateBeforeSubmit" class="text-left">
                    <div class="form-group mt-3">
                        <label >Email address</label>
                        <input :class="{ 'input-error': errors.has('email') }" type="text" name="email" class="form-control" placeholder="Enter email" v-model="email" v-validate="'required|email'">
                        <span class="form-error">{{ errors.first('email') }}</span>
                    </div>
                    <button type="submit" class="btn btn-block btn-primary py-2 mb-3 d-flex justify-content-center">
                        <div v-if="loading">
                        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        </div>
                        <span v-show="!loading">Submit Request</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Alert from '@/components/Alert.vue'

export default {
    name: 'email-reset',
    components: {
        Alert
    },
    data () {
        return {
            email: '',
            serverError: '',
            loading: false,
        }
    },
    computed: {
        ...mapGetters(['passwordAlert'])
    },
    methods: {
        validateBeforeSubmit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.resetRequest();
                }
            });
        },
       ...mapActions(['forgotReset']),
            resetRequest(){
            this.forgotReset({
                email: this.email,
            })
        },
    }
}
</script>

<style scoped>
    .forgot {
        font-size: 12px;
    }

    .input-error {
      border: 1px solid red;
  }
</style>
