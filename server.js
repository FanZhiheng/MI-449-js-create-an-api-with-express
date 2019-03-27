var todos = require('./todos.js')
var express = require('express')
var app = express()
var port = process.env.PORT || 8080
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', function (request, response) {
  response.json({
    welcome: 'welcome to my API!'
  })
})

app.get('/todos', function (request, response) {
  response.json(todos)
})

app.get('/todos/:id', function (request, response) {
  if (!todos[request.params.id]) {
    response.status(404).json('sorry, no such todos: ' + request.params.id)
    return
  }
  response.json(todos[request.params.id])
})

app.post('/todos', function (request, response) {
  var id = request.body.id.trim().toLowerCase().split(' ').join('-')
  todos[id] = {
    plan: request.body.plan,
    time: request.body.time
  }
  response.redirect('/todos/' + id)
})

app.delete('/todos/:id', function (request, response) {
  delete todos[request.params.id]
  response.redirect('/todos')
})

app.put('/todos/:id', function (request, response) {
  var todo = todos[request.params.id]
  if (request.body.plan !== undefined) {
    todo.plan = request.body.plan.trim()
  }
  if (request.body.time !== undefined) {
    todo.time = request.body.time.trim()
  }
    response.redirect('/todos/' + request.params.id)
})

app.use(function (request, response, next) {
  response.status(404).end(request.url + ' not found')
})

app.listen(port)