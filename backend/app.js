const express = require('express')
const cors = require('cors')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

mongoose.connect(
  'mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Mongo DB Connected')
})

let Task = require('./models/tasks')

app.use(express.json())
app.use(cors())

app.get('/', (req, resp) => {
  resp.send('<h1>This is API URL Home page.</h1>')
})

app.get('/api/v1/tasks', (req, resp) => {
  Task.find({}, function (err, tasks) {
    if (err) {
      console.log(err)
    } else {
      resp.json(tasks)
    }
  })
})

app.post('/api/v1/addTask', (req, res) => {
  let data = req.body
  let task = new Task()

  task.title = data.title
  task.description = data.description

  task.save(function (err) {
    if (err) {
      console.log(err)
    } else {
      res.json({
        status: 200,
        error: false,
        message: 'Task saved successfully',
        task: task,
      })
    }
  })
})

app.delete('/api/v1/deleteTask/:id', (req, res) => {
  let id = req.params.id

  Task.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log(error)
    } else {
      res.json({
        status: 200,
        error: false,
        message: 'Task deleted successfully',
      })
    }
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
