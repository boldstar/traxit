<template>
  <div class="selected-user-tasks">
      <div class="selected-user-table-header">
        <div class="d-flex">
            <h5>Assigned</h5>
            <span class="badge bg-white ml-3 px-3 border">{{assigned.length}}</span>
        </div>
        <span class="text-secondary">A list of the currently assigned tasks for the selected user.</span>
        <button class="expand-btn" @click="showSelected('assigned')" v-if="!showAssigned">Expand <i class="fas fa-plus"></i></button>
        <button class="collapse-btn" @click="collapse('assigned')" v-if="showAssigned">Collapse <i class="fas fa-minus"></i></button>
      </div>
      <TeamUserTable 
        :title="'Assigned'"
        :list="assigned" 
        :headers="['Name', 'Workflow', 'Task', 'Priority']"
        v-if="showAssigned"
      />
      <div class="selected-user-table-header">
        <div class="d-flex">
            <h5>In Progress</h5>
            <span class="badge bg-white ml-3 px-3 border">{{in_progress.length}}</span>
        </div>
        <span class="text-secondary">A list of the tasks or engagements in progress by the user.</span>
        <button class="expand-btn" @click="showSelected('in_progress')" v-if="!showInProgress">Expand <i class="fas fa-plus"></i></button>
        <button class="collapse-btn" @click="collapse('in_progress')" v-if="showInProgress">Collapse <i class="fas fa-minus"></i></button>
      </div>
      <TeamUserTable 
        :title="'In Progress'"
        :list="in_progress"
        :headers="['Name', 'Workflow', 'Task', 'Priority']"
        v-if="showInProgress"
      />
      <div class="selected-user-table-header">
        <div class="d-flex">
            <h5>Todays History</h5>
            <span class="badge bg-white ml-3 px-3 border">{{history.length}}</span>
        </div>
        <span class="text-secondary">A list of todays history for the user.</span>
        <button class="expand-btn" @click="showSelected('history')" v-if="!showHistory">Expand <i class="fas fa-plus"></i></button>
        <button class="collapse-btn" @click="collapse('history')" v-if="showHistory">Collapse <i class="fas fa-minus"></i></button>
      </div>
      <TeamUserTable
        :title="'History'"
        :list="history"
        :headers="['Engagement Name', 'Type', 'Action', 'Moved To Status']"
        :key="user.id"
        v-if="showHistory"
      />
  </div>
</template>

<script>
import TeamUserTable from '@/components/firm/TeamUserTable.vue'
import levels from '../../plugins/levels'
import {mapGetters} from 'vuex'
export default {
    name: 'SelectedUserTasks',
    props: ['tasks', 'user', 'workflows'],
    components: {TeamUserTable},
    data() {
        return {
            priority_levels: levels.priority_levels,
            showInProgress: false,
            showAssigned: false,
            showHistory: false
        }
    },
    computed: {
        ...mapGetters(['userHistory']),
        in_progress() {
            return this.tasks.filter(task => task.in_progress).map(task => ({
                id: task.id,
                value_one: task.name,
                value_two: this.workflows.filter(w => w.id == task.workflow_id)[0].workflow,
                value_three: task.status,
                value_four: task.priority > 0 ? this.priority_levels.filter(l => l.level == task.priority)[0].value : 'None'
            }))
        },
        assigned() {
            return this.tasks.map(task => ({
                id: task.id,
                value_one: task.name,
                value_two: this.workflows.filter(w => w.id == task.workflow_id)[0].workflow,
                value_three: task.status,
                value_four: task.priority > 0 ? this.priority_levels.filter(l => l.level == task.priority)[0].value : 'None'
            }))
        },
        history() {
            if(this.userHistory) {
                return this.userHistory.filter(history => new Date(history.created_at).toDateString() == new Date().toDateString()).map(history => ({
                    id: history.id,
                    value_one: history.name,
                    value_two: this.formatType(history.type),
                    value_three: this.capitalize(history.action),
                    value_four: history.status
                }))
            }
        }
    },
    methods: {
        formatType(type) {
            if(type == 'taxreturn') {
                return 'Tax Return'
            } else if(type =='bookkeeping') {
                return 'Bookkeeping'
            } else {
                return type
            }
        },
        capitalize(string) {
           return string.charAt(0).toUpperCase() + string.slice(1)
        },
        showSelected(value) {
            if(value == 'assigned') {
                this.showAssigned = true
            } else if(value == 'in_progress') {
                this.showInProgress = true
            } else {
                this.showHistory = true
            }
        },
        collapse(value) {
            if(value == 'assigned') {
                this.showAssigned = false
            } else if(value == 'in_progress') {
                this.showInProgress = false
            } else {
                this.showHistory = false
            }
        }
    },
    watch: {
        'user': function(value) {
            this.$store.dispatch('getUserHistory', value.id)
        }
    },
    created() {
        this.$store.dispatch('getUserHistory', this.user.id)
    }
}
</script>

<style lang="scss">

    .selected-user-tasks {
        text-align: left;

        h5 {
            margin-bottom: 0;
        }

        span {
            font-weight: bold;
            font-size: .9rem;
        }

        .selected-user-table-header {
            background: white;
            padding: 10px;
            position: relative;
            border-bottom: 2px solid lightgray;
            box-shadow: 5px 0 10px 0 rgba(0,0,0,.25px);

            div {

                span {
                    color: #0077ff;
                }
            }

            .expand-btn {
                background: transparent;
                border: none;
                font-weight: bold;
                color: #0077ff;
                position: absolute;
                right: 10px;
                top: 20px;
                cursor: pointer;
            }

            .collapse-btn {
                background: transparent;
                border: none;
                font-weight: bold;
                color: gray;
                position: absolute;
                right: 10px;
                top: 20px;
                cursor: pointer;
            }
        }
    }

</style>