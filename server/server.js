const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()
const { typeDefs, resolvers } = require('./schema/schema')

const conn = mongoose.createConnection(
   process.env.DB_CONNECT,
   {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
   },
   () => console.log('Connected to db')
)

const server = new ApolloServer({ typeDefs, resolvers, conn })

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
   console.log(`🚀  Server ready at ${url}`)
})
