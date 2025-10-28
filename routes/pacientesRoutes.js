const express = require('express');
const router = express.Router();
const controller = require('../controllers/pacienteController');

/**
 * @swagger
 * /pacientes:
 * post:
 * summary: Cria um novo paciente
 * description: Adiciona um novo paciente ao banco de dados.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Paciente' 
 * responses:
 * 201:
 * description: Paciente criado com sucesso.
 */
router.post('/', controller.createPaciente);

/**
 * @swagger
 * /pacientes:
 * get:
 * summary: Lista todos os pacientes
 * description: Retorna uma lista de todos os pacientes ativos e inativos.
 * responses:
 * 200:
 * description: Lista de pacientes.
 */
router.get('/', controller.getAllPacientes);

/**
 * @swagger
 * /pacientes/{id}:
 * get:
 * summary: Busca um paciente por ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: O ID do paciente.
 * responses:
 * 200:
 * description: Dados do paciente.
 * 404:
 * description: Paciente não encontrado.
 */
router.get('/:id', controller.getPacienteById);

/**
 * @swagger
 * /pacientes/{id}:
 * put:
 * summary: Atualiza um paciente por ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: O ID do paciente.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Paciente'
 * responses:
 * 200:
 * description: Paciente atualizado.
 * 404:
 * description: Paciente não encontrado.
 */
router.put('/:id', controller.updatePaciente);

/**
 * @swagger
 * /pacientes/{id}:
 * delete:
 * summary: Deleta um paciente por ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: O ID do paciente.
 * responses:
 * 200:
 * description: Paciente deletado com sucesso.
 * 404:
 * description: Paciente não encontrado.
 */
router.delete('/:id', controller.deletePaciente);


/**
 * @swagger
 * components:
 * schemas:
 * Paciente:
 * type: object
 * properties:
 * nomeCompleto:
 * type: string
 * description: Nome do paciente.
 * cpf:
 * type: string
 * description: CPF (único).
 * sessoesContratadas:
 * type: number
 * description: Total de sessões.
 * problemas:
 * type: array
 * items:
 * type: string
 * description: Lista de problemas/diagnósticos.
 * example:
 * nomeCompleto: "Maria Souza"
 * cpf: "111.222.333-44"
 * sessoesContratadas: 10
 * problemas: ["Dor no joelho", "Pós-operatório"]
 */

module.exports = router;