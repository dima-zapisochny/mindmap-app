<template>
  <div class="map">
    <div class="element" :class="{'parent-root': isHaveChildren}">
      <h3 class="element__title">{{ title }}</h3>
      <button class="element__button" type="button" @click="addElement">+</button>
    </div>
    <ul class="element__list">
      <Element
        v-for="(child, index) in children"
        :key="child.id"
        :parent="child"
        :index="index"
        :class="{'list-root': childLength}"
        @deleteElement="deleteElement"/>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Element from './Element'
import { MUTATION } from '../../vuex/mutation-types'

export default {
  name: 'Map',
  components: {
    Element
  },
  computed: {
    ...mapGetters({
      title: 'title',
      children: 'children'
    }),
    childLength: function () {
      return this.children.length > 1
    },
    isHaveChildren: function () {
      return this.children.length
    }
  },
  methods: {
    ...mapMutations({
      setElementToStore: MUTATION.SET_ELEMENT_TO_STORE,
      removeElementFromStore: MUTATION.REMOVE_ELEMENT_FROM_STORE
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

<style lang="scss">

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
  background-color:  #008b8b;
  margin: 10px 0;
  &__title {
     min-width: 50%;
     font-size: 16px;
     margin: auto 20px auto 0;
     color: white;
   }
  &__button {
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
    background-color:  #008b8b;
    border: white solid 2px;
  }
  &__list {
    position: relative;
    height: auto;
    padding: 0;
    margin-left: 50px;
  }
}

.list-root{
  &:before {
    background-color: #000;
    position: absolute;
    content: '';
    width: 2px;
    height: 100%;
    left: -25px;
  }
  &:first-child:before {
    background-color: #000;
    position: absolute;
    content: '';
    width: 2px;
    height: 50%;
    left: -25px;
    top: 50%;
  }
  &:last-child:before {
    background-color: #000;
    position: absolute;
    content: '';
    width: 2px;
    height: 50%;
    left: -25px;
    bottom: 50%;
  }
}

.parent-root {
  position: relative;
  &:after {
    background-color: #000;
    position: absolute;
    content: '';
    width: 25px;
    height: 2px;
    left: 100%;
    top: 50%;
  }
}

</style>
