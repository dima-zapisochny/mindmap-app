<template>
  <header>
    <a href="" download="data.json" class="download-file__button" @click="downloadJsonFile">DOWNLOAD JSON FILE</a>
    <input type="file" class="load-file__button" name="files" @change="loadJsonFile"/>
    <h3 class="header__title">MINDMAP APP</h3>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      TITLE: 'TITLE',
      CHILDREN: 'CHILDREN'
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
      const title = this.TITLE
      const children = this.CHILDREN
      console.log(this.CHILDREN)
      const data = JSON.stringify({ title, children })
      const file = new Blob([data], { type: 'application/json' })
      event.target.href = URL.createObjectURL(file)
    }
  }
}
</script>

<style scoped>

header {
  height: 70px;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 10px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 10px 0px rgba(34, 60, 80, 0.2);
}

.download-file__button {
  text-decoration: none;
  background-color: darkcyan;
  margin: 15px;
  padding: 10px 15px;
  border: 2px solid darkcyan;
  color: white;
  border-radius: 3px;
  font-weight: 700;
  font-size: 10pt;
  cursor: pointer;
}

.download-file__button:hover {
  -webkit-box-shadow: 0px 0px 8px 5px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 8px 5px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 8px 5px rgba(34, 60, 80, 0.2);
}

.download-file__button:active {
  opacity: .5;
}

.load-file__button {
  color: transparent;
}

.load-file__button::-webkit-file-upload-button {
  visibility: hidden;
}
.load-file__button:before {
  content: 'CHOOSE JSON FILE';
  margin: 15px;
  padding: 10px 15px;
  background-color: darkcyan;
  display: inline-block;
  border: 2px solid darkcyan;
  border-radius: 3px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  color: white;
  font-weight: 700;
  font-size: 10pt;
  cursor: pointer;
}
.load-file__button:hover::before {
  -webkit-box-shadow: 0px 0px 8px 5px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 8px 5px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 8px 5px rgba(34, 60, 80, 0.2);
}

.load-file__button:active::before {
  opacity: .5;
}

.header__title {
  margin: 25px;
  color: darkcyan;
  display: inline-flex;
  float: right;
}

</style>
