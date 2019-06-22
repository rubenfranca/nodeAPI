const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

// db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => console.log(`DB Connection Error: ${err}`));

// Bring in the routes
const postRoutes = require('./routes/post');

// middleware
app.use(morgan('dev'));

app.use('/', postRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port: ${port}`));