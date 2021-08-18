<template>
    <b-modal v-model="modal" hide-footer title='Add Comments' class="text-left" @hidden="resetModal">
        <span>Call List Item For: <strong>{{item.engagement_name}}</strong></span>
        <div class="text-center my-4">
            <div class="pt-0 text-left">
                <span class="font-weight-bold">Comments</span>
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
    name: 'CallListCommentsModal',
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
