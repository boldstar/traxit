<template>
    <b-modal v-model="computedModal" hide-footer title='Approve Request' @hidden="resetModal" class="automation-approval">
        <div class="text-left d-flex flex-column" v-if="approvalModalData">
            <div class="d-flex">
                <span class="font-weight-bold">{{approvalModalData.type}}: </span>
                <span class="ml-2 text-primary">{{approvalModalData.data.data.name}}</span>
            </div>
            <span>Would you like to perform the following actions?</span>
            <small>*Uncheck to ignore action, and to modify future automations visit admin page</small>
            <ul class="automation-list">
                <li v-for="(item, index) in automationsList" :key="index">
                    <input type="checkbox" class="mr-2" v-model="item.approved">
                    <strong v-if="approvalModalData.data.automations.length > 1">{{index + 1}}) </strong>
                    {{item.action}}
                </li>
            </ul>
        </div>

        <div class="d-flex justify-content-between mt-2">
            <button class="btn btn-sm btn-primary font-weight-bold" type="button" @click="confirm" :disabled="processing">
                <span v-if="!processing">Approve</span>
                <span v-if="processing">Approving...</span>
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
    name: 'ApprovalModal',
    data() {
      return {
        modal: true,
        customToolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }]
          ],
          automationApproved: false
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
      ...mapGetters(['processing', 'approvalModal', 'approvalModalData']),
      automationsList() {
              return this.approvalModalData.data.automations.map(a => ({
                  action_id: a.action_id,
                  action: a.action,
                  approved: true,
                  data: this.approvalModalData.data.data,
                  automations: this.approvalModalData.data.automations
              }))
      },
      computedModal: {
            get: function() {
                return this.approvalModal
		    },
            set: function(newValue) {
                return newValue
            }
      },
    },
    watch: {
        'processing': function(value) {
            if(!value && this.automationApproved) {
                setTimeout(() => {
                    this.$store.commit('showAutomationApprovalModal', null)
                }, 2000)
            }
        }
    },
    methods: {
      closeModal() {
        this.$emit('close-modal')
      },
      confirm() {
        this.automationApproved = true
        this.$store.dispatch(this.approvalModalData.action, this.automationsList)
      },
      resetModal() {
        this.$emit('reset-modal')
      }
    },
}
</script>

<style lang="scss">
.automation-approval {

    .automation-list {
        list-style: none;
        padding-left: 0;
        margin-top: 10px;
        margin-bottom: 5px;

    }

    small {
        font-weight: bold;
    }
}
</style>
