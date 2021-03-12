<template>
  <div class="custom-card card shadow-sm">
      <div class="card-header d-flex w-100 justify-content-between py-0">
          <h6 class="font-weight-bold m-0 align-self-center">Contact Category Options</h6>

          <div class="d-flex">
                <label class="switch align-self-center mr-4 mt-2">
                    <input type="checkbox">
                    <span class="slider slider-custom round font-weight-bold text-right pt-2 pr-2">Off</span>
                </label>
            <button class="btn btn-sm btn-primary font-weight-bold align-self-center">Edit</button>
          </div>
      </div>
      <div class="card-body text-left">
          <p>Use options listed here to add custom category selections for your contacts.</p>
          <div></div>
          <ul>
              <i class="fas fa-list fa-5x ml-3 mt-3" v-if="loading || showMessage"></i>
              <li class="font-weight-bold" v-for="(item, index) in categoryList" :key="index">{{index + 1}} {{item.name}}</li>
              <li class="mt-3" v-if="addItem">
                  <input type="text" name="" id="" placeholder="Add Item" class="form-control" v-model="name" @change="inputError = false">
                </li>
              <li class="mt-2" v-if="addItem && !saving">
                  <button class="add-item-btn btn-link btn font-weight-bold" @click="saveItem">Save</button>
                  <button class="add-item-btn btn-link btn font-weight-bold text-danger" @click="addItem = false">Cancel</button>
            </li>
              <li class="mt-2" v-if="!addItem && !saving && !loading"><button class="add-item-btn btn-link btn font-weight-bold" @click="showItemForm">Add Item <i class="fas fa-plus"></i></button></li>
              <li v-if="saving" class="text-primary font-weight-bold">Saving...</li>
          </ul>
          <span v-if="loading && !showList" class="font-weight-bold text-primary p-3">Loading...</span>
          <span v-if="!loading && showMessage" class="font-weight-bold">No options available. Use the "Add Item" button to get started.</span>
          <span v-if="!loading && errorMessage" class="font-weight-bold text-danger">{{errorMessage}}</span>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'CustomCard',
    data() {
        return {
            options: [
                'HPOU', 'N/A'
            ],
            addItem: false,
            saving: false,
            name: null,
            showList: false,
            showMessage: false,
            loading: false,
            errorMessage: null,
            inputError: false
        }
    },
    computed: {
        ...mapGetters(['categoryList'])
    },
    methods: {
        showItemForm() {
            this.addItem = !this.addItem
        },
        saveItem() {
            if(!this.name) {
                this.inputError = true
                return
            }
            this.saving = true

            this.$store.dispatch('saveCategoryOption',{
                belongs_to: 'contact_categories',
                name:  this.name
            }).then(response => {
                if(response.data.length > 0) {
                    this.showMessage = false
                }
                this.addItem = false
                this.name = null
            }).catch(error => {
                this.errorMessage = 'New item did not save, please try again.'
            })

            this.saving = false
        }
    },
    created() {
        this.loading = true
        this.errorMessage = null
        this.$store.dispatch('getCategoryOptions', {belongs_to: 'contact_categories'})
        .then(response => {
            if(response.data.length > 0) {
                this.showList = true
            } else {
                console.log('test')
                this.showMessage = true
            }
            this.loading = false
        }).catch(error => {
            this.errorMessage = 'Oops, something went wrong. Please try again.'
        })
    }
}
</script>

<style lang="scss" scoped>
ul {
    list-style: none;
    background: rgb(248, 245, 245);
    padding: 10px;
}

.slider-custom {
    font-size: .7em;
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