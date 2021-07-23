const { gql } = require('apollo-server')
const User = require('../models/User')

const books = [
   {
      title: 'The Awakening',
      author: 'Kate Chopin'
   },
   {
      title: 'City of Glass',
      author: 'Paul Auster'
   }
]

const tempUser = {
   _id: '1',
   email: 'bruh@bruh.com'
}

const typeDefs = gql`
   # This "Book" type defines the queryable fields for every book in our data source.
   type Book {
      title: String
      author: String
   }

   type User {
      _id: String
      name: String
      email: String
      password: String
      avatar: String
   }

   #    type BruhType {
   #       lol: String
   #    }

   # The "Query" type is special: it lists all of the available queries that
   # clients can execute, along with the return type for each. In this
   # case, the "books" query returns an array of zero or more Books (defined above).
   type Query {
      books: [Book]
      bruh: String
      currentUser: User
   }

   type Mutation {
      login(email: String!, password: String!): User
      signup(
         name: String!
         email: String!
         password: String!
         avatar: String
      ): User
   }
`

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
   Query: {
      // root = parent
      books: (root, args, context) => {
         return books
      },
      bruh: () => {
         return 'yo'
      },
      currentUser: () => tempUser
   },
   Mutation: {
      //can destructure args here
      login: async (root, { email, password }) => {
         const user = await User.findOne({ email })
         return user
      },
      signup: async (root, { name, email, password, avatar = '' }) => {
         const newUser = new User({
            name,
            email,
            password,
            avatar
         })
         return newUser.save()
      }
   }
}

module.exports = { typeDefs, resolvers }
