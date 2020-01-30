<template>
    <b-modal v-model="modal" centered hide-footer title="Remove Contact From Portal">
          <div class="d-flex flex-column text-left">
              <div class="invite-alert" v-if="alert">Please select who to remove.</div>
            <h5 class="mb-4">Who would you like to remove?</h5>
            <p class="invite-info">Only showing contacts available to remove.</p>
            <div class="form-group">
                <label for="exampleFormControlSelect2">Select Users</label>
                <select multiple class="form-control" id="exampleFormControlSelect2">
                    <option v-for="user in users" :key="user.id" @click="toBeRemoved(user.id)">{{user.name}}</option>
                </select>
            </div>
          
          </div>
        <div class="d-flex justify-content-between mt-4">
            <button class="btn btn-primary btn-sm font-weight-bold" @click="removeContact" :disabled="processing">
              <span v-if="processing">Removing...</span>
              <span v-else>Remove Contact(s)</span>
            </button>
            <button type="button" class="btn btn-secondary btn-sm font-weight-bold" @click="$store.commit('portal_modal_remove_contact')">Cancel</button>
        </div>
      </b-modal>
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import {mapGetters} from 'vuex'
export default {
    name: 'PortalRemoveContact',
    props: ['alert', 'client', 'users'],
    data() {
        return {
            remove: [],
            nothingSelected: false,
        }
    },
    components:{
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
        ...mapGetters(['portalModalRemoveContact', 'processing']),
        modal: {
             get() {
                 return this.portalModalRemoveContact
             },
             set(newState) {
                 return newState
             }
         }
    },
    methods: {
        removeContact() {
            this.$emit('approve-removal', this.remove)
        },
        toBeRemoved(id) {
            console.log(this.remove.includes(id))
            if(this.remove.includes(id)) {
                var index = this.remove.indexOf(id)
                this.remove.splice(index, 1)
            } else {
                this.remove.push(id)
            }
        }
    },
    watch: {
        'guest_user': function(value) {
            this.toBeRemoved(value)
        }
    }
}
</script>

<style lang-scss>

.invite-alert {
    background: red;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    color: white;
    font-weight: bold;
}

.invite-info {
    font-size: .8rem;
    background: lightgray;
    border-radius: 5px;
    padding: 5px;
}

</style>
