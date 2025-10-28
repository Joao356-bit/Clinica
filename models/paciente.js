const mongoose = require('mongoose');

const PacienteSchema = new mongoose.Schema({
    nomeCompleto: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    dataInicioTratamento: { type: Date, default: Date.now },
    problemas: [String], 
    sessoesContratadas: { type: Number, required: true },
    sessoesRealizadas: { type: Number, default: 0 },
    ativo: { type: Boolean, default: true }
});

module.exports = mongoose.model('paciente', PacienteSchema);