const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()
const { typeDefs, resolvers } = require('./schema/schema')
const { getUser } = require('./utils/getUser')

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

const server = new ApolloServer({
   typeDefs,
   resolvers,
   context: ({ req }) => {
      const token = req.headers.authorization
      const user = getUser(token)
      return { user }
   }
})

server.listen().then(({ url }) => {
   console.log(`🚀  Server ready at ${url}`)
})
