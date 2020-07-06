module.exports = {
  multipleEndpoints: true, // *  Default false
  endpoint: ['/planetary/apod?api_key=DEMO_KEY'], //* Array if multiple is true
  api: 'https://api.nasa.gov', 
  dirName: //* Default will be __APIMocks__ (Working Name)
}
