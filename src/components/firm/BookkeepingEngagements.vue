<template>
  <div class="bookkeeping-engagements">
      <div class="bookkeeping-engagements-header">
          <h5>Current Bookkeeping Engagements</h5>
          <span class="text-secondary">A list of the bookkeeping engagements currently active for this contact or business by year.</span>
      </div>
      <div class="bookkeeping-engagements-body mt-2">
          <table class="table table-bordered bg-white table-hover">
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Year</th>
                      <th>Status</th>
                      <th>Assigned To</th>
                      <th>Time Period</th>
                      <th>Month Of</th>
                      <th>View</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(engagement, index) in engagements" :key="index">
                      <th>{{engagement.name}}</th>
                      <td>{{engagement.year}}</td>
                      <td>{{engagement.status}}</td>
                      <td>{{engagement.assigned_to}}</td>
                      <td>{{timePeriod(engagement.title)}}</td>
                      <td>{{engagement.title}}</td>
                      <td><router-link class="btn-link font-weight-bold p-0" :to="'/engagement/' + engagement.id + '/details'">View<i class="fas fa-sign-in-alt ml-2"></i></router-link></td>
                  </tr>
              </tbody>
          </table>
      </div>
      <div class="bookkeeping-engagements-footer">

      </div>
  </div>
</template>

<script>
export default {
    name: 'BookkeepingEngagements',
    props: ['allEngagements', 'client_id', 'business_name', 'selected_year'],
    computed: {
        engagements() {
            return this.allEngagements
            .filter(eng => eng.client_id == this.client_id)
            .filter(eng =>  eng.name == this.business_name)
            .filter(eng => eng.year == this.selected_year)
            .filter(eng =>  eng.type == 'bookkeeping')
            .filter(eng =>  eng.status != 'Complete')
            .filter(eng =>  !eng.done)
        }
    },
    methods: {
        timePeriod(time) {
            if(time == 'Annual') return time;
            else if(!time.includes('-')) return 'Monthly'
            else return 'Quarterly'
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

</style>