<template>
    <div class="login-form page-wrapper col-lg-5 col-md-7 col-sm-12">

        <div class="d-flex justify-content-center mb-3 p-0" v-if="successMessage || serverError || sessionEndedMsg && !building">
            <div class="col-lg-9 p-0">
                <span class="success-message" v-if="successMessage">{{ successMessage }}</span>
                <span class="server-error" v-if="serverError">{{ serverError }}</span>
                <span class="server-error" v-if="errorAlert">{{ errorAlert }}</span>
                <span class="server-error" v-if="sessionEndedMsg">{{ sessionEndedMsg }}</span>
            </div>
        </div>

        <div class="d-flex justify-content-center" v-if="!building">
            <div class="card shadow p-0 col-lg-8">
                <div class="card-header bg-primary text-light border-primary d-flex justify-content-between py-2">
                    <span class="font-weight-bold align-self-center logo"><img src="../assets/traxit_logo_white_official.png" class="logo"/></span>
                    <h6 class="mt-2" v-if="accountDetails">{{ accountDetails.business_name}}</h6>
                    <h6 class="mt-2" v-else>Login</h6>
                </div>
                <div class="card-body">
                    <form @submit.prevent="validateBeforeSubmit" class="text-left">
                        <div class="form-group">
                            <label >Email address</label>
                            <input type="text" name="email" class="form-control" placeholder="Enter email" v-model="username" v-validate="'required|email'">
                            <span class="form-error">{{ errors.first('email') }}</span>
                        </div>
                        <div class="form-group mb-3">
                            <label >Password</label>
                            <input type="password" name="password" class="form-control" placeholder="Password" :class="{ 'input-error': errors.has('password') }"  v-model="password" v-validate="'required|min:6'">
                            <span class="form-error">{{ errors.first('password') }}</span>
                        </div>
                        <button type="submit" class="btn btn-block btn-primary py-2 mb-3 d-flex justify-content-center" :disabled="trying">
                            <div v-if="loading">
                            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                            </div>
                            <span v-show="!loading"  class="font-weight-bold">Login</span>
                        </button>
                        <div class="forgot d-flex justify-content-between">
                            <span>Forgot password?  </span> <router-link to="/get-reset-link">Click Here</router-link>
                        </div>
                        <div class="forgot d-flex justify-content-between">
                            <span>Switch Companies?  </span> <a href="/login" @click="removeFqdn">Click Here</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div v-if="building">
            <cogs></cogs>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Cogs from '@/components/loaders/Cogs.vue'
export default {
    name: 'login-form',
    props: {
        dataSuccessMessage: {
            type: String,
        }
    },
    components: {
        Cogs
    },
    data () {
        return {
            username: '',
            password: '',
            serverError: '',
            successMessage: this.dataSuccessMessage,
            loading: false,
            trying: false,
            building: false
        }
    },
    computed: {
        ...mapGetters(['accountDetails', 'errorAlert', 'sessionEndedMsg']),
    },
    methods: {
        validateBeforeSubmit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.login();
                }
            });
        },
        login() {
            this.loading = true
            this.trying = true
            this.$store.dispatch('retrieveToken', {
                username: this.username,
                password: this.password,
            })
            .then(response => {
                this.building = true
                this.$store.commit('sessionEndedMsg', null)
            })
            .catch(error => {
                this.trying = false
                this.loading = false
                this.serverError = 'Something went wrong, please try again.'
                this.password = ''
                this.successMessage = ''
            })
        },
        removeFqdn() {
            localStorage.removeItem('fqdn_api_url')
        }
    },
     created: function() {
         if(localStorage.getItem('fqdn_api_url') != null) {
             this.$store.dispatch('getAccountDetails')
         }
  },
}
</script>

<style scoped>

    .logo {
        height: 22px;
    }

    .forgot {
        font-size: 12px;
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
