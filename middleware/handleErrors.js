module.exports = (error, req, res, next) => {
  console.error(error)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  res.status(500).end()
}