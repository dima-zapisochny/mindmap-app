<template>
  <div id="app">
    <Header/>
    <Map/>
    <JsonMap/>
  </div>
</template>

<script>
import Header from './components/Header'
import Map from './components/map/Map'
import JsonMap from './components/JsonMap'

export default {
  components: {
    Header,
    Map,
    JsonMap
  }
}
</script>

<style lang="scss">

body {
  margin: 0;
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100vh;
  width: 100vw;
  display: block;
  margin: 0;
  padding: 0;
 }

</style>
