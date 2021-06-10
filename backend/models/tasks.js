let mongoose = require('mongoose')

let taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

let Task = (module.exports = mongoose.model('Task', taskSchema))
