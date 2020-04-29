<template>
  <table class="table bg-white table-bordered table-hover mt-3">
      <thead>
          <tr>
              <th v-for="(header, index) in headers" :key="index">{{header}}</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="(item, index) in list" :key="index">
              <th>{{item.value_one}}</th>
              <th>{{item.value_two}}</th>
              <th>{{item.value_three}}</th>
              <th>{{item.value_four}}</th>
          </tr>
      </tbody>
  </table>
</template>

<script>
export default {
    name: 'TeamUserTable',
    props: ['list', 'headers', 'title']
}
</script>

<style lang="scss">

</style>