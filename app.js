const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todosRoute = require('./routes/todo');
const categoryRoute = require('./routes/category');
const cors = require('cors')
require('dotenv/config');

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/todo', todosRoute );
app.use('/category', categoryRoute);

//Connect DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('db connected');
})

app.get('/', (req, res) => {
    res.send('Server is working');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});


