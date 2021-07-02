<template>
  <div class="json-map">
    <pre>{{ getJsonMap }}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'JsonMap',
  computed: {
    ...mapGetters({
      title: 'title',
      children: 'children'
    }),
    getJsonMap: function () {
      return JSON.stringify({ title: this.title, children: this.children }, null, 4)
    }
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
}

</style>
