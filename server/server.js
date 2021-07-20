const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()
const { typeDefs, resolvers } = require('./schema/schema')

async function connectDB() {
   await mongoose.connect(
      process.env.DB_CONNECT,
      {
         useUnifiedTopology: true,
         useNewUrlParser: true,
         useFindAndModify: false,
         useCreateIndex: true
      },
      () => {
         console.log('connected to db!')
      }
   )
}

//safety starts
mongoose.connection.on('error', (err) => {
   console.log(err)
})
//end of safety

connectDB()
const connection = mongoose.connection

// console.log(connection)

const server = new ApolloServer({ typeDefs, resolvers, connection })

server.listen().then(({ url }) => {
   console.log(`🚀  Server ready at ${url}`)
})
