<template>
      <b-modal v-model="modal" centered  hide-footer title="Upload Contacts">
        <div class="d-block text-center my-3" v-if="setupState && !successMessage || processing && !successMessage">
          <div class="parent-bar">
          <div class="child-bar" v-bind:style="{ width: progress + '%'}">
            <span v-if="!done">{{ progress + '%' }}</span>
            <span v-if="done">Almost Done</span>
          </div>
        </div>
        </div>
        <div class="input-group d-flex" v-if="!successMessage">
            <div class="custom-file">
                <label class="custom-file-label" for="inputGroupFile04" v-if="!hasFile">Choose file</label>
                <label class="custom-file-label" for="inputGroupFile04" v-if="hasFile">{{ fileLabel }}</label>
                <input type="file" class="custom-file-input px-2" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" v-on:change="selectedFile($event)">
            </div>
        </div>
        <div v-if="successMessage" class="message">
            <span class="message-text">
                {{ successMessage }}
            </span>
        </div>
        <div class="d-flex justify-content-between mt-3"  v-if="!successMessage">
            <button class="btn btn-primary" id="inputGroupFileAddon04" @click="submitContactFile" :disabled="!hasFile">Submit</button>
            <button type="button" class="btn btn-secondary btn-sm" @click="closeModal">Cancel</button>
        </div>
        <div class="d-flex justify-content-between mt-3"  v-if="successMessage">
            <button type="button" class="btn btn-primary btn-block" @click="closeModal">Continue</button>
        </div>
      </b-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import bModal from 'bootstrap-vue/es/components/modal/modal';
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal';

export default {
    name: 'ContactSetupModal',
    data() {
      return {
            modal: true,
            file: '',
            fileLabel: null,
            hasFile: false,
            startProcess: true,
            progress: 0,
            done: false
      }
    },
    components:{
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
        ...mapGetters(['successMessage', 'setupState', 'processing'])
    },
    methods: {
        closeModal() {
            this.$emit('close-modal')
            this.$store.commit('uploadModal')
            this.file = ''
            this.fileLabel = null
            this.hasFile = false
            this.$store.commit('clearSetupMessage')
        },
        selectedFile(event) {
            this.file = event.target.files[0]
            this.fileLabel = event.target.files[0].name
            this.hasFile = true
        },
        submitContactFile() {
            if(this.$route.path != '/contacts') {
                this.$store.dispatch('uploadContactsOnSetup', this.file)
            } else {
                this.$store.dispatch('uploadContacts', this.file)
            }
            this.startProgress()
        },
        startProgress() {
        var vm = this
        var width = 15
        var increase = setInterval(() => {
          vm.progress += width
          if(vm.progress >= 100) {
            clearInterval(increase);
            this.done = true
          }
      }, 500)
      }
    }
}
</script>

<style scoped>

.message {
    padding: 10px;
    border-radius: 5px;
    color: #0077ff;
    background: #ebebeb;
}

.message-text {
    font-weight: bold;
}

.parent-bar {
    height: 25px;
    width: 100%;
    background: gray;
    display: flex;
    z-index: -1;
    border-radius: 5px;
  }

  .child-bar {
    height: 25px;
    background: #0077ff;
    color:  white;
    align-self: center;
    z-index: 0;
    border-radius: 5px;
  }

span {
    font-weight: bold;
}   


</style>




