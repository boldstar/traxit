<template>
  <table class="table bg-white table-hover border">
      <thead>
          <tr>
              <th v-for="(header, index) in headers" :key="index" class="text-primary">
                  <div class="d-flex">
                    <span class="align-self-center">{{header}}: </span>
                    <select class="custom-select text-capitalize ml-2" id="category" v-model="selectedFilter">
                        <option>All</option>
                        <option v-for="(filter, idx) in filters(index)" :key="idx" :value="{index: index, filter: filter}">
                        {{ filter }}
                        </option>
                    </select>
                  </div>
              </th>
          </tr>
      </thead>
      <tbody v-if="list && list.length > 0" class="table-bordered">
          <tr v-for="(item, index) in filteredList" :key="index"  class="item-table-row" @click="goTo(item.id)">
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
    props: ['list', 'headers', 'title'],
    data() {
        return {
            selectedFilter: 'All'
        }
    },
    computed: {
            filteredList() {
                return this.list.filter(l => {
                    if(this.selectedFilter == 'All') {
                        return l
                    } else if(this.selectedFilter.index == 0) {
                        return l.value_one == this.selectedFilter.filter
                    } else if(this.selectedFilter.index == 1) {
                        return l.value_two == this.selectedFilter.filter
                    } else if(this.selectedFilter.index == 2) {
                        return l.value_three == this.selectedFilter.filter
                    } else if(this.selectedFilter.index == 3) {
                        return l.value_four == this.selectedFilter.filter
                    }
                })
            }
        },
    methods: {
        filters(index) {
            const l = this.list.reduce((acc, data) => {
                if(index == 0) {
                    acc.push(data.value_one)
                } else if(index == 1) {
                    acc.push(data.value_two)
                } else if(index == 2) {
                    acc.push(data.value_three)
                } else if(index == 3) {
                    acc.push(data.value_four)
                }
                return acc
            }, [])

            const result = l.filter((v, i) => l.indexOf(v) === i)

            return result
        },
        goTo(id) {
            this.$router.push('/engagement/' + id +'/details')
        }
    },
    created() {
        this.selectedFilter = 'All'
    }
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