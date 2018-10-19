<template>
  <div class="page-wrapper mt-1">
    <!-- this is the header section of the firm overview -->
      <div class="card mb-3 shadow-sm">
        <div class="d-flex justify-content-between card-body">
          <div class="h2 align-self-center m-0">
            <i class="fas fa-home text-primary"></i>
          </div>
          <p class="h2 align-self-center">Firm</p>
          <div class="align-self-center">
            <button class="btn btn-sm btn-outline-primary"><i class="fas fa-sync-alt mr-2"></i>Refresh</button>
          </div>
        </div>
      </div>


      <div class="row d-flex justify-content-around mt-5" v-if="!listLoaded">

        <div class="col-3">
          <div class="card shadow-sm">
            <span class="h5 mt-3 font-weight-bold">Event Center</span>
            <hr class="mt-2 mb-0">
            <div class="card-body p-0 d-flex flex-column">
              <ul class="p-0 m-0 h5">
                <li class="d-flex justify-content-between" v-on:click="engagementFilterKey = 'recieved'" :class="{ active: engagementFilterKey == 'recieved' }">
                  <div class="ml-3">
                    <i class="far fa-handshake mr-2"></i>
                    <span class="text-muted">Received</span>
                  </div>
                    <span class="badge badge-primary mr-3">20</span>
                </li>
                <li class="d-flex justify-content-between" v-on:click="engagementFilterKey = 'scanned'" :class="{ active: engagementFilterKey == 'scanned' }">
                  <div class="ml-3">
                    <i class="fas fa-print mr-2"></i>
                    <span class="text-muted">Scanned</span>
                  </div>
                    <span class="badge badge-primary mr-3">2</span>
                </li>
                <li class="d-flex justify-content-between" v-on:click="engagementFilterKey = 'preparation'" :class="{ active: engagementFilterKey == 'preparation' }">
                  <div class="ml-3">
                    <i class="fas fa-clipboard-list mr-2"></i>
                    <span class="text-muted">Preparation</span>
                  </div>
                    <span class="badge badge-primary mr-3">33</span>
                </li>
                <li class="d-flex justify-content-between" v-on:click="engagementFilterKey = 'review'" :class="{ active: engagementFilterKey == 'review' }">
                  <div class="ml-3">
                    <i class="fas fa-search mr-2"></i>
                    <span class="text-muted">Review</span>
                  </div>
                    <span class="badge badge-primary mr-3">15</span>
                </li>
                <li class="d-flex justify-content-between" v-on:click="engagementFilterKey = 'secondreview'" :class="{ active: engagementFilterKey == 'secondreview' }"> 
                  <div class="ml-3">
                    <i class="fas fa-clipboard-check mr-2"></i>
                    <span class="text-muted">2nd Review</span>
                  </div>
                    <span class="badge badge-primary mr-3">8</span>
                </li>
                <li class="d-flex justify-content-between" v-on:click="engagementFilterKey = 'signature'" :class="{ active: engagementFilterKey == 'signature' }">
                  <div class="ml-3">
                    <i class="fas fa-file-signature mr-2"></i>
                    <span class="text-muted">Waiting Signature</span>
                  </div>
                    <span class="badge badge-primary mr-3">25</span>
                </li>
                <li class="d-flex justify-content-between" v-on:click="engagementFilterKey = 'complete'" :class="{ active: engagementFilterKey == 'complete' }">
                  <div class="ml-3">
                    <i class="fas fa-flag-checkered mr-2"></i>
                    <span class="text-muted">Complete</span>
                  </div>
                    <span class="badge badge-primary mr-3">35</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-8">
          <div class="card p-0 shadow-sm">
            <div class="d-flex justify-content-between my-3">
              <span class="h5 my-0 ml-3 font-weight-bold">Received</span>
              <span class="mr-3 px-2 table-badge">20</span>
            </div>
            </div>

            <div v-if="noEngagements & !listLoaded">
            <table class="table table-hover mb-5">
                <thead class="bg-primary text-light">
                  <tr>
                    <th scope="col">Task</th>
                    <th scope="col">Client</th>
                    <th scope="col">Created On</th>
                    <th scope="col">Return Type</th>
                    <th scope="col">Year</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
            </table>
            <span class="mt-5 font-weight-bold">
                You have no tasks...
            </span>
          </div>


          <table class="table border">
            <thead class="text-primary">
              <tr>
                <th scope="col"><input type="checkbox"></th>
                <th scope="col">Client</th>
                <th scope="col">Status</th>
                <th scope="col">Assigned To</th>
                <th scope="col">Return Type</th>
                <th scope="col">Year</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(engagement, index) in engagementFilter" :key="index">
                <th scope="row"><input type="checkbox"></th>
                <th>{{ engagement.client.last_name}}, {{ engagement.client.first_name}} & {{ engagement.client.spouse_first_name}}</th>
                <td>{{ engagement.status }}</td>
                <td>{{ engagement.assigned_to }}</td>
                <td>{{ engagement.return_type }}</td>
                <td>{{ engagement.year }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>



  <div v-if="listLoaded" class="lds-dual-ring justify-content-center"></div>
    

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FirmView',
  data() {
    return {
      noEngagements: false,
      listLoaded: false,
      engagementFilterKey: 'recieved',
    }
  },
  computed: {
    ...mapGetters(['allEngagements']),
    engagementFilter() {
      return this[this.engagementFilterKey]
    },
    all() {
      return this.allEngagements
    },
    recieved() {
        return this.allEngagements.filter((engagement) => engagement.status == 'Recieved')
    },
    scanned() {
        return this.allEngagements.filter((engagement) => engagement.status == 'Scanned')
    },
    preparation() {
        return this.allEngagements.filter((engagement) => engagement.status == 'Preparation')
    },
    review() {
        return this.allEngagements.filter((engagement) => engagement.status == 'Review')
    },
    secondreview() {
        return this.allEngagements.filter((engagement) => engagement.status == '2nd Review')
    },
    signature() {
        return this.allEngagements.filter((engagement) => engagement.status == 'Signature')
    },
    complete() {
        return this.allEngagements.filter((engagement) => engagement.status == 'Complete')
    },
    refreshList() {
      this.listLoaded = true
      this.$store.dispatch('retrieveEngagements');
      var self = this;
      setTimeout(() => {
        self.listLoaded = false;
        if(self.allEngagements == 0){
              self.noEngagements = true
        } else {
            self.noEngagements = false
        }
      }, 3000);
    },
  },
  created() {
    this.listLoaded = true;
    this.$store.dispatch('retrieveEngagements')
      var self = this;
        setTimeout(() => {
          self.listLoaded = false;
          if(self.allEngagements == 0){
              self.noEngagements = true
        } else {
            self.noEngagements = false
        }
      }, 3000);
    }
}
</script>

