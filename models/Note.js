const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = model('Note', noteSchema)

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })

// const note = new Note({
//   content: 'Me tengo que suscribir a @midudev en YouTube',
//   date: new Date(),
//   important: true
// })

// note.save().then(result => {
//   console.log('note saved!', result)
//   mongoose.connection.close()
// }).catch(error => {
//   console.log(error)
// })

module.exports = Note