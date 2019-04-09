<template>
  <div class="mt-3">
    <div class="d-flex justify-content-between">
      <h3 class="m-0 account-header">Account Details</h3>
      <div class="d-flex">
        <div>
          <button type="button" class="btn btn-secondary mr-3" @click="addLogo = true" v-if="!addLogo" :disabled="processing">
            <span v-if="processing" class="font-weight-bold">Adding Your Logo...</span>
            <span class="font-weight-bold" v-else>Add Logo</span>
          </button>
        </div>
        <div class="input-group d-flex mr-3" v-if="addLogo">
            <span v-if="alert" class="font-weight-bold align-self-center text-danger mr-3">{{ alert }}</span>
            <div class="mr-2">
                <button class="btn btn-outline-secondary" @click="closeInput()">Cancel</button>
            </div>
            <div class="custom-file">
                <label class="custom-file-label" for="inputGroupFile04" v-if="!hasFile">Choose file</label>
                <label class="custom-file-label" for="inputGroupFile04" v-if="hasFile">{{ fileLabel }}</label>
                <input type="file" class="custom-file-input px-2" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" v-on:change="selectedFile($event)">
            </div>
            <div class="input-group-append">
                <button class="btn btn-primary" id="inputGroupFileAddon04" @click="uploadLogo">Submit</button>
            </div>
        </div>   
        <div class=" align-self-center">
          <router-link :to="{path: '/administrator/account/edit-account'}" class="btn btn-primary font-weight-bold" v-if="accountDetails">Edit Details</router-link>
          <router-link :to="{path: '/administrator/account/add-account'}" class="btn btn-primary font-weight-bold" v-else>Add Details</router-link>
        </div>
      </div>
    </div>
    <hr>
      <ul class="h4 text-left" v-if="$route.name == 'app-account' && accountDetails">
        <li>
          <div class="d-flex">
          <span class="p-3 background width">Business Name</span>
          <span class="ml-5 align-self-center span-data">{{ accountDetails.business_name }}</span>
          </div>
        </li>
        <li>
          <div class="d-flex">
          <span class="p-3 background width">Address</span>
          <span class="ml-5 align-self-center span-data" v-if="accountDetails.address">{{ accountDetails.address }}, {{ accountDetails.city }}, {{ accountDetails.state }} {{ accountDetails.postal_code }}</span>
          </div>
        </li>
        <li>
          <div class="d-flex">
          <span class="p-3 background width">Account Email</span>
          <span class="ml-5 align-self-center span-data">{{ accountDetails.email }}</span>
          </div>
        </li>
        <li>
          <div class="d-flex">
          <span class="p-3 background width">Phone Number</span>
          <span class="ml-5 align-self-center span-data">{{ accountDetails.phone_number }}</span>
          </div>
        </li>
        <li>
          <div class="d-flex">
          <span class="p-3 background width">Fax Number</span>
          <span class="ml-5 align-self-center span-data">{{ accountDetails.fax_number }}</span>
          </div>
        </li>
        <li>
          <div class="d-flex">
          <span class="p-3 background width">Logo</span>
          <img class="ml-5" v-if="accountDetails.logo" v-bind:src="logo" />
          </div>
        </li>
      </ul>

      <!-- this is for viewing the account form -->
      <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'account',
  data() {
    return {
      file: '',
      fileLabel: null,
      hasFile: false,
      uploadInput: false,
      addLogo: false,
      image: '',
      alert: ''
    }
  },
  computed: {
    ...mapGetters(
        [
          'accountDetails',
          'processing'
        ]
      ),
      logo() {
        return `data:image/png;base64, ${this.accountDetails.logo}`
      }
  },
  methods: {
    selectedFile(event) {
      this.alert = ''
      this.file = event.target.files[0]
        this.fileLabel = event.target.files[0].name
        this.hasFile = true
    },
    uploadLogo() {
      if(this.file.size > 45000) {
        this.alert = 'File is to large. Must be 45kb or less'
        return
        
      } else {
        this.$store.dispatch('uploadLogo', this.file)
        .then(() => {
          this.addLogo = false
          this.hasFile = false
          this.file = ''
        })
      }
    },
    closeInput() {
      this.addLogo = false
      this.hasFile = false
    },
  },
  created: function() {
    this.$store.dispatch('getAccountDetails')
  },
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    
    .width {
      width: 200px;
      background-color: #e7e7e7;
      
    }
  }

  li:nth-of-type(1) {
    border-radius: 10px;
  }
}

@media screen and (max-width: 950px) {
  .width {
    font-size: 1rem!important;
    width: 150px!important;
  }
  .span-data {
    font-size: 1rem!important;
  }

  .account-header {
    font-size: 1rem!important;
    align-self: center;
  }
}

@media screen and (max-width: 767px) {
  .btn {
    display: none!important;
  }

  .width {
    padding: 5px!important;
  }

  .span-data {
    margin-left: 5px!important;
  }

  img {
    margin-left: 5px!important;
  }

}

@media screen and (max-width: 425px) {
  .width {
    display: none!important;
  }

  .span-data {
    margin-bottom: 15px;
  }
}
</style>