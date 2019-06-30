const express = require('express');
const app = express();
const expressValidator = require('express-validator');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

dotenv.config();

// db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => console.log(`DB Connection Error: ${err}`));

// Bring in the routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', postRoutes);
app.use('/', authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port: ${port}`));