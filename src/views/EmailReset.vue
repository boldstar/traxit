<template>
    <div class="reset page-wrapper w-25">

        <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

        <div class="server-error" v-if="serverError">{{ serverError }}</div>

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
                        <input type="text" name="email" class="form-control" placeholder="Enter email" v-model="email" v-validate="'required|email'">
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

export default {
    name: 'email-reset',
    props: {
        dataSuccessMessage: {
            type: String,
        }
    },
    data () {
        return {
            email: '',
            serverError: '',
            successMessage: this.dataSuccessMessage,
            loading: false,
        }
    },
    methods: {
        validateBeforeSubmit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.requestReset();
                }
            });
        },
        requestReset() {
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
