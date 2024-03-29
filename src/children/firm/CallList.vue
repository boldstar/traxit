<template>
  <div class="call-list">
      <input type="text" placeholder="Search By Name" class="call-list-search" v-model="search">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Engagement Name</th>
            <th>Last Called</th>
            <th>Currently Assigned</th>
            <th>Current Status</th>
            <th>First Called</th>
            <th>Comments</th>
            <th>Total Calls</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredCallList" :key="index" v-show="filteredCallList && filteredCallList.length > 0 && !loading">
            <th>{{item.engagement_name}}</th>
            <td>{{item.last_called_date | formatDate }}</td>
            <td>{{item.user_name}}</td>
            <td>{{item.current_status}}</td>
            <td>{{item.first_called_date | formatDate }}</td>
            <td @click="openComment(item)" class="comment-cursor">
              <div v-if="item.comments" v-html="chop(item.comments)"></div>
              <div v-else>N/A</div>
            </td>
            <td>{{item.total_calls}}</td>
            <td class="text-danger font-weight-bold action-btns">
              <div class="d-flex justify-content-around">
                <button data-toggle="tooltip" data-placement="bottom" title="Update Last Called" class="btn btn-link text-success font-weight-bold call-list-btn" @click="updateCallList(item)">
                  <i class="fas fa-plus"></i>
                </button>
                <button data-toggle="tooltip" data-placement="bottom" title="Delete Call List History" class="btn btn-link text-danger font-weight-bold call-list-btn" @click="requestDelete(item)" v-if="$can('delete', admin)">
                  <i class="fas fa-trash-alt"></i>
                </button>
                <button data-toggle="tooltip" data-placement="bottom" title="Edit Call List Item" class="btn btn-link text-primary" @click="openEditModal(item)">
                  <i class="fas fa-pencil-alt"></i>
                </button>
                <button data-toggle="tooltip" data-placement="bottom" title="Archive Call List Item" class="btn btn-link text-info" @click="archive(item.id)">
                  <i class="fas fa-archive"></i>
                </button>
                <button data-toggle="tooltip" data-placement="bottom" title="View Engagement" class="btn btn-link text-dark" @click="viewEngagement(item.engagement_id)">
                  <i class="fas fa-sign-in-alt"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr v-show="filteredCallList.length < 1 && !loading">
            <td colspan=8>Sorry, there are currently no call list items</td>
          </tr>
          <tr v-show="loading" :key="loading">
            <td colspan=8>Loading....</td>
          </tr>
        </tbody>
      </table>

      <EditCallListItemModal 
        :item="call_list_item" 
        :key="showModal + 1"
        v-if="showModal" 
        @close-modal="showModal = false"
        @save-changes="saveCallListItemChanges"
        @reset-modal="resetCallListModal" 
      />
      <CallListCommentsModal
        :item="call_list_item" 
        :key="showCommentModal + 2"
        v-if="showCommentModal" 
        @close-modal="showCommentModal = false"
        @save-changes="saveCallListComments" 
        @reset-modal="resetCallListModal" 
      />
  </div>
</template>

<script>
import EditCallListItemModal from '@/components/modals/EditCallListItemModal'
import CallListCommentsModal from '@/components/modals/CallListCommentsModal'
export default {
    name: 'CallList',
    props: ['callList', 'loading', 'admin'],
    components: {EditCallListItemModal,CallListCommentsModal},
    data() {
      return {
        search: '',
        showModal: false,
        showCommentModal: false,
        call_list_item: null
      }
    },
    computed: {
      filteredCallList() {
        if(!this.loading && this.callList && this.callList.length > 0) {
          return this.callList.filter(l => !l.archive)
          .filter(item => { return !this.search || item.engagement_name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
          })
        } else {
          return []
        }
      }
    },
    methods: {
      updateCallList(item) {
        this.$store.dispatch('updateLastCalled', {
          id: item.id,
          last_called_date: new Date(),
          total_calls: item.total_calls + 1,
          engagement_id: item.engagement_id
        })
      },
      saveCallListItemChanges(item) {
        this.$store.dispatch('updateCallListItem', item)
        .then(res => {
          this.showModal = false
        })
      },
      openEditModal(item) {
        this.showModal = true
        this.call_list_item = item
      },
      requestDelete(item) {
        this.$store.commit('toggleDeleteModal', {
          action: 'deleteCallListItem',
          id: item.id
        })
      },
      openComment(item) {
        this.call_list_item = item
        this.showCommentModal = true
      },
      viewEngagement(id) {
        this.$router.push({'path': '/engagement/' + id + '/details'})
      },
      chop(string) {
        var str = string.replace(/<\/?[^>]+(>|$)/g, "")
        return str.substring(0,5) + '...'
      },
      saveCallListComments(item) {
        this.$store.dispatch('updateCallListItem', item)
        .then(res => {
          this.showCommentModal = false
        })
      },
      archive(id) {
        this.$store.dispatch('removeFromCallList', {id: id, automated: false})
      },
      resetCallListModal() {
        this.showModal = false
        this.showCommentModal = false
        this.call_list_item = null
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

    .comment-cursor {
      cursor: pointer;

      &:hover {
        background: lightgray;
      }
    }
  }
</style>