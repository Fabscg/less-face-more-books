import { gql } from '@apollo/client';

export const GET_ME = gql`
query me( $username:String!){
    user(username:$username){
_id
username
email
bookCount
books{
    _id
    authors
    description
    title
    image
    link
    username
     }
   }
}
`