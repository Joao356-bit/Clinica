require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const pacientesRoutes = require('./routes/pacientesRoutes.js');
app.use('/pacientes', pacientesRoutes); 

app.get('/', (req, res) => {
    res.send('API da Clínica de Fisioterapia no ar!');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Conectado ao MongoDB Atlas!");
        const PORT = process.env.PORT || 3000; 
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Erro ao conectar no MongoDB:", err);
    });