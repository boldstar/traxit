<template>
    <div class="bookkeeping-engagements">
        <div class="bookkeeping-engagements-header">
            <h5>Current Bookkeeping Engagements</h5>
            <span class="text-secondary">A list of the bookkeeping engagements currently active for this contact or business by year.</span>
        </div>
        <div class="bookkeeping-engagements-body mt-2">
            <table class="table table-bordered bg-white table-hover" ref="engagement-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Year</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Time Period</th>
                        <th>Month Of</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody  v-if="engagements && engagements.length > 0">
                    <tr v-for="(engagement, index) in engagements" :key="index" :ref="'engagement-row' + `${index}`">
                        <th>{{engagement.name}}</th>
                        <td>{{engagement.year}}</td>
                        <td>{{engagement.status}}</td>
                        <td>{{engagement.assigned_to}}</td>
                        <td>{{timePeriod(engagement.title)}}</td>
                        <td>{{engagement.title}}</td>
                        <td><button class="btn btn-link font-weight-bold p-0" @click="editEngagementRow(index, engagement)"><i class="fas fa-edit"></i></button></td>
                    </tr>
                    <tr class="edit-engagement-row" ref="edit-engagement-row" v-show="showEditRow" :key="showEditRow">
                        <td :class="{'edit-engagement-row-body': showEditRow}" colspan=9 v-if="selectedEngagement">
                            <div class="edit-engagement-row-body-content">
                            <div class="d-flex justify-content-between">
                                <div class="custom-input-group m-0 mx-3 text-left">
                                    <span>Status</span>
                                    <select name="status" id="status" v-model="selectedEngagement.status">
                                        <option v-for="(status, index) in filteredStatuses" :value="status.status" :key="index" v-show="status.status != 'Complete'">{{status.status}}</option>
                                    </select>
                                </div>
                                <div class="custom-input-group m-0 text-left">
                                    <span>Assigned To</span>
                                    <select name="assigned_to" id="assigned_to" v-model="selectedEngagement.assigned_to">
                                        <option v-for="(user, index) in users" :key="index" :value="user.name" v-show="user.name != 'Admin'">{{user.name}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="edit-row-btns">
                                <button @click="hideEditRow" class="btn btn-sm edit-row-btn text-danger">Cancel</button>
                                <button @click="saveEditChanges" class="btn btn-sm edit-row-btn text-primary">Save Changes</button>
                                <router-link  :to="'/engagement/' + selectedEngagement.id +'/details'" class="btn btn-sm edit-row-btn">View More</router-link>
                            </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td class="font-weight-bold" colspan=9>There Are Currently No Active Engagements.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="bookkeeping-engagements-footer">

        </div>
    </div>
</template>

<script>
import {detach, move, moveRow, children, row} from '../../plugins/insert_row'
import {mapActions} from 'vuex'
export default {
    name: 'BookkeepingEngagements',
    props: ['allEngagements', 'client_id', 'business_name', 'selected_year', 'users', 'workflows'],
    data() {
        return {
            showEditRow: false,
            engagementId: null,
            editRowIndex: null,
            selectedWorkflowID: null,
            statusToEdit: null,
            userToEdit: null
        }
    },
    computed: {
        engagements() {
            return this.allEngagements
            .filter(eng => eng.client_id == this.client_id)
            .filter(eng => 
                this.business_name.toLowerCase().includes(eng.name.toLowerCase()) || 
                eng.name.toLowerCase().includes(this.business_name.toLowerCase()))
            .filter(eng => eng.year == this.selected_year)
            .filter(eng =>  eng.type == 'bookkeeping')
            .filter(eng =>  eng.status != 'Complete')
            .filter(eng =>  !eng.done)
        },
        selectedEngagement() {
            return this.engagements.filter(eng => eng.id === this.engagementId)[0]
        },
        filteredWorkflow() {
            if(this.selectedWorkflowID) {
                return this.workflows.filter(w => w.id == this.selectedWorkflowID)
            }
        },
        filteredStatuses() {
            if(this.selectedWorkflowID) {
                return this.filteredWorkflow[0].statuses
            }
        },
    },
    methods: {
        ...mapActions(['updateCheckedEngagements']),
        timePeriod(time) {
            if(time == 'Annual') return time;
            else if(!time.includes('-')) return 'Monthly'
            else return 'Quarterly'
        },
        editEngagementRow(index, engagement) {
            this.statusToEdit = engagement.status
            this.userToEdit = engagement.assigned_to
            this.selectedWorkflowID = engagement.workflow_id
            this.engagementId = engagement.id
            this.showEditRow = true
            const toIndex = this.$refs['engagement-row' + index][0].rowIndex
            const fromIndex = document.getElementsByClassName('edit-engagement-row')[0].rowIndex
            this.editRowIndex = fromIndex
            const table = this.$refs['engagement-table']
            moveRow(table, fromIndex, toIndex, false);
        },
        hideEditRow() {
            this.selectedEngagement.status = this.statusToEdit
            this.selectedEngagement.assigned_to = this.userToEdit
            this.showEditRow = false
            this.engagementId = null
            this.editRowIndex = null
            this.selectedWorkflowID = null
            this.statusToEdit = null
            this.userToEdit = null
        },
        saveEditChanges() {
            this.updateCheckedEngagements({
                engagements: [this.engagementId],
                assigned_to: this.users.filter(user => user.name == this.selectedEngagement.assigned_to)[0].id,
                status: this.selectedEngagement.status
            }).then(() => {
                this.showEditRow = false
                this.engagementId = null
                this.editRowIndex = null
                this.selectedWorkflowID = null
                this.statusToEdit = null
                this.userToEdit = null
            })
        }
    }
}
</script>

<style lang="scss">

.bookkeeping-engagements {
    width: 100%;

    .bookkeeping-engagements-header {
        text-align: left;

        h5 {
            margin-bottom: 0;
        }

        span {
            font-weight: bold;
        }
    }

    .bookkeeping-engagements-body {
        width: 100%;
    }
}

  .table {

    tbody {
      tr {
        th {
          vertical-align: middle;
        }
        td {
          vertical-align: middle;
        }
      }
      .edit-engagement-row {
        background: rgb(241, 241, 241);
        width: 100%;
        box-sizing: border-box;

        .edit-engagement-row-body {
          width: 100%;
          box-sizing: border-box;
          
          .edit-engagement-row-body-content {
            display: flex;
            justify-content: space-between;
            width: 100%;

            .edit-row-btns {
              align-self: center;
              display: flex;
              margin-left: 10px;

              .edit-row-btn {
                text-decoration: none;
                margin: 0 8px;
                background: white;
                color: black;
                font-weight: bold;
                box-shadow: 0 0 5px 0 rgba(0,0,0,.250);
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }

</style>