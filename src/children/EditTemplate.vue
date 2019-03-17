<template>
  <div>
  
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditTemplate',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters(
        [
          'processing'
        ]
      ),
  },
  methods: {
   
  },
  created: function() {
    this.$store.dispatch('getTemplates')
  },
}
</script>

<style lang="scss" scoped>

</style>