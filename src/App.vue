<template>
  <div id="app">
    <div class="element" :class="{'parent-root': items.length > 0}">
      <h3 class="element__title">{{ title }}</h3>
      <button class="element__button" type="button" @click="addElement">+</button>
    </div>
    <ul class="element__list">
      <NestedElement
        v-for="(item, index) in items"
        :key="item.id"
        :item="item"
        :index="index"
        @deleteElement="deleteElement"/>
    </ul>
  </div>
</template>

<script>

import NestedElement from './components/nested-element'
export default {
  components: {
    NestedElement
  },
  data () {
    return {
      title: 'PESTLE ANALYSIS INDIA',
      items: []
    }
  },
  methods: {
    addElement () {
      const element = {
        title: 'Nested element 1',
        children: []
      }
      this.items.push(element)
    },
    deleteElement (index) {
      this.items.splice(index, 1)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   height: 100vh;
   display: flex;
   align-items: center;
 }

.element {
  position: relative;
  display: flex;
  padding: 0 30px;
  width: 230px;
  height: 60px;
  border-radius: 30px;
  background-color: cadetblue;
  margin: 20px 0;
}

.element__title {
  font-size: 16px;
  margin: auto 20px auto 0;
  color: white;
}

.element__button {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  margin: auto 7px;
  color: white;
  font-size: 26px;
  cursor: pointer;
  background-color: cadetblue;
  border: white solid 2px;
}

.element__list {
  position: relative;
  height: auto;
  padding: 0;
  margin-left: 50px;
}

.element__list:before {
  background-color: black;
  position: absolute;
  content: '';
  width: 2px;
  height: calc( 100% - 100px );
  left: -25px;
  top: 50px;
}

.nested-element {
  display: flex;
}

.active {
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

.parent-root {
  position: relative;
}

.parent-root:after {
  background-color: black;
  position: absolute;
  content: '';
  width: 25px;
  height: 2px;
  left: 100%;
  top: 50%;
}
</style>
