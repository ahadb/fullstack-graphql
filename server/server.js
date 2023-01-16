const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

// your connection url
const CONNECTION_URL = "";
mongoose.connect(CONNECTION_URL);
mongoose.connection.once('open', () => {
  console.log('Connection to DB successful');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
