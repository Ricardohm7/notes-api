const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString =
  NODE_ENV === 'test' ?
    MONGO_DB_URI_TEST :
    MONGO_DB_URI

mongoose.connect(connectionString).then(() => {
  console.log('connected to MongoDB')
}).catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

process.on('uncaughtException', () => {
  mongoose.connection.close()
})