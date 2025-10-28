const Paciente = require('../models/paciente');

const createPaciente = async (req, res) => {
    try {
        const novoPaciente = new Paciente(req.body);
        await novoPaciente.save();
        res.status(201).json({ message: "Paciente criado com sucesso!", data: novoPaciente });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.status(200).json(pacientes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getPacienteById = async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id);
        if (!paciente) return res.status(404).json({ message: "Paciente não encontrado" });
        res.status(200).json(paciente);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updatePaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!paciente) return res.status(404).json({ message: "Paciente não encontrado" });
        res.status(200).json({ message: "Paciente atualizado!", data: paciente });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deletePaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findByIdAndDelete(req.params.id);
        if (!paciente) return res.status(404).json({ message: "Paciente não encontrado" });
        res.status(200).json({ message: "Paciente deletado com sucesso" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createPaciente,
    getAllPacientes,
    getPacienteById,
    updatePaciente,
    deletePaciente
};