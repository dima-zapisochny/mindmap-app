<template>
  <header class="header-app">
    <a href="" download="data.json" class="download-file-button" @click="downloadJsonFile">DOWNLOAD JSON FILE</a>
    <input type="file" class="load-file-button" name="files" @change="loadJsonFile"/>
    <h3 class="header-app__title">MINDMAP APP</h3>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      title: 'TITLE',
      children: 'CHILDREN'
    })
  },
  methods: {
    ...mapMutations({
      SET_TITLE_TO_STORE: 'SET_TITLE_TO_STORE',
      SET_ITEMS_TO_STORE: 'SET_ITEMS_TO_STORE'
    }),
    loadJsonFile (event) {
      const files = event.target.files
      files.forEach((file) => {
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsText(file, 'gbk')
        }).then((result) => {
          const resultJSON = JSON.parse(result)
          this.SET_TITLE_TO_STORE(resultJSON.title)
          this.SET_ITEMS_TO_STORE(resultJSON.children)
        })
      })
    },
    downloadJsonFile (event) {
      const title = this.title
      const children = this.children
      const data = JSON.stringify({ title, children })
      const file = new Blob([data], { type: 'application/json' })
      event.target.href = URL.createObjectURL(file)
    }
  }
}
</script>

<style lang="scss" scoped>

.header-app {
  height: 70px;
  box-shadow: 0px 5px 10px 0px rgba(34, 60, 80, 0.2);
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
    webkit-box-shadow: 0px 0px 8px 5px rgba(34, 60, 80, 0.2);
    moz-box-shadow: 0px 0px 8px 5px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 0px 8px 5px rgba(34, 60, 80, 0.2);
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
    box-shadow: 0px 0px 8px 5px rgba(34, 60, 80, 0.2);
  }
  &:active::before {
    opacity: .5;
  }
}

</style>
