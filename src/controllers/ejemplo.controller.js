import {
  getAllEjemploService,
  getEjemploByIdService,
  createEjemploService,
  updateEjemploService,
  deleteEjemploService
} from '../services/ejemplo.service.js';

export const getAllEjemplo = async (req, res) => {
  try {
    const data = await getAllEjemploService();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getEjemploById = async (req, res) => {
  try {
    const data = await getEjemploByIdService(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createEjemplo = async (req, res) => {
  try {
    const { nombre, edad } = req.body;
    const newId = await createEjemploService(nombre, edad);
    res.status(201).json({ success: true, id: newId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateEjemplo = async (req, res) => {
  try {
    const { nombre, edad } = req.body;
    await updateEjemploService(req.params.id, nombre, edad);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteEjemplo = async (req, res) => {
  try {
    await deleteEjemploService(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
