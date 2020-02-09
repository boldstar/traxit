<template>
  <div class="page-wrapper mt-1">
<!-- this is the user tasks header -->
    <TaskList 
      v-if="showTasks" 
      :tasks="tasks" 
      :workflows="allWorkflows"
    />

    <Spinner v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Spinner from '@/components/loaders/Spinner.vue'
import TaskList from '@/components/task/TaskList.vue'

export default {
  name: 'UserTasks',
  data() {
    return {
      showTasks: false,
      required: ['allWorkflows', 'tasks'],
      loaded: []
    }
  },
   components:{
    Spinner,
    TaskList
  },
  computed: {
    ...mapGetters([
      'allWorkflows',
      'tasks'
    ]),
  },
  methods: {
      dataLoaded(model) {
        if(this.loaded.includes(model)) {
          return
        } else {
          this.loaded.push(model)
          if(this.arraysMatch(this.required, this.loaded)) {
            this.showTasks = true
          } else return
        }
      },
      arraysMatch(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (var i = 0; i < arr1.length; i++) {
          if (!arr2.includes(arr1[i])) return false;
        }
        return true;

      }
  },
  watch: {
    'allWorkflows': function(value) {
      this.dataLoaded('allWorkflows')
    },
    'tasks': function(value) {
      this.dataLoaded('tasks')
    }
  },
  created() {
    this.$store.dispatch('retrieveTasks');
    this.$store.dispatch('retrieveWorkflows');
  }
}
</script>


<style scoped lang="scss">

  .filter-task-btn {
    border: none;
    font-weight: bold;
    color: #0077ff;
    width: 150px;
    cursor: pointer;
    outline: none;
  }

  .task-search-input {
    padding: 10px;
    border: 1px solid lightgray;
  }

  tr {
    cursor: pointer;
  }

  label {
    width: 6em;
  }

  .checkedtasks {
    background-color: #0077ff4d;
    transition: all 1s ease-in-out;
  }

  .task-border {
    border-color: #0077ff83;
  }

  .highlight-row {
    background-color: rgba(0, 0, 0, 0.150)!important;
  }

  .high-priority {
    background-color: rgba(255, 0, 0, 0.288);
  }

  .medium-priority {
    background-color: rgba(255, 196, 0, 0.288);
  }

  .low-priority {
    background-color: rgba(4, 0, 255, 0.15);
  }

  

  .tasks {
    height: 100%;
    min-height: calc(100vh - 190px);
    position: relative;
  }

  .square {
    height: 25px;
    width: 25px;
    border: .3px solid gray;
    align-self: center;
    margin: 0 5px;
  }

  @media screen and (max-width: 1300px) {
    .hide-row {
      display: none!important;
    }

    .batch-btn {
      display: none!important;
    }
  }

  @media screen and (max-width: 1000px) {
    .table {
      font-size: .8rem!important;
    }
    
    .btn-primary {
      padding: 1px 5px!important;
    }
  }

  @media screen and (max-width: 767px) {
    i {
      display: none!important;
    }

    .mobile-hide-row {
      display: none!important;
    }

    .tasks {
      box-shadow: none!important;
      padding: 20px 0!important;
    }
  }

  @media screen and (max-width: 400px) {
    .table {
      font-size: .75rem!important;
    }

    .btn-primary {
      font-size: .75rem;
    }

    th {
      padding: 5px!important;
    }
    td {
      padding: 5px!important;
    }

    i {
      display: block!important;
      margin: 5px auto!important;
    }

    .update-text {
      display: none;
    }

    .btn-outline-secondary {
      display: flex;
      font-size: .8rem!important;
    }

    .btn-outline-primary {
      display: flex;
      font-size: .8rem!important;
    }
  }
</style>