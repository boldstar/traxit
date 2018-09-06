<template>
    <div class="register-form page-wrapper w-50 mt-5">

        

        <div class="server-error" v-if="serverErrors">
            <div v-for="(value, key) in serverErrors" :key="key">
                {{ value[0] }}
            </div>
        </div>

        <div class="card shadow">
            <div class="card-header bg-light text-primary border-primary d-flex justify-content-between">
                <h6 class="mt-2">Sign Up</h6>
                <h6 class="mt-2 text-black-50">Already a user?
                    <router-link class="btn-link ml-1" to="/login"> Click Here</router-link>
                </h6>
            </div>
            <div class="card-body">
                <form @submit.prevent="validateBeforeSubmit" class="text-left">
                    <div class="form-group mt-3">
                        <label>Name</label>
                        <input type="text" name="name" class="form-control" placeholder="Enter name" :class="{ 'input-error': errors.has('name') }" v-model="name" v-validate="'required'">
                        <span class="form-error">{{ errors.first('name') }}</span>
                    </div>
                    <div class="form-group">
                        <label>Email address</label>
                        <input type="text" name="email" class="form-control" placeholder="Enter email" :class="{ 'input-error': errors.has('email') }" v-model="email" v-validate="'required|email'">
                        <span class="form-error">{{ errors.first('email') }}</span>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" class="form-control" placeholder="Password" :class="{ 'input-error': errors.has('password') }" v-model="password" v-validate="'required|min:6'">
                        <span class="form-error">{{ errors.first('password') }}</span>
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input">
                        <label class="form-check-label">Agree To Terms: <span><a href="#">Read Here</a></span> </label>
                    </div>
                    <button type="submit" class="btn btn-block btn-primary mb-3 d-flex justify-content-center">
                        <div v-if="loading">
                        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        </div>
                        <span v-show="!loading">Create Account</span>
                        </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'register-form',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            serverErrors: '',
            successMessage: '',
            loading: false,
        }
    },
    methods: {
         validateBeforeSubmit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                // eslint-disable-next-line
                this.register();
                // return;
                }

                // alert('Correct them errors!');
            });
        },
        register() {
            this.loading = true
             this.$store.dispatch('register', {
                name: this.name,
                email: this.email,
                password: this.password,
            })
            .then(response => {
                this.loading = false
                this.successMessage = 'Registration Successful!'
                this.$router.push({ name: 'login', params: { dataSuccessMessage: this.successMessage }})
            })
            .catch(error => {
                this.loading = false
                this.serverErrors = Object.values(error.response.data.errors)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
   
</style>

