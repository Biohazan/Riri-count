const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user')
const comptRoutes = require('./routes/compt')
const fs = require('fs')
require('dotenv').config()


const app = express();
mongoose.connect(`mongodb+srv://Biohaz:${process.env.MONGOOSE_PASS}@${process.env.MONGOOSE_URL}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/auth', userRoutes)
app.use('/api', comptRoutes)

module.exports = app;