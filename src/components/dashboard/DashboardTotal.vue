<template>
  <div class="card shadow-sm">
      <div class="card-header text-left">
          <span class="font-weight-bold">{{title}}</span>
      </div>
      <div class="card-body d-flex flex-column align-items-center justify-content-center">
          <span class="total-text">{{total}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'DashboardTotal',
    props: ['title', 'total'],
}
</script>

<style lang="scss">
    .total-text {
        font-size: 3rem;
        font-weight: bold;
    }
</style>