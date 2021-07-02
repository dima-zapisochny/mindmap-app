<template>
  <header class="header-app">
    <div class="header-app__buttons">
      <a href="" download="data.json" class="download-file-button" @click="downloadFile">DOWNLOAD JSON FILE</a>
      <input type="file" class="load-file-button" name="files" @change="loadFile"/>
      <h3 class="header-app__title">MINDMAP APP</h3>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { MUTATION } from '../vuex/mutation-types'
import JsonFileService from '../services/JsonFileService'

export default {
  name: 'Header',
  data () {
    return {
      jsonFile: new JsonFileService()
    }
  },
  computed: {
    ...mapGetters({
      title: 'title',
      children: 'children'
    })
  },
  methods: {
    ...mapMutations({
      setTitleToStore: MUTATION.SET_TITLE_TO_STORE,
      setChildrenToStore: MUTATION.SET_CHILDREN_TO_STORE
    }),
    loadFile (event) {
      this.jsonFile.loadJsonFile(event).then((result) => {
        this.setTitleToStore(result.title)
        this.setChildrenToStore(result.children)
      })
    },
    downloadFile (event) {
      this.jsonFile.downloadJsonFile(event, this.title, this.children)
    }
  }
}
</script>

<style lang="scss" scoped>

.header-app {
  display: flex;
  justify-content: space-between;
  height: 70px;
  box-shadow: 0 5px 10px 0 rgba(34, 60, 80, 0.2);
  &__title {
    margin: 25px;
    color: #008b8b;
    display: inline-flex;
    float: right;
  }
}

.download-file-button {
  text-decoration: none;
  background-color: #008b8b;
  margin: 15px;
  padding: 10px 15px;
  color: #fff;
  border-radius: 3px;
  font-weight: 700;
  font-size: 10pt;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 8px 5px rgba(34, 60, 80, 0.2);
  }
  &:active {
    opacity: .5;
  }
}

.load-file-button {
  color: transparent;
  &::-webkit-file-upload-button {
    visibility: hidden;
  }
  &:before {
    content: 'CHOOSE JSON FILE';
    margin: 15px;
    padding: 10px 15px;
    background-color: #008b8b;
    display: inline-block;
    border-radius: 3px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    color: white;
    font-weight: 700;
    font-size: 10pt;
    cursor: pointer;
  }
  &:hover::before {
    box-shadow: 0 0 8px 5px rgba(34, 60, 80, 0.2);
  }
  &:active::before {
    opacity: .5;
  }
}

</style>
