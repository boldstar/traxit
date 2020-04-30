<template>
  <table class="table bg-white table-hover border mt-3">
      <thead>
          <tr>
              <th v-for="(header, index) in headers" :key="index">{{header}}</th>
          </tr>
      </thead>
      <tbody v-if="list && list.length > 0" class="table-bordered">
          <tr v-for="(item, index) in list" :key="index"  class="item-table-row">
              <th>{{item.value_one}}</th>
              <th>{{item.value_two}}</th>
              <th>{{item.value_three}}</th>
              <th>{{item.value_four}}</th>
          </tr>
      </tbody>
      <tbody v-else>
          <tr>
              <td colspan="4" class="text-center">
                  <span>There is zero items to list.</span>
              </td>
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
    .item-table-row {
        cursor: pointer;
        
        &:hover {
            box-shadow: 0 0 5px 0 rgba(0,0,0,.25);
        }
    }
</style>