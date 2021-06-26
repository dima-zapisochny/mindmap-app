<template>
  <div class="nested-element" >
    <div class="element" :class="{'active': childLength, 'parent-root': item.children.length > 0, 'child-root': true}" :style="{backgroundColor: randomColor()}">
      <h3 class="element__title">{{ item.title }}</h3>
      <button class="element__button delete" v-if="parentItem" @click="deleteChild">-</button>
      <button class="element__button delete-child" v-if="!parentItem" @click="deleteElement">-</button>
      <button class="element__button add-child" type="button" @click="addChild">+</button>
    </div>
    <ul class="element__list" v-if="this.item.children && this.item.children.length > 0">
      <nested
        v-for="(child, childIndex) in item.children"
        :parentItem="item"
        :item="child"
        :index="childIndex"
        :key="child.id"
        :class="{'list-root': childLength}"
        @deleteSubTask="deleteChild"
      />
    </ul>
  </div>
</template>

<script>
export default {
  name: 'nested',
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    parentItem: {
      type: Object,
      required: false
    }
  },
  computed: {
    childLength: function () {
      return this.item.children.length > 1
    }
  },
  methods: {
    deleteChild () {
      this.parentItem.children.splice(this.index, 1)
    },
    deleteElement () {
      this.$emit('deleteElement', this.index)
    },
    addChild () {
      const element = {
        title: 'Nested element 2',
        children: []
      }
      this.item.children.push(element)
    },
    randomColor () {
      return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
    }
  }
}
</script>

<style scoped>

</style>
