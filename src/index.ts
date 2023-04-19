import express from 'express'

const app = express()
const port = 3000

const HTTP_STATUS_CODE = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404
}

app.use(express.json())

let users = [{
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
    res.sendStatus(HTTP_STATUS_CODE.NOT_FOUND_404)
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
    res.sendStatus(HTTP_STATUS_CODE.NOT_FOUND_404)
    return
  }
  res.json(foundUserName)
})

app.post('/users', (req, res) => {
  //если клиент забыл передать в запросе даные о пользователе
  if (!req.body.name || !req.body.age) {
    res.sendStatus(HTTP_STATUS_CODE.BAD_REQUEST_400)
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
  res.status(HTTP_STATUS_CODE.CREATED_201).json(newUser)
})

app.delete('/users/:id', (req, res) => {
  users = users.filter(user => user.id !== parseInt(req.params.id))
  //204 - no content
  res.sendStatus(HTTP_STATUS_CODE.NO_CONTENT_204)
})

//обновление данных методом PUT
app.put('/users/:id', (req, res) => {
  const foundUser = users.find(user => user.id === parseInt(req.params.id))
//если клиент не передал данные о пользователе, вернем статус 400
  if (!req.body.name || !req.body.age) {
    res.sendStatus(HTTP_STATUS_CODE.BAD_REQUEST_400)
    return
  }

  if (!foundUser) {
    res.sendStatus(HTTP_STATUS_CODE.NOT_FOUND_404)
    return
  }

  foundUser.name = req.body.name
  foundUser.age = req.body.age

  res.json(foundUser)
})

app.listen(port, () => {
  console.log(`Your application started on http://localhost:${port}`)
})