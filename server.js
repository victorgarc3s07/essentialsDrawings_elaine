const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Conectado ao servidor.')
})

const port = process.env.port || 3000

app.listen(port, () => {
    console.log(`Conectado ao servidor na porta ${port}.`)
})