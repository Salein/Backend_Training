const http = require('http')

const server = http.createServer((req, res) => {
    res.end("Look at this... I'm a backend dev :D \n Toster take me a job")
})

server.listen(3000, () => {
    console.log('Server is running on port 3000')
})