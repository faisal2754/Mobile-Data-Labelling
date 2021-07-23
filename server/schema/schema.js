const { gql } = require('apollo-server')
const jwt = require('jsonwebtoken')
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

const typeDefs = gql`
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
      jwt: String
   }

   #    type BruhType {
   #       lol: String
   #    }

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

const resolvers = {
   Query: {
      // root = parent
      books: (root, args, context) => {
         return books
      },
      bruh: () => {
         return 'yo'
      },
      currentUser: (root, args, { user }) => {
         return user
      }
   },
   Mutation: {
      //can destructure args here
      login: async (root, { email, password }, ctx) => {
         const user = await User.findOne({ email })

         if (!user) throw new Error('Email not found')
         if (user.password !== password) throw new Error('Password incorrect')

         user.jwt = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

         return user
      },
      signup: async (root, { name, email, password, avatar = '' }, ctx) => {
         const existingUser = await User.findOne({ email })

         if (existingUser) throw new Error('Email already used')

         const newUser = new User({
            name,
            email,
            password,
            avatar
         })
         const user = await newUser.save()

         user.jwt = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

         return user
      }
   }
}

module.exports = { typeDefs, resolvers }
