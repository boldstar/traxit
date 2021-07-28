<template>
  <div class="call-list">
      <input type="text" placeholder="Search By Name" class="call-list-search" v-model="search">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Engagement Name</th>
            <th>Last Called On</th>
            <th>Currently Assigned</th>
            <th>Current Status</th>
            <th>Created Date</th>
            <th>Comments</th>
            <th>Total Calls</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredCallList" :key="index" v-show="filteredCallList && filteredCallList.length > 0">
            <th>{{item.engagement_name}}</th>
            <td>{{item.last_called_date}}</td>
            <td>{{item.user_name}}</td>
            <td>{{item.current_status}}</td>
            <td>{{item.created_date}}</td>
            <td>{{item.comments}}</td>
            <td>{{item.total_calls}}</td>
            <td class="text-danger font-weight-bold action-btns">
              <div class="d-flex">
                <button class="btn btn-link text-success font-weight-bold call-list-btn">+</button>
                <button class="btn btn-link text-danger font-weight-bold call-list-btn">x</button>
                <button class="btn btn-link text-primary"><i class="fas fa-pencil-alt"></i></button>
              </div>
            </td>
          </tr>
          <tr v-show="!filteredCallList">
            <td colspan=8>Sorry, there are currently no call list items</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
    name: 'CallList',
    props: ['callList'],
    data() {
      return {
        search: ''
      }
    },
    computed: {
      filteredCallList() {
        return this.callList
      }
    }
}
</script>

<style lang="scss">
  .call-list {
    table {
      background: white;

      thead {
        
        th {
          font-size: .8em;
        }
      }

      tbody {
        font-size: .8em;

        .action-btns {
          padding: 0;
        }
      }
    }
    .call-list-search {
      width: 100%;
      padding: 10px;
    }
  }
</style>