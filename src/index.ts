import express from 'express'

const app = express()
const port = 3000

const users = [{
  id: 1,
  name: 'John Doe',
  age: 30
},
{
  id: 2,
  name: 'Jane Doe',
  age: 25
},
{
  id: 3,
  name: 'Jack Doe',
  age: 20
},
{
  id: 4,
  name: 'Jill Doe',
  age: 15
}
]

app.get('/users', (req, res) => {
  res.json({ users })
})

app.get('/users/:id', (req, res) => {
  const foundUser = users.find(user => user.id === parseInt(req.params.id))

  if (!foundUser) {
    res.sendStatus(404)
    return
  }
  res.json(foundUser)
})

app.post('/users', (req, res) => {
  const newUser = req.body
  users.push(newUser)
  res.json(newUser)
})

app.listen(port, () => {
  console.log(`Your application started on http://localhost:${port}`)
})