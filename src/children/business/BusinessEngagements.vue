<template>
  <div class="add-business-engagement-wrapper">        
    <div class="business-engagements" v-if="$route.name != 'add-business-engagement'">
      <table class="table">
        <thead class="border">
          <tr>
            <th>Engagement</th>
            <th>Status</th>
            <th>Assinged To</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody class=" table-bordered">
          <tr v-for="engagement in filteredEngagements" :key="engagement.id">
            <td>{{engagement.name}}</td>
            <td>{{engagement.status}}</td>
            <td>{{engagement.assigned_to}}</td>
            <td><router-link :to="'/engagement/' + engagement.id +'/details'" class="font-weight-bold">View</router-link></td>
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
    }
}
</script>

<style>

</style>