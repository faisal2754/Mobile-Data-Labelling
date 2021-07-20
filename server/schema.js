const { gql } = require('apollo-server')

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
   # This "Book" type defines the queryable fields for every book in our data source.
   type Book {
      title: String
      author: String
   }

   # The "Query" type is special: it lists all of the available queries that
   # clients can execute, along with the return type for each. In this
   # case, the "books" query returns an array of zero or more Books (defined above).
   type Query {
      books: [Book]
   }
`

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
   Query: {
      books: () => books
   }
}

module.exports = { typeDefs, resolvers }
