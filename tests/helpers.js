const supertest = require('supertest')
const { app } = require('../index')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
    date: new Date(),
  },
  {
    content: 'Browser can execute only Javascript',
    important: true,
    date: new Date(),
  },
  {
    content: 'HOHO',
    important: true,
    date: new Date(),
  },
]

const api = supertest(app)

const getAllContentFromNotes = async () => {
  const response = await api.get('/api/notes')
  return { contents: response.body.map(note => note.content), response }
}


module.exports = { initialNotes, api, getAllContentFromNotes }