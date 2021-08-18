<template>
    <b-modal v-model="modal" id="edit-call-list-modal" hide-footer title='Edit Call List Item' @hidden="resetModal">
        <div class="text-center my-4">
            <div class="custom-input-group">
                <label for="last-called">First Called Date</label>
                    <v-date-picker
                        mode='single'
                        v-model='firstCalledDate'
                        :input-props='{class: "form-control h-100"}'>
                    </v-date-picker>
            </div>
            <div class="custom-input-group">
                <label for="last-called">Last Called Date</label>
                  <v-date-picker
                    mode='single'
                    v-model='lastCalledDate'
                    :input-props='{class: "form-control h-100"}'>
                  </v-date-picker>
            </div>
            <div class="custom-input-group">
                <label for="last-called">Total Calls</label>
                <input type="text" id="last-called" v-model="item.total_calls">
            </div>
            <div class="px-2 pt-0 text-left">
                <span class="font-weight-bold pl-3">Comments</span>
                <vue-editor v-model="item.comments" :editorToolbar="customToolbar"></vue-editor>
            </div>
        </div>

        <div class="d-flex justify-content-between">
            <button class="btn btn-sm btn-primary font-weight-bold" type="button" @click="confirm" :disabled="processing">
                <span v-if="!processing">Save Changes</span>
                <span v-if="processing">Saving...</span>
            </button>
            <button class="btn btn-sm btn-secondary font-weight-bold mr-2" type="button" @click="closeModal">Cancel</button>
        </div>
      </b-modal>
</template>

<script>
    import bModal from 'bootstrap-vue/es/components/modal/modal'
    import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
    import { mapGetters } from 'vuex'
    import { VueEditor } from "vue2-editor";
export default {
    name: 'EditCallListItemModal',
    props: ['item'],
    data() {
      return {
        modal: true,
        customToolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }]
          ]
      }
    },
    components:{
        'b-modal': bModal,
         VueEditor
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
      ...mapGetters(['processing']),
      firstCalledDate: {
            get: function() {
                return new Date(this.item.first_called_date)
		    },
            set: function(newValue) {
                this.item.first_called_date = new Date(newValue)
                return new Date(newValue)
            }
      },
      lastCalledDate: {
        get: function() {
          return new Date(this.item.last_called_date)
		    },
            set: function(newValue) {
              this.item.last_called_date = new Date(newValue)
                return new Date(newValue)
            }
      }
    },
    methods: {
      closeModal() {
        this.$emit('close-modal')
      },
      confirm() {
        this.$emit('save-changes', this.item)
      },
      resetModal() {
        this.$emit('reset-modal')
      }
    },
}
</script>
