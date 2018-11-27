<template>
    <div class="processing">
        <!-- this is the modal to confirm or cancel the delete for the engagement -->
      <b-modal v-model="startProcess" hide-footer hide-header>
        <div class="d-block text-center">
          <h1>Processing...</h1>
          <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
      </b-modal>
    </div>
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

export default {
    name: 'processing',
    data() {
      return {
        startProcess: true
      }
    },
    components:{
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
    },

}
</script>



