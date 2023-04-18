const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('this is first application backend')
})

app.get('/nodemon', (req, res) => {
  res.send('nodemon working')
})


app.listen(port, () => {
  console.log(`Your application started on http://localhost:${port}`)
})