<style scoped lang="scss">

  li {
    list-style: none;
    margin: 0;
    padding: 20px 0;

    &:hover {
      background-color: #aaaaaa34;
      cursor: pointer;
    }
  }

  .table-badge {
    background-color: #0077ff;
    border-radius: 5px;
    color: white;
    font-weight: bold;
  }

  .active {
    background-color: #aaaaaa34;
    border: 1px solid #aaaaaac7;
    color: #0077ff;
  }

 .lds-dual-ring {
        display: inline-block;
        width: 64px;
        height: 64px;
        margin-top: 100px;
        margin-bottom: 100px;
    }

    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 46px;
        height: 46px;
        margin: 1px;
        border-radius: 50%;
        border: 5px solid #0077ff;
        border-color: #0077ff transparent #0077ff transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
        @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .lds-ellipsis-container {
        position: absolute;
        right: 50%;
        padding-right: 20px;
    }

    .lds-ellipsis {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 11px;
    }

    .lds-ellipsis div {
        position: absolute;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: #fff;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    .lds-ellipsis div:nth-child(1) {
        left: 6px;
        animation: lds-ellipsis1 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(2) {
        left: 6px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(3) {
        left: 26px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(4) {
        left: 45px;
        animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
        }
        @keyframes lds-ellipsis3 {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
        }
        @keyframes lds-ellipsis2 {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(19px, 0);
        }
    }
</style>
