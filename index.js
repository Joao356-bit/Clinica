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

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'TESTE - API da Clínica',
    version: '1.0.0',
  },
  paths: {
    '/pacientes': {
      get: {
        summary: 'Teste de Lista de Pacientes',
        responses: { '200': { description: 'Lista de pacientes.' } }
      }
    }
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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