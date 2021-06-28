<template>
  <div class="nested-element">
    <div class="element" :class="{'parent': childLength, 'parent-root': parent.children.length > 0, 'child-root': true}" :style="{backgroundColor: randomColor()}">
      <h3 class="element__title">{{ parent.title }}</h3>
      <button class="element__button" v-if="parentItem" @click="deleteChild">-</button>
      <button class="element__button" v-if="!parentItem" @click="deleteElement">-</button>
      <button class="element__button" type="button" @click="addChild">+</button>
    </div>
    <ul class="element__list" v-if="this.parent.children && this.parent.children.length > 0">
      <Nested
        v-for="(child, childIndex) in parent.children"
        :parentItem="parent"
        :parent="child"
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
  name: 'Nested',
  props: {
    parent: {
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
      return this.parent.children.length > 1
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
      const title = prompt('Enter a title for the item', 'Title')
      const element = {
        title,
        children: []
      }
      this.parent.children.push(element)
    },
    randomColor () {
      return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
    }
  }
}
</script>

<style scoped>

.nested-element {
  position: relative;
  display: flex;
}

.parent {
  margin: auto 0 !important;
}

.child-root {
  position: relative;
}

.child-root:before {
  background-color: black;
  position: absolute;
  content: '';
  width: 25px;
  height: 2px;
  left: -25px;
  top: 50%;
}

</style>
