<template>
  <div class="breadcrumb">
    <ul class="d-flex m-0 p-0">
      <!-- <li>
        {{ formatPath($route.path) }}
      </li> -->
      <li
        v-for="(breadcrumb, idx) in breadcrumbList"
        :key="idx"
        @click="routeTo(idx)"
        :class="{'linked': !!breadcrumb.link}">
          {{ breadcrumb.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      breadcrumbList: []
    }
  },
  mounted () { this.updateList() },
  watch: { '$route' () { this.updateList() } },
  methods: {
    routeTo (pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link) this.$router.push(this.breadcrumbList[pRouteTo].link)
    },
    updateList () { this.breadcrumbList = this.$route.meta.breadCrumb },
    formatPath(path) {
      const newPath = path.replace(/\//g, " > ")
      return newPath
    }
  }
}
</script>

<style lang="scss" scoped>
  .breadcrumb {
    padding: 10px;
    margin-top: 15px;
    margin-left: 10px;
  }

  ul {
    list-style-type: none;
  }

  ul > li {
    display: flex;
    float: left;
    height: 10px;
    width: auto;
    color: black;
    font-weight: bold;
    font-size: .8em;
    cursor: default;
    align-items: center;
  }

  ul > li:not(:last-child)::after {
    content: '/';
    float: right;
    font-size: .8em;
    margin: 0 .5em;
    color: gray;
    cursor: default;
  }

  .linked {
    cursor: pointer;
    font-size: 1em;
    font-weight: normal;
  }
</style>