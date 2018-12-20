<template>
    <div class="login-form page-wrapper col-lg-5 col-md-7 col-sm-12">

        <div class="d-flex justify-content-center mb-3 p-0" v-if="successMessage || serverError">
            <div class="col-lg-9 p-0">
                <span class="success-message" v-if="successMessage">{{ successMessage }}</span>
                <span class="server-error" v-if="serverError">{{ serverError }}</span>
            </div>
        </div>

        <div class="d-flex justify-content-center">
            <div class="card shadow p-0 col-lg-8">
                <div class="card-header bg-light text-primary border-primary d-flex justify-content-between">
                    <span class="font-weight-bold align-self-center">Company</span>
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
                            <span v-show="!loading">Login</span>
                        </button>
                        <div class="forgot d-flex justify-content-between">
                            <span>Forgot password?  </span> <router-link to="/get-reset-link">Click Here</router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'login-form',
    props: {
        dataSuccessMessage: {
            type: String,
        }
    },
    data () {
        return {
            username: '',
            password: '',
            serverError: '',
            successMessage: this.dataSuccessMessage,
            loading: false,
            trying: false,
        }
    },
    computed: {
        ...mapGetters(['accountDetails']),
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
                this.trying =false
                this.loading = false
                this.$router.push('/')
            })
            .catch(error => {
                this.trying = false
                this.loading = false
                this.serverError = error.response.data
                this.password = ''
                this.successMessage = ''
            })
        }
    },
     created: function() {
    this.$store.dispatch('getAccountDetails')
  },
}
</script>

<style scoped>
    .forgot {
        font-size: 12px;
    }
</style>
