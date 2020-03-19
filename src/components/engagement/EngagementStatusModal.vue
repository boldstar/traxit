<template>
      <b-modal v-model="modal" centered hide-footer hide-header title="Update Engagement">
          <div class="bg-light text-left p-3 mb-4">
            <span class="h5">Update Status Modal</span>
          </div>
          <div class="custom-input-group">
            <label class="font-weight-bold" for="option">Assign To</label>
            <select id="client_id" v-model="engagement.assigned_to" >
              <option v-for="user in users" :key="user.id" :value="user.name" v-show="user.name != 'Admin'">
                {{ user.name }}
              </option>
            </select>
          </div>
          <div class="custom-input-group">
            <label class="font-weight-bold" for="option">Status</label>
            <select id="status" v-model="engagement.status" >
              <option v-for="status in statuses" :key="status.id" :value="status.status" v-show="status.status != 'Complete'">
                {{ status.status }}
              </option>
            </select>          
          </div>
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-sm btn-primary font-weight-bold" :disabled="processing" @click="updateStatus">
              <span v-if="!processing">Update</span>
              <span v-else>Updating....</span>
            </button>
            <button type="button" class="btn btn-sm btn-secondary font-weight-bold" @click="closeModal">Cancel</button>
          </div>
      </b-modal>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapGetters } from 'vuex';
import bModal from 'bootstrap-vue/es/components/modal/modal';
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal';

export default {
    name: 'EngagementStatusModal',
    props: ['engagement', 'statuses', 'users'],
    data() {
      return {
        completed: false,
        dropDowns: false,
        modal: true
      }
    },
    components:{
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
      ...mapGetters(['processing', 'engagementStatusModal']),
    },
    methods: {
        updateStatus() {
            this.$store.dispatch('updateEngagement', this.engagement)
            .then(() => {
              this.$store.commit('showStatusModal', false)
            })
        },
        closeModal() {
            this.$store.commit('showStatusModal', false)
        }
    },
}
</script>




