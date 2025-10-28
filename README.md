# API de Controle de Pacientes - Clínica de Fisioterapia

API RESTful desenvolvida como projeto avaliativo (OAT2) para a disciplina de **Desenvolvimento de API’s** do curso de **Sistemas de Informação**, ministrada pelo Prof. Pedro Borges.

## Objetivo do Projeto

O objetivo é uma API back-end completa que gerencia um **CRUD (Create, Read, Update, Delete)** de pacientes. A API permite o cadastro, consulta, atualização e exclusão de pacientes, armazenando informações essenciais como dados pessoais, diagnósticos e controle de sessões.

---

## Tecnologias Utilizadas

Este projeto foi construído utilizando a seguinte stack:

* **Back-end:** Node.js
* **Framework:** Express.js (Para gerenciamento das rotas e do servidor)
* **Banco de Dados:** MongoDB Atlas (Banco de dados NoSQL de documentos, hospedado na nuvem)
* **ODM:** Mongoose (Para modelagem dos dados e conexão com o MongoDB)
* **Documentação da API:** Swagger (via `swagger-ui-express`)
* **Hospedagem (Deploy):** Vercel

---

## Documentação da API (Swagger)

Toda a documentação dos endpoints, incluindo métodos (GET, POST, PUT, DELETE), parâmetros necessários e exemplos de *request/response*, está disponível e pode ser testada interativamente através do link do Swagger.

**Link da Documentação (Swagger UI):**
**https://vercel.com/joao-luiz-correia-santanas-projects/clinica/api-docs**

---

## Endpoints Disponíveis

A API segue os padrões RESTful para o gerenciamento de pacientes.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/pacientes` | Cria um novo paciente no banco de dados. |
| `GET` | `/pacientes` | Retorna uma lista com todos os pacientes. |
| `GET` | `/pacientes/:id` | Busca um único paciente pelo seu `_id`. |
| `PUT` | `/pacientes/:id` | Atualiza os dados de um paciente existente. |
| `DELETE` | `/pacientes/:id` | Remove um paciente do banco de dados. |

---

## Schema do Paciente

O modelo de dados principal (`Paciente`) segue a seguinte estrutura:

```json
{
  "nomeCompleto": "String (Obrigatório)",
  "cpf": "String (Obrigatório, Único)",
  "dataInicioTratamento": "Date (Padrão: Data atual)",
  "problemas": "[String] (Array de strings)",
  "sessoesContratadas": "Number (Obrigatório)",
  "sessoesRealizadas": "Number (Padrão: 0)",
  "ativo": "Boolean (Padrão: true)"
}