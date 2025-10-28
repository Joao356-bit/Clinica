
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

const pacientesRoutes = require('./routes/pacientesRoutes.js');
app.use('/pacientes', pacientesRoutes); 

app.get('/', (req, res) => {
    res.send('API da Clínica de Fisioterapia no ar!');
});

const simpleSwaggerDoc = {
  openapi: '3.0.0',
  info: {
    title: 'TESTE SIMPLES DE SWAGGER',
    version: '1.0.0',
    description: 'Se isto aparecer, o problema é o JSON antigo.'
  },
  paths: {} 
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(simpleSwaggerDoc));

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