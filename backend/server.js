require('dotenv').config();
require('./database/db');

const authRoutes = require('./routes/auth');

const express = require('express');
const cors = require('cors');

const app = express();

const contactoRoutes = require('./routes/contacto');

app.use(cors());

app.use(express.json());

app.use('/api', contactoRoutes);

app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});