const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()
const { typeDefs, resolvers } = require('./schema/schema')

const connect = async () => {
   mongoose.connect(
      process.env.DB_CONNECT,
      {
         useUnifiedTopology: true,
         useNewUrlParser: true,
         useFindAndModify: false,
         useCreateIndex: true
      },
      () => {
         console.log('Connected to db')
      }
   )
}

connect()
const connection = mongoose.connection

const server = new ApolloServer({ typeDefs, resolvers, context: connection })

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
   console.log(`🚀  Server ready at ${url}`)
})
