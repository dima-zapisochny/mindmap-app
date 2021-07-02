export default class JsonFileService {
  loadJsonFile (event) {
    const file = event.target.files[0]
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(JSON.parse(reader.result))
      reader.onerror = reject
      reader.readAsText(file, 'gbk')
    })
  }

  downloadJsonFile (event, title, children) {
    const data = JSON.stringify({ title, children })
    const file = new Blob([data], { type: 'application/json' })
    event.target.href = URL.createObjectURL(file)
  }
}
