<template>
  <div class="mt-3">
    <div class="d-flex justify-content-between">
      <h3 class="m-0">Templates</h3>
    </div>
    <hr>
    <Alert v-if="successAlert" :message="successAlert.message" />
    <div class="d-flex justify-content-between">
      <div class="col-md-2">
        <div class="card text-left">
          <div class="card-header d-flex justify-content-between font-weight-bold text-primary">
              <span>Subject</span>
              <i class="far fa-edit align-self-center"></i>
            </div>
          <div v-for="(template, index) in templates" :key="index" @click="changeCurrent(template.title)" class="template" :class="{'selected-template': template.title == current}">
            <div class="card-body py-2"><strong>{{ template.title}}</strong></div>
          </div>
        </div>
          <div class="card mt-3  text-left">
            <div class="card-header d-flex justify-content-between font-weight-bold text-primary">
              <span>Legend</span>
              <i class="fas fa-code align-self-center"></i>
            </div>
            <div class="card-body px-0 mx-0 p-0">
              <ul class="p-0 mb-0">
                <li class="px-3 py-2 d-flex justify-content-between border-bottom">
                  <strong>Bold</strong>
                  <span class="text-primary">Variable</span>
                </li>
                <li class="px-3 py-2 d-flex justify-content-between">
                  <span>Regular</span>
                  <span class="text-primary">Static</span>
                </li>
              </ul>
            </div>
          </div>
      </div>
      <div class="flex-fill">
        <div v-if="templates" class="card">
          <div class="card-header d-flex justify-content-between">
            <div class="pt-1">
              <strong class="align-self-center">{{ selectedTemplate[0].title}}: <span class="text-primary">Template</span></strong>
            </div>
            <div v-if="noEmail">
              <span class="text-danger font-weight-bold">Please Add Account Email Before Sending Test</span>
            </div>
            <div class="d-flex">
              <button :disabled="processing" type="button" class="btn btn-sm btn-primary font-weight-bold" v-if="!verify">
                <span v-if="processing">Sending Test...</span>
                <span v-if="!processing && !verify" @click="verifySend()">Send Test</span>
              </button>
              <span v-if="verify && !processing" class="font-weight-bold align-self-center">Are You Sure?</span>
              <button v-if="verify" class="btn btn-sm btn-primary ml-3" @click="sendTest(selectedTemplate[0].id)">Yes, Send</button>
              <button v-if="verify" class="btn btn-sm btn-secondary ml-3" @click="verify = false">Cancel</button>
            </div>
          </div>
          <div v-html="selectedTemplate[0].html_template" class="p-3 text-left"></div>  
        </div>    
      </div>
    </div>

      <!-- this is for viewing the account form -->
      <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Alert from '@/components/Alert.vue'

export default {
  name: 'Templates',
  components: {
    Alert
  },
  data() {
    return {
      current: 'Pending Questions',
      verify: false,
      noEmail: false,
    }
  },
  computed: {
    ...mapGetters(
        [
          'processing',
          'templates',
          'successAlert',
          'accountDetails'
        ]
      ),
      selectedTemplate() {
        return this.templates.filter(template => template.title == this.current)
      },
  },
  methods: {
    changeCurrent(title) {
      this.current = title
    },
    sendTest(id) {
      if(this.accountDetails.email == null) {
        this.noEmail = true
        this.verify = false
        return;
      }
      this.verify = false
      this.$store.dispatch('sendTestMail', id)
      .then(() => {
        this.verify = false
      })
    },
    verifySend() {
      this.verify = true
      var self = this
      setTimeout(() => {
        self.verify = false
      }, 7000)
    }
  },
  created: function() {
    this.$store.dispatch('getTemplates')
    this.$store.dispatch('getAccountDetails')
  },
}
</script>

<style lang="scss" scoped>
  .template {
    cursor: pointer;
  }
  .selected-template {
    background: #0077ff3d;
  }

  ul {
    list-style: none;
  }
</style>