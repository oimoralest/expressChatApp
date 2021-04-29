// Importing
import express from 'express';
import Message from '../models/message.js';
import { io } from '../src/app.js';

// Creating a router
const homeRouter = express.Router();

// Rendering the index view
homeRouter.get('', (req, res, next) => {
    res.render('index');
});

// Handling http get method for /messages endpoint
// Here all the messages are loaded from Atlas
homeRouter.get('/messages', async (req, res, next) => {
    try {
        const messages = await Message.find();
        if (!messages) {
            return res
                .status(500)
                .json({ Error: 'Error loading old messages' });
        }
        res.status(200).send({
            messages: messages,
        });
    } catch (err) {
        res.status(500).json({ Error: err });
    }
});

// Handling http post method for /messages endpoint
// Here a new message sent by a user is stored on Atlas
homeRouter.post('/messages', async (req, res, next) => {
    try {
        let message = new Message({
            name: req.body.name,
            message: req.body.message,
        });
        message = await message.save();
        if (!message) {
            return res
                .status(500)
                .json({ Error: 'The message could not been sent!' });
        }
        io.emit('message', req.body);
        res.status(201).send();
    } catch (err) {
        res.status(500).json({ Error: err });
    }
});

export default homeRouter;
