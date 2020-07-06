module.exports = {
  multipleEndpoints: true, // *  Default false
  endpoint: ['/planetary/apod?api_key=DEMO_KEY'], //* Array if multiple is true
  baseUrl: 'https://api.nasa.gov', 
  mockDirectory: '__APIMocks__'//* Default will be __APIMocks__ (Working Name)
}
