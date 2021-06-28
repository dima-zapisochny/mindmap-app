<template>
  <div class="map">
    <div class="element" :class="{'parent-root': CHILDREN.length > 0}">
      <h3 class="element__title">{{ TITLE }}</h3>
      <button class="element__button" type="button" @click="addElement">+</button>
    </div>
    <ul class="element__list">
      <NestedElement
        v-for="(child, index) in CHILDREN"
        :key="child.id"
        :parent="child"
        :index="index"
        :class="{'list-root': CHILDREN.length > 1}"
        @deleteElement="deleteElement"/>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import NestedElement from './NestedElement'

export default {
  name: 'MAP',
  components: {
    NestedElement
  },
  computed: {
    ...mapGetters({
      TITLE: 'TITLE',
      CHILDREN: 'CHILDREN'
    })
  },
  methods: {
    ...mapMutations({
      SET_ELEMENT_TO_STORE: 'SET_ELEMENT_TO_STORE',
      REMOVE_ELEMENT_FROM_STORE: 'REMOVE_ELEMENT_FROM_STORE'
    }),
    addElement () {
      const title = prompt('Enter a title for the item', 'Title')
      this.SET_ELEMENT_TO_STORE(title)
    },
    deleteElement (index) {
      this.REMOVE_ELEMENT_FROM_STORE(index)
    }
  }
}
</script>

<style>

.map {
  display: flex;
  align-items: center;
  width: calc(100% - 40px);
  min-height: calc(70% - 110px);
  padding: 20px;
}

.element {
  position: relative;
  display: flex;
  padding: 0 25px;
  min-width: 230px;
  height: 50px;
  border-radius: 30px;
  background-color: darkcyan;
  margin: 10px 0;
}

.element__title {
  min-width: 50%;
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
  background-color: darkcyan;
  border: white solid 2px;
}

.element__list {
  position: relative;
  height: auto;
  padding: 0;
  margin-left: 50px;
}

.list-root:before {
  background-color: black;
  position: absolute;
  content: '';
  width: 2px;
  height: 100%;
  left: -25px;
}

.list-root:first-child:before {
  background-color: black;
  position: absolute;
  content: '';
  width: 2px;
  height: 50%;
  left: -25px;
  top: 50%;
}

.list-root:last-child:before {
  background-color: black;
  position: absolute;
  content: '';
  width: 2px;
  height: 50%;
  left: -25px;
  bottom: 50%;
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
