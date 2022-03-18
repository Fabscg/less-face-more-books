import {
    GraphQList,
    GraphQLNonNull,
} from 'graphql';
import { isEmail } from 'validator';
import { createUser } from '../..operation/users-operations';
import CreateUserPayload from './CreateUserPayload'

const { gql } = require('apollo-server-express');




const typeDefs = gql`
  type Query{
    me:User
}

  type User{
    _id: ID
    username: String
    email: String
    bookCount: Int
    saveBooks: (username:String!)[Book]
  }
type Mutation{
    login(email:String!, password:String!): Auth
    addUser(username:String!, email:String!, password:String!): Auth
    saveBook:[Book]
    removeBook: (bookId:ID, username:String!
}
type Book{
    bookId:ID
    authors:[String!]
    description:String
    title:String
    image:String
    link:String!
}
type Auth{
    token:ID!
    user:User
}
`;

module.exports = typeDefs;


module.expors = typeDefs;



