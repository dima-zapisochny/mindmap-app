<template>
  <div class="nested-element">
    <div class="element child-root"
         :draggable="isDraggable"
         :class="{'parent-element parent-root': isHaveChildren}"
         :style="{backgroundColor: randomColor()}"
         @dragstart="dragStart"
         @dragover="dragOver"
         @dragenter="dragEnter"
         @dragleave="dragLeave"
         @drop="dragDrop">
      <h3 class="element__title">{{ parent.title }}</h3>
      <button class="element__button" @click="deleteElement()">-</button>
      <button class="element__button" type="button" @click="addChild">+</button>
    </div>
    <ul class="element__list" v-if="isShowList">
      <Nested
        v-for="(child, childIndex) in parent.children"
        :parentItem="parent"
        :parent="child"
        :index="childIndex"
        :key="child.id"
        :class="{'list-root': childLength}"
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
    },
    isShowList: function () {
      return !!this.parent.children
    },
    isDraggable: function () {
      return !!this.parentItem
    },
    isHaveChildren: function () {
      return this.parent.children.length
    }
  },
  methods: {
    dragStart (event) {
      if (this.parentItem) {
        event.target.classList.remove('child-root')
      }
      setTimeout(this.deleteElement, 0)
      const element = JSON.stringify(this.parent)
      event.dataTransfer.setData('element', element)
      event.dataTransfer.setData('index', this.index.toString())
    },
    dragOver (event) {
      event.preventDefault()
    },
    dragEnter (event) {
      this.$el.firstChild.classList.add('drop-element')
      console.log()
    },
    dragLeave (event) {
      this.$el.firstChild.classList.remove('drop-element')
      console.log(this)
    },
    dragDrop (event) {
      const element = JSON.parse(event.dataTransfer.getData('element'))
      const index = Number(event.dataTransfer.getData('index'))
      this.parent.children.push(element)
      console.log(index)
    },
    addChild () {
      const title = prompt('Enter a title for the item', 'Title')
      const element = {
        title,
        children: []
      }
      this.parent.children.push(element)
    },
    deleteElement () {
      this.parentItem ? this.parentItem.children.splice(this.index, 1) : this.$emit('deleteElement', this.index)
    },
    randomColor () {
      return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
    }
  }
}
</script>

<style lang="scss" scoped>

.nested-element {
  position: relative;
  display: flex;
  cursor: move;
}

.parent-element {
  margin: auto 0 !important;
}

.child-root {
  position: relative;
  &:before {
    background-color: #000;
    position: absolute;
    content: '';
    width: 25px;
    height: 2px;
    left: -25px;
    top: 50%;
  }
}

.drop-element {
  box-shadow: 0px 0px 8px 5px rgba(34, 60, 80, 0.2);
}

</style>
