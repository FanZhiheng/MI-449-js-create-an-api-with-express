var todos = require('./todos.js')
var express = require('express')
var app = express()
var port = process.env.PORT || 8080
var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/', function (request, response) {
  response.json({
    welcome: 'welcome to FanZhiheng\'s API!'
  })
})

app.get('/todos', function (request, response) {
  response.json(todos)
})

app.get('/todos/:id', function (request, response) {
  if ((todos[request.params.id])) {
    response.json(todos[request.params.id])
  } else {
    response.status(404).json({ message: request.params.id + ' not found' })
  }
})

app.post('/todos', function (request, response) {
  var slug = request.body.what.trim().toLowerCase().split(' ').join('-')
  todos[slug] = {
    what: request.body.what,
    when: request.body.when
  }
  response.redirect('/todos/' + slug)
})

app.delete('/todos/:id', function (request, response) {
  delete todos[request.params.id]
  response.redirect('/todos')
})

app.put('/todos/:id', function (request, response) {
  var todo = todos[request.params.id]
  if (request.body.what !== undefined) {
    todo.what = request.body.what.trim()
  }
  if (request.body.when !== undefined) {
    todo.when = request.body.when.trim()
  }
  response.redirect('/todos/' + request.params.id)
})
app.use(function (request, response, next) {
  response.status(404).end(request.url + ' not found')
})
app.listen(port)
