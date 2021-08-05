import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { typeDefs, resolvers } from './schema/schema.js'
import { getUser } from './utils/getUser.js'

dotenv.config()

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
