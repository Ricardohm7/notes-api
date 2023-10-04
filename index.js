require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const Note = require('./models/Note')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/notes', async (req, res) => {
  const notes = await Note.find({})
  return res.json(notes)
})

app.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id
  Note.findById(id).then(note => {
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  }).catch(err => {
    next(err)
  })
})

app.post('/api/notes', async (req, res, next) => {
  const note = req.body
  if (!note.content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }

  const newNote = new Note({
    content: note.content,
    important: note.important || false,
    date: new Date(),
  })

  try {
    const savedNote = await newNote.save()
    return res.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }

})

app.put('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  const note = request.body
  const newNoteInfo = {
    content: note.content,
    important: note.important,
  }
  Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then(result => {
    response.json(result)
  }).catch(err => {
    next(err)
  })
})

app.delete('/api/notes/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    await Note.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.use(notFound)

app.use(handleErrors)


const PORT = process.env.PORT
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = { app, server }
