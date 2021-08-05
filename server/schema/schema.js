const { gql } = require('apollo-server')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const typeDefs = gql`
   type User {
      _id: String
      name: String
      email: String
      password: String
      avatar: String
      jwt: String
   }

   type Query {
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
      currentUser: (_, __, { user }) => {
         return user
      }
   },
   Mutation: {
      login: async (_, { email, password }, ctx) => {
         const user = await User.findOne({ email })

         if (!user) throw new Error('Email not found')
         if (user.password !== password) throw new Error('Password incorrect')

         user.jwt = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

         return user
      },
      signup: async (_, { name, email, password, avatar = '' }) => {
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
