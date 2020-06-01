<template>
  <div class="contact-settings">

      <div class="contact-settings-header">
          <div>
              <h5>Contact Settings</h5>
              <p>A list of the settings available for the selected contact</p>
          </div>
      </div>

      <div class="contact-setting-card card shadow-sm mb-3">
          <div class="d-flex justify-content-between">
                <div class="text-left">
                    <h5 class="mb-0">Active</h5>
                    <p>If you would like to save the contact but deactivate it, simply toggle the switch.</p>
                </div>
                <div class="align-self-center">
                    <label class="switch">
                        <input type="checkbox" v-model="clientDetails.active" @change="changeActive">
                        <span class="slider round"></span>
                    </label>
                </div>
          </div>
      </div>

        <div class="contact-settings-header">
          <div>
              <h5>Danger Zone</h5>
              <p>Action taken past this point cannot be undone.</p>
          </div>
        </div>

        <div class="contact-setting-card card shadow-sm mb-3">
          <div class="d-flex justify-content-between">
                <div class="text-left">
                    <h5 class="mb-0">Delete Contact</h5>
                    <p>Deleting this contact cannot be undone.</p>
                </div>
          </div>
          <button class="btn btn-danger btn-sm align-self-start font-weight-bold" @click="emitRequest">Delete Contact</button>
      </div>

  </div>
</template>

<script>
export default {
    name: 'ContactSettings',
    props: ['clientDetails'],
    methods: {
        emitRequest() {
            this.$emit('delete-client')
        },
        changeActive() {
          this.$store.dispatch('updateClient', this.clientDetails)
        }
    }
}
</script>

<style lang="scss">
.contact-settings {

    .contact-settings-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        div {
            text-align: left;

            h5 {
                margin-bottom: 0;
            }

            p {
                margin-bottom: 0;
                font-weight: 500;
            }
        }
    }

    .contact-setting-card {
        padding: 20px;
        padding-bottom: 10px;
    }
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>