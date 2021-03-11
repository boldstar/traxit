<template>
  <div class="custom-card card shadow-sm">
      <div class="card-header d-flex w-100 justify-content-between py-0">
          <h6 class="font-weight-bold m-0 align-self-center">Engagement Category Options</h6>

          <div class="d-flex">
                <label class="switch align-self-center mr-4 mt-2">
                    <input type="checkbox">
                    <span class="slider round font-weight-bold text-right pt-2 pr-2">Off</span>
                </label>
            <button class="btn btn-sm btn-primary font-weight-bold align-self-center">Edit</button>
          </div>
      </div>
      <div class="card-body text-left">
          <p>Use options listed here to add custom category selections for your engagements.</p>
          <ul>
              <li class="font-weight-bold" v-for="(item, index) in options" :key="index">{{index + 1}} {{item}}</li>
              <li class="mt-3" v-if="addItem"><input type="text" name="" id="" placeholder="Add Item" class="form-control"></li>
              <li class="mt-2" v-if="addItem && !saving">
                  <button class="add-item-btn btn-link btn font-weight-bold" @click="saveItem">Save</button>
                  <button class="add-item-btn btn-link btn font-weight-bold text-danger" @click="addItem = false">Cancel</button>
            </li>
              <li class="mt-2" v-if="!addItem && !saving"><button class="add-item-btn btn-link btn font-weight-bold" @click="showItemForm">Add Item <i class="fas fa-plus"></i></button></li>
              <li v-if="saving" class="text-primary font-weight-bold">Saving...</li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    name: 'CustomCard',
    data() {
        return {
            options: [
                'HPOU', 'N/A'
            ],
            addItem: false,
            saving: false,
            category: null
        }
    },
    methods: {
        showItemForm() {
            this.addItem = !this.addItem
        },
        saveItem() {
            this.saving = true

            this.$store.dispatch('saveCategoryOption', this.category)

            this.saving = false
        }
    },
    created() {
        // this.$store.dispatch()
    }
}
</script>

<style lang="scss" scoped>
    ul {
        list-style: none;
        background: rgb(248, 245, 245);
        padding: 10px;
    }

    .slider {
        font-size: .7em;
    }
</style>