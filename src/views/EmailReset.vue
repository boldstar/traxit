<template>
    <div class="reset page-wrapper col-lg-4 col-md-8 col-sm-12">

        <Alert v-if="passwordAlert" v-bind:message="passwordAlert.message" />

        <div class="card shadow">
            <div class="card-header bg-light text-primary border-primary d-flex justify-content-between">
                <h6 class="mt-2">Request Reset</h6>
                <div>
                    <router-link class="btn btn-sm btn-outline-primary" to="/login">Login <i class="fas fa-sign-in-alt ml-2"></i></router-link>
                </div>
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
                    <button type="submit" class="btn btn-block btn-primary py-2 mb-3 d-flex justify-content-center" :disabled="loading">
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
        }
    },
    computed: {
        ...mapGetters(['passwordAlert', 'loading'])
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

  .lds-ellipsis {
  display: inline-block;
  position: relative;
  width:60px;
  height: 20px;
    }
    .lds-ellipsis div {
    position: absolute;
    top: 8px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
    .lds-ellipsis div:nth-child(1) {
    left: 6px;
    animation: lds-ellipsis1 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(2) {
    left: 6px;
    animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(3) {
    left: 26px;
    animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(4) {
    left: 45px;
    animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
    }
    @keyframes lds-ellipsis3 {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
    }
    @keyframes lds-ellipsis2 {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(19px, 0);
    }
    }
</style>
