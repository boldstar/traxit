<template>
  <div class="add-business-engagement-wrapper">        
    <div class="business-engagements" v-if="$route.name != 'add-business-engagement'">
      <div class="text-left">
        <h5 class="mb-0">Business Engagements</h5>
        <p>A list of the engagements for the selected business</p>
      </div>

      <table class="table bg-white shadow-sm">
        <thead class="border">
          <tr>
            <th>Engagement</th>
            <th>Status</th>
            <th>Type</th>
            <th>Year</th>
            <th>Time Period</th>
            <th>Assinged To</th>
            <th>Created Date</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody class=" table-bordered">
          <tr v-for="engagement in filteredEngagements" :key="engagement.id">
            <td>{{engagement.name}}</td>
            <td>{{engagement.status}}</td>
            <td v-if="engagement.type == 'taxreturn'">{{ fixCasing(engagement.type)}}</td>
            <td class="text-capitalize" v-else>{{ engagement.type }}</td>
            <td>{{engagement.year}}</td>
            <td v-if="engagement.title">{{engagement.title}}</td>
            <td v-else>None</td>
            <td>{{engagement.assigned_to}}</td>
            <td>{{engagement.created_at | formatDate }}</td>
            <td><router-link :to="'/engagement/' + engagement.id +'/details'" class="font-weight-bold">View</router-link></td>
          </tr>
          <tr v-if="filteredEngagements.length < 1">
            <td colspan="4"><span class="font-weight-bold">There are currently no engagements</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <router-view  :business="business"></router-view>
    </div>
  </div>
</template>

<script>
export default {
    name: 'BusinessEngagements',
    props: ['engagements', 'business'],
    computed: {
      filteredEngagements() {
        return this.engagements.filter(eng => eng.name == this.business.business_name)
      }
    },
    methods: {
      fixCasing(string) {
            if(string == 'taxreturn') {
                const newString = string.replace("taxreturn", "Tax Return")

                return newString
            }
        },
    }
}
</script>