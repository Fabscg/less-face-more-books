const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schemas')

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  //create a new apollo server and pass it in to our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:authMiddleware
  })
  //start apollo server
  await server.start()
  server.applyMiddleware({ app })
  console.log((`Use GraphQL at http://0.0.0.0:27017:${PORT}${server.graphqlPath}`));
}

//initialize the Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
  })
}

app.use(routes);
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on 0.0.0.0:27017:${PORT}`));
});
