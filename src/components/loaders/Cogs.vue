<template>
<div class="cog-container">
    <div class="cog three-cogs fa-3x text-primary">
        <i class="fa fa-cog fa-spin fa-2x fa-fw"></i>
        <i class="fa fa-cog fa-spin fa-1x fa-fw"></i>
        <i class="fa fa-cog fa-spin fa-1x fa-fw"></i>
    </div>
</div>
</template>

<script>
export default {
    name: 'Cogs'
}
</script>

<style lang="scss" scoped>
.three-cogs {
  position: relative;
  > .fa:nth-child(1) {
    animation-duration: 4s;
  }
  > .fa:nth-child(2),
  > .fa:nth-child(3) {
    position: absolute;
    top: -0.2em;
    right: -0.40em;
    animation-direction: reverse;
    animation-duration: 2s;
  }
  > .fa:nth-child(3) {
    top: auto;
    bottom: -0.2em;
  }
}

@keyframes color {
  0% { color: red }
  50% { color: blue }
  100% { color: red }
}


.cog {
  margin: 20px
}

.cog-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>

