const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

const CONNECTION_URL = "mongodb+srv://ahadbokhari:Advanced75@cluster0.yg4iqxz.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(CONNECTION_URL);
mongoose.connection.once('open', () => {
  console.log('Connection to DB successful');
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
