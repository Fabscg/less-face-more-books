//import the gql tagged  template function

const { gql } = require('apollo-server-express');


const typeDefs = gql`
  type Query{
    me:User
    users:[User]
    user(username:String!): User
    books(username:String): [Book]
    book(_id:ID!): Book
}

  type User{
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Book{
    bookId:ID
    authors:[String!]
    description:String
    title:String
    image:String
    link:String!
}
type Mutation{
  setMessage(message: String): String
    login(email:String!, password:String!): Auth
    addUser(username:String!, email:String!, password:String!): Auth
    saveBook(title:String, description:String,  link:String, bookId: ID!, bookId:ID! ): User
    removeBook(bookId:ID!): User
}

type Auth{
    token:ID!
    user:User
}
`;

module.exports = typeDefs;




