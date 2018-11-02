<template>
  <div class="mt-3">
    <div class="d-flex justify-content-between">
      <div class="h3">
        <span class="m-0">Workflows | </span>
        <span class="m-0 text-primary">{{ allWorkflows.length }}</span>
      </div>
        <b-btn variant="primary" size="sm" @click="modalShow = !modalShow">Create New Workflow</b-btn>
    </div>
    <hr>
    <div class="d-flex flex-wrap justify-content-around" v-if="$route.name == 'workflows'">
      <div class="workflow-card border p-0 mb-3" v-for="(workflow, index) in allWorkflows" :key="index">
         <div class="card-header d-flex justify-content-between">
           <span class="align-self-center">{{ workflow.workflow }}</span>
          <router-link class="btn btn-sm btn-outline-primary" :to="{ path: '/administrator/workflows/edit-workflow/' + workflow.id }">Edit</router-link>
          </div>
        <ul class="h6 status-list list-ic vertical">
         <li  v-for="(status, index) in workflow.statuses" :key="index">
           <span>
            {{ index + 1 }}
           </span>
           <a >{{ status.status }}</a>
         </li>
        </ul>
      </div>
    </div>

    <b-modal v-model="modalShow" id="myQuestion" ref="myQuestion" hide-footer title="New Workflow Form">
        <form>
          <div class="d-block text-left">
            <br>
              <input class="form-control" type="text" placeholder="Enter Worklow Name" v-model="workflow.name">
            <br>
          </div>
          <div class="d-flex">
            <b-btn class="mt-3" variant="secondary" @click="modalShow = false">Cancel</b-btn>
            <b-btn class="mt-3 ml-auto" variant="outline-primary" @click="addThisWorkflow">Create</b-btn>
          </div>
        </form>
    </b-modal> 

    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

export default {
  name: 'workflows',
  data() {
    return {
      modalShow: false,
      workflow: {
        name: ''
      }
    }
  },
  components:{
    'b-modal': bModal,
  },
  directives: {
    'b-modal': bModalDirective
  },
  computed: {
    ...mapGetters(['allWorkflows']),
  },
  methods: {
    ...mapActions(['addWorkflow']),
    addThisWorkflow() {
      if(!this.workflow.name) return;
      this.addWorkflow({
        id: this.idForWorkflow,
        name: this.workflow.name
      }).then(() => {
        this.workflow = "" 
        this.idForWorkflow++
        this.modalShow = false
      })
    }   
  },
  created: function() {
    this.$store.dispatch('retrieveWorkflows');
  },
}
</script>

<style lang="scss" scoped>
.workflow-card {
 width: 400px;
}

.status-list {
  padding: 10px 0;
}

.list-ic {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list-ic a {
  color: #788288;
  text-decoration: none;
  margin-left: 20px;
}
.list-ic li {
  position: relative;
  width: 35%;
}
.list-ic li span {
  display: inline-block;
  font-weight: 600;
  width: 1.5em;
  height: 1.5em;
  text-align: center;
  line-height: 1.5em;
  border-radius: 1em;
  background: #0077ff;
  color: white;
  position: relative;
}
.list-ic li::before {
  content: '';
  position: absolute;
  background: #576663;
  z-index: -1;
}

.list-ic.vertical {
  padding: 0;
  margin: 0;
}
.list-ic.vertical li {
  list-style-type: none;
  text-align: left;
}
.list-ic.vertical li span {
  margin: 1.4em 0;
}
.list-ic.vertical li::before {
  top: -35px;
  left: 10px;
  width: 0.2em;
  height: 4em;
}
.list-ic li:first-child::before {
  display: none;
}


</style>