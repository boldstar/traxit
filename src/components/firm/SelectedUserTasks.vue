<template>
  <div class="selected-user-tasks">
      <h5>In Progress</h5>
      <span class="text-secondary">A list of the tasks or engagements in progress by the user.</span>
      <TeamUserTable 
        :title="'In Progress'"
        :list="in_progress"
        :headers="['Name', 'Workflow', 'Task', 'Priority']"
      />
      <h5>Assigned</h5>
      <span class="text-secondary">A list of the currently assigned tasks for the selected user.</span>
      <TeamUserTable 
        :title="'Assigned'"
        :list="assigned" 
        :headers="['Name', 'Workflow', 'Task', 'Priority']"
      />
      <h5>Todays History</h5>
      <span class="text-secondary">A list of todays history for the user.</span>
      <TeamUserTable
        :title="'History'"
        :list="history"
        :headers="['Engagement Name', 'Type', 'Action', 'Moved To Status']"
        :key="user.id"
      />
  </div>
</template>

<script>
import TeamUserTable from '@/components/firm/TeamUserTable.vue'
import {mapGetters} from 'vuex'
export default {
    name: 'SelectedUserTasks',
    props: ['tasks', 'user'],
    components: {TeamUserTable},
    computed: {
        ...mapGetters(['userHistory']),
        in_progress() {
            return this.tasks.filter(task => task.in_progress).map(task => ({
                value_one: task.name,
                value_two: task.workflow_id,
                value_three: task.status,
                value_four: task.priority
            }))
        },
        assigned() {
            return this.tasks.map(task => ({
                value_one: task.name,
                value_two: task.workflow_id,
                value_three: task.status,
                value_four: task.priority
            }))
        },
        history() {
            if(this.userHistory) {
                return this.userHistory.filter(history => new Date(history.created_at).toDateString() == new Date().toDateString()).map(history => ({
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
    }

</style>