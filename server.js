// Suggested code may be subject to a license. Learn more: ~LicenseLog:1890934917.
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


dotenv.config();
const app = express()
app.use(express.static('public'));

const mongoUri = 'mongodb+srv://admin:admin123@backenddb.iadhul6.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Database'))
    .catch((error) => console.error('Database connection error:', error));

const db = mongoose.connection;
db.on('error', (error) => console.error(error));

app.use(bodyParser.json());

app.all("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

const prodiRoutes = require('./routes/prodiRoutes');
app.use('/prodi', prodiRoutes);

app.listen(3000, () => console.log(`server run on http://localhost:3000/`));