<template>
  <div class="integrations-card" :key="processing">
      <div class="card w-25">
          <div class="card-header bg-primary"><img src="../../assets/RubexLogo.png" alt="rubex" class="integration-logo"></div>
          <div class="card-body pb-0">
              <p class="font-weight-bold px-0">Document Management System</p>
              <span v-if="error" class="text-danger">{{error}}</span>
          </div>
          <div class="card-body pt-0 px-4" v-if="!tokens">
              <div class="custom-input-group">
                  <label for="username">Username</label>
                  <input @change="clear" type="text" id="username" placeholder="Username" v-model="credentials.username">
              </div>
              <div class="custom-input-group">
                  <label for="password">Password</label>
                  <input @change="clear"  type="password" id="password" placeholder="Password" v-model="credentials.password">
              </div>
              <button :disabled="processing" class="btn btn-block btn-primary font-weight-bold" @click="connect('rubex')">Connect</button>
          </div>
          <div class="card-body pt-0 px-4 text-left" v-else>
              <span class="font-weight-bold text-success">Connected</span>
              <ul class="rubex_access_list">
                  <li>User ID: <strong>{{rubex_access.user_id}}</strong></li>
                  <li>Access Token: <strong>{{chop(rubex_access.access_token)}}</strong></li>
                  <li>Refresh Token: <strong>{{chop(rubex_access.refresh_token)}}</strong></li>
                  <li>Expires On: <strong>{{rubex_access['.expires'] | formatDate }}</strong></li>
              </ul>
              <button :disabled="processing" class="btn btn-block btn-secondary font-weight-bold mt-2" @click="disconnect('rubex')">Disconnect</button>
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
    props: ['token'],
    data() {
        return {
            credentials: {
                username: null,
                password: null,
                grant_type: 'password'
            },
            processing: false,
            error: null,
            tokens: JSON.parse(localStorage.getItem('rubex_access_tokens'))
        }
    },
    computed: {
        rubex_access: {
            get() {
                return JSON.parse(localStorage.getItem('rubex_access_tokens'))
            },
            set(newValue) {
                return newValue
            }
        }
    },
    methods: {
        connect(integration) {
            if(integration == 'rubex') {
                if(!this.credentials.password && !this.credentials.username) {
                    this.error = 'Please provide Username and Password before connecting.'
                    return
                } else {
                    this.processing = true
                    this.$store.dispatch('requestRubexToken', this.credentials)
                    .then(res => {
                        this.processing = false
                        this.tokens = res.data
                    }).catch(err => {
                        this.error = err.response.data
                    })
                }
            }
        },
        clear() {
            this.error = null
        },
        chop(str) {
            return str.substring(0,4) + '...' + str.substring(str.length - 3)
        },
        disconnect(integration) {
            if(integration == 'rubex') {
                this.processing = true
                localStorage.removeItem('rubex_access_tokens')
                this.tokens = null
                this.$store.dispatch('removeRubexIntegrationToken')
                .then(res => {
                    this.processing = false
                }).catch(err => {
                    this.processing = false
                })
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

.rubex_access_list {
    list-style: none;
    text-align: left;
    padding: 15px;
    margin: 0;
    border: 1px solid lightgray;
    border-radius: 3px;
    margin-top: 5px;

    li {
        font-size: .8em;
    }
}
</style>