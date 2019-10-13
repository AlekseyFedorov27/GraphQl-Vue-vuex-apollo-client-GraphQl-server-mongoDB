const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
const PORT = 3005;
app.use(cors());

const user = 'your user name';
const password = 'your password ';
const claster = 'your claster name' ;


mongoose.connect(
  `mongodb+srv://${user}:${password}@cluster0-yn85g.gcp.mongodb.net/${claster}?retryWrites=true&w=majority`,
  {useNewUrlParser: true, dbName: "google"});

app.use('/graphql', bodyParser.json(), graphqlHTTP({
  schema,
  graphiql: true,
}));



const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DataBase!'));

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});
