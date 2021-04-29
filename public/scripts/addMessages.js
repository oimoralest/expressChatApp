// Creating a socket
const socket = io();

// Adding the messages to the index.html
const addMessages = ({ name, message }) => {
    const messagesDiv = document.querySelector('#messages');
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    h1.innerHTML = name;
    p.innerText = message;
    messagesDiv.prepend(p);
    messagesDiv.prepend(h1);
};

// Getting the messages from the server
const getMessages = async () => {
    const res = await axios.get('/messages');
    if (res.status !== 200) {
        console.log(res.data);
    } else {
        const messages = res.data.messages;
        messages.forEach((element) => {
            addMessages(element);
        });
    }
};

// Sending a new message to the server
const postMessages = async () => {
    const message = {};
    message.name = document.querySelector('#name').value;
    message.message = document.querySelector('#message').value;
    const res = await axios.post('/messages', message);
    if (res.status !== 201) {
        console.log(res.data);
    }
};

window.onload = () => {
    const btn = document.querySelector('#send');
    btn.addEventListener('click', () => {
        postMessages();
    });
    getMessages();
};

// Listen for message event
socket.on('message', addMessages);
