import express from 'express'

const app = express()
const port = 3000

app.use(express.json())

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

app.get('users', (req, res) => {
  let foundUserName = users
  if (req.query.name) {
    foundUserName = foundUserName.filter(user => user.name.includes(req.query.name as string))
  }

  if (!foundUserName.length) {
    res.sendStatus(404)
    return
  }
  res.json(foundUserName)
})

app.post('/users', (req, res) => {
  //если клиент забыл передать в запросе даные о пользователе
  if (!req.body.name || !req.body.age) {
    res.sendStatus(400)
    return
  }

  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age
  }
    // с клиента нужно отправлять запрос с хедером(в хедере указать 'content-type': 'application/json') чтобы body не было undefined
  //с сереализацией, прим: body: JSON.stringify()
  users.push(newUser)
  res.json(newUser)
})

app.listen(port, () => {
  console.log(`Your application started on http://localhost:${port}`)
})