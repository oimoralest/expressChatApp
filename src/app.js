// Importing
import express from 'express';
import 'dotenv/config.js';
import helmet from 'helmet';
import homeRouter from '../routers/homeRouter.js';
import contentSecurityPolicy from '../middlewares/contentSecurityPolicy.js';
import mongoose from 'mongoose';
import { createRequire } from 'module';

// Creating the app
const app = express();

// MIDDLEWARES
app.use(contentSecurityPolicy);

// Protecting the app
app.use(helmet());

// CONSTANTS
const port = process.env.PORT || 8000;
const require = createRequire(import.meta.url);

// Enabling public content
app.use(express.static('public'));

// Setting view engine
app.set('views', process.cwd() + '/views');
app.set('view engine', 'pug');

// Parsing to create body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTERS
app.use('', homeRouter);

// Connecting to database
mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('Database connection was made succesfully');
    })
    .catch((err) => {
        console.log(err);
    });

// Running the server
const http = require('http').Server(app);
export const io = require('socket.io')(http);
http.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Checking new connection
io.on('connection', (socket) => {
    console.log('A new user connected');
});
