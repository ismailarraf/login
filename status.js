const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('OK'); // Success response
});

app.get('/notfound', (req, res) => {
    res.status(404).send('Not Found'); // Client error response
});

app.post('/create', (req, res) => {
    res.status(201).send('Created'); // Resource created successfully
});

app.use((req, res) => {
    res.status(500).send('Internal Server Error'); // Server error response
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
