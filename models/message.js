import mongoose from 'mongoose';

// Defining the message model
const messageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
