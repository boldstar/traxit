<template>
  <div class="integrations-card">
      <div class="card w-25">
          <div class="card-header bg-primary"><img src="../../assets/RubexLogo.png" alt="rubex" class="integration-logo"></div>
          <div class="card-body pb-0">
              <p class="font-weight-bold px-0">Document Management System</p>
          </div>
          <div class="card-body pt-0 px-4">
              <div class="custom-input-group">
                  <label for="username">Username</label>
                  <input type="text" id="username" placeholder="Username" v-model="credentials.username">
              </div>
              <div class="custom-input-group">
                  <label for="password">Password</label>
                  <input type="password" id="password" placeholder="Password" v-model="credentials.password">
              </div>
              <button class="btn btn-block btn-primary font-weight-bold" @click="connect('rubex')">Connect</button>
          </div>
          <div class="card-footer text-left">
              <small>Note: By signing in you are creating a connection between Traxit and Rubex. The quality of this integration can vary. Use this to create automations between your workflow and document management systems.</small>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'IntegrationsCard',
    data() {
        return {
            credentials: {
                username: null,
                password: null
            }
        }
    },
    methods: {
        connect(integration) {
            if(integration == 'rubex') {
                if(!this.credentials.password && !this.credentials.username) {
                    return
                } else {
                    this.$store.dispatch('requestRubexToken', this.credentials)
                }
            }
        }
    }
}
</script>

<style lang="scss">
.integration-logo {
    height: 50px;
    width: auto;
}
</style>