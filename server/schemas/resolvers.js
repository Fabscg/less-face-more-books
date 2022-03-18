const { AuthenticationError } = require('apollo-server-core');
const { create } = require('domain');
const { saveBook } = require('../controllers/user-controller');
const { User, Book } = require('../models')
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('books')

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },

        users:async() => {
            return User.find()
            .select('__v -password')
            .populate('books')
        },
        user:async(parent, { username }) => {
            return User.findOne({ username })
            .select('__v -password')
            .populate('books')
        },
        book: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user)

            return { token, user }
        },
    },
    Mutation:{
        addUser:async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user)
                return { token, user }
        },
        login:async(parent, { email, password }) => {
            const user = await User. findOne({ email })
            if(!user){
                throw new AuthenticationError('Incorrect credentials')
            }
            const correctPw = await user.isCorrectPassword(password)
            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials')
            }
            const token = signToken(user)
            return { token, user }
        },
        addBook: async(parent,  args, context) => {
            if(context.user){
                const book = await Book.create({...args, username:context.user.username })
                await User.findByIdAndUpdate(
                    {_id:context.user._id },
                    {$push:{ books: book._id }},
                    { new: true }
                );
                return book;
            }
            throw new AuthenticationError('You need to be logged in!')
        },
        removeBook: async(parent,  {bookId }, context) => {
            if(context.user){
                const updateBook = await Book.remove(
                    { _id:bookId },
                    {$pull: { books: { book, username:context.user.username } } },
                    { new: true, runValidators: true }
                )
                return updateBook
            }
            throw new AuthenticationError('You need to be logged in!')
        }

    }
};

//adduser, saveBook, removeBook

module.exports = resolvers;