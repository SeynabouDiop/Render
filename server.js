require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
// Middleware
app.use(cors({
  origin: ['http://localhost:4200', 'https://vercel-phi-coral.vercel.app'], // Remplacez par votre URL Vercel
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connecté à MongoDB Atlas'))
    .catch(err => console.error('Erreur de connexion:', err));

// Routes
app.use('/api/auth', authRoutes);

// Route de test
app.get('/', (req, res) => {
    res.json({ message: 'API fonctionne!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
