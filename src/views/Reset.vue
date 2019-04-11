<template>
  <div class="d-flex justify-content-center col-md-8 col-sm-12">
  <div class="reset col-lg-4 col-md-6 col-sm-12" v-if="resetToken" >
    
      <div class="bg-light text-primary p-3 font-weight-bold d-flex flex-column align-items-center" v-if="resetSuccess">
          <span>Please Proceed To Login, Password Reset Was Succesful</span>
          <a href="/login" class="btn btn-block btn-primary btn-sm">Login</a>
      </div>

      <div class="bg-light p-3 text-danger font-weight-bold" v-if="resetError">
          <span v-for="(error, index) in resetError" :key="index">
            <span v-for="(password, index) in error.password" :key="index">{{password}}</span>
          </span>
      </div>
    
      <div class="shadow card border" v-if="!resetSuccess">
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
          <button type="submit" class="btn btn-block btn-primary my-4 d-flex justify-content-center" :disabled="loading || password != confirmpassword">
              <div v-if="loading">
                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
              </div>
              <span v-show="!loading">Submit</span>
          </button>
        </form>
      </div>
    </div>

    <span class="h3" v-else>Im sorry, the reset token is invalid!</span>
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
    }
  },
  computed: {
    ...mapGetters(['resetToken', 'resetSuccess', 'resetError', 'loading'])
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
      .then(() => {
        this.password = ''
        this.confirmpassword = ''
      })
    }
  },
  created() {
    this.$store.dispatch('retrieveResetToken', this.$route.params.token)
  }
}
</script>

<style>
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

