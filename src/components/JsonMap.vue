<template>
  <div class="json-map">
    <pre>{{ JSON.stringify({title, children}, null, 4) }}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'JsonMap',
  computed: {
    ...mapGetters({
      title: 'TITLE',
      children: 'CHILDREN'
    })
  }
}
</script>

<style lang="scss" scoped>

.json-map {
  width: calc(100% - 40px);
  min-height: calc(30% - 40px);
  padding: 20px;
  background-color: #000;
  color: #80FF00;
  font-weight: bold;
  overflow-y: scroll;
}

</style>
