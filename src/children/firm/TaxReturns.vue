<template>
  <div class="taxreturns-overview">
      <span>Coming Soon</span>
      <small>Check Back Later</small>
  </div>
</template>

<script>
export default {
    name: 'TaxReturns'
}
</script>

<style lang="scss">
    .taxreturns-overview {
        height: calc(100vh - 200px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        span {
            font-weight: bold;
            font-size: 2rem;
        }
    }
</style>