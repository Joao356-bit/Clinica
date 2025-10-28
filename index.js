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
    title: 'API de Clínica de Fisioterapia',
    version: '1.0.0',
    description: 'API para gerenciamento de pacientes (CRUD) - OAT2 de Sistemas de Informação',
  },
  servers: [ 
    { 
      url: 'https://clinica-lake-seven.vercel.app',
      description: 'Servidor de Produção (Vercel)' 
    } 
  ],
  paths: {
    '/pacientes': {
      post: {
        summary: 'Cria um novo paciente',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Paciente' } } }
        },
        responses: { '201': { description: 'Paciente criado com sucesso.' } }
      },
      get: {
        summary: 'Lista todos os pacientes',
        responses: { '200': { description: 'Lista de pacientes.' } }
      }
    },
    '/pacientes/{id}': {
      get: {
        summary: 'Busca um paciente por ID',
        parameters: [ { in: 'path', name: 'id', required: true, schema: { type: 'string' } } ],
        responses: { '200': { description: 'Dados do paciente.' }, '404': { description: 'Paciente não encontrado.' } }
      },
      put: {
        summary: 'Atualiza um paciente por ID',
        parameters: [ { in: 'path', name: 'id', required: true, schema: { type: 'string' } } ],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Paciente' } } }
        },
        responses: { '200': { description: 'Paciente atualizado.' }, '404': { description: 'Paciente não encontrado.' } }
      },
      delete: {
        summary: 'Deleta um paciente por ID',
        parameters: [ { in: 'path', name: 'id', required: true, schema: { type: 'string' } } ],
        responses: { '200': { description: 'Paciente deletado com sucesso.' }, '404': { description: 'Paciente não encontrado.' } }
      }
    }
  },
  components: {
    schemas: {
      Paciente: {
        type: 'object',
        properties: {
          nomeCompleto: { type: 'string', description: 'Nome do paciente.' },
          cpf: { type: 'string', description: 'CPF (único).' },
          sessoesContratadas: { type: 'number', description: 'Total de sessões.' },
          problemas: { type: 'array', items: { type: 'string' }, description: 'Lista de problemas/diagnósticos.' }
        },
        example: {
          nomeCompleto: "Maria Souza",
          cpf: "111.222.333-44",
          sessoesContratadas: 10,
          problemas: ["Dor no joelho", "Pós-operatório"]
        }
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