<template>
    <div class="login-form page-wrapper w-25">

        <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

        <div class="server-error" v-if="serverError">{{ serverError }}</div>

        <div class="card shadow">
            <div class="card-header bg-light text-primary border-primary d-flex justify-content-between">
                <h6 class="mt-2">Login</h6>
            </div>
            <div class="card-body">
                <form @submit.prevent="validateBeforeSubmit" class="text-left">
                    <div class="form-group mt-3">
                        <label >Email address</label>
                        <input type="text" name="email" class="form-control" placeholder="Enter email" v-model="username" v-validate="'required|email'">
                        <span class="form-error">{{ errors.first('email') }}</span>
                    </div>
                    <div class="form-group mb-5">
                        <label >Password</label>
                        <input type="password" name="password" class="form-control" placeholder="Password" :class="{ 'input-error': errors.has('password') }"  v-model="password" v-validate="'required|min:6'">
                        <span class="form-error">{{ errors.first('password') }}</span>
                    </div>
                    <button type="submit" class="btn btn-block btn-primary py-2 mb-3 d-flex justify-content-center">
                        <div v-if="loading">
                        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        </div>
                        <span v-show="!loading">Login</span>
                    </button>
                    <div class="forgot d-flex justify-content-between">
                        <span>Forgot password? <a href="#">Click Here</a> </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

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
        }
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
            this.$store.dispatch('retrieveToken', {
                username: this.username,
                password: this.password,
            })
            .then(response => {
                this.loading = false
                this.$router.push('/')
            })
            .catch(error => {
                this.loading = false
                this.serverError = error.response.data
                this.password = ''
                this.successMessage = ''
            })
        }
    }
}
</script>

<style scoped>
    .forgot {
        font-size: 12px;
    }
</style>
