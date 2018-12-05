<template>
  <div class="reset d-flex justify-content-center">

      <div class="bg-light" v-if="resetSuccess">
          <span>Please Proceed To Login, Password Reset Was Succesful</span>
      </div>

      <div class="bg-light" v-if="resetError">
          <span>{{ resetError }}</span>
      </div>
    
      <div class="shadow card border">
        <div class="card-header border  header text-left">
          <span class="font-weight-bold h3 text-primary">Reset Password</span>
        </div>
        <form @submit.prevent="reset" class="card-body">
          <div class="form-group mb-3 text-left">
              <div class="py-2">
              <h5 class="mb-0 font-weight-bold align-self-center bg-light">{{ resetToken.email }}</h5>
              </div>
          </div>
          <div class="form-group mb-3 text-left">
              <input type="password" name="password" class="form-control" placeholder="New Password" v-model="password">
          </div>
          <div class="form-group mb-3 text-left">
              <input type="password" name="confirmpassword" class="form-control" placeholder="Confirm Password" v-model="confirmpassword">
          </div>
          <button type="submit" class="btn btn-block btn-primary my-4 d-flex justify-content-center">
              <span>Submit</span>
          </button>
        </form>
      </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'reset-password',
  data() {
    return {
      password: '',
      confirmpassword: '',
      alert: ''
    }
  },
  computed: {
    ...mapGetters(['resetToken', 'resetSuccess', 'resetError'])
  },
  methods: {
    ...mapActions(['updatePassword']),
    reset(){
      this.updatePassword({
        email: this.resetToken.email,
        password: this.password,
        password_confirmation: this.confirmpassword,
        token: this.$route.params.token
      })
    }
  },
  created() {
    this.$store.dispatch('retrieveResetToken', this.$route.params.token)
  }
}
</script>
