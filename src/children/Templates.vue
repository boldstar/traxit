<template>
  <div class="mt-3">
    <div class="d-flex justify-content-between">
      <h3 class="m-0">Templates</h3>
    </div>
    <hr>
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
            <div class="card-body p-2">
              <ul class="p-0 mb-0">
                <li><strong>Bold</strong>: Variable</li>
              </ul>
            </div>
          </div>
      </div>
      <div class="flex-fill">
        <div v-if="templates" class="card">
          <div class="card-header d-flex justify-content-between">
            <div>
              <strong>{{ selectedTemplate[0].title}}: <span class="text-primary">Template</span></strong>
            </div>
            <div class="d-flex">
              <button type="button" class="btn btn-sm btn-secondary mr-2" @click="sendTest">Edit</button>
              <button :disabled="processing" type="button" class="btn btn-sm btn-primary" @click="sendTest(selectedTemplate[0].id)">
                <span v-if="processing">Sending Test...</span>
                <span v-if="!processing">Send Test</span>
              </button>
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

export default {
  name: 'Templates',
  data() {
    return {
      current: 'Pending Questions'
    }
  },
  computed: {
    ...mapGetters(
        [
          'processing',
          'templates'
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
      this.$store.dispatch('sendTestMail', id)
    }
  },
  created: function() {
    this.$store.dispatch('getTemplates')

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