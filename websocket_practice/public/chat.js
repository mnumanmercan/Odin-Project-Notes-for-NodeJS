const socket = io.connect('http://localhost:3000');

const sender = document.querySelector('#sender');
const message = document.querySelector('#message');
const submitBtn = document.querySelector('#submitBtn');
const output = document.querySelector('#output');
const feedback = document.querySelector('#feedback');

submitBtn.addEventListener('click', () => {
    console.log('Submit butonuna basıldı.')

    socket.emit('chat', {
        message: message.value || '',
        sender: sender.value || ''
    })
});

socket.on('chat', data => {
    output.innerHTML += `
        <p>
            <strong>${ data.sender }: </strong>${ data.message } 
        </p>`;
    
    message.value = '';
    feedback.innerHTML = '';
})

socket.on('typing', sender => {
    feedback.innerHTML = `<p>${sender} yazıyor...</p>`;
})

message.addEventListener('input', () => {
    socket.emit('typing', sender.value);
})