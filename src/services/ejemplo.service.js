import {
  getAllEjemploRepository,
  getEjemploByIdRepository,
  createEjemploRepository,
  updateEjemploRepository,
  deleteEjemploRepository
} from '../repositories/ejemplo.repository.js';

export const getAllEjemploService = async () => {
  return await getAllEjemploRepository();
};

export const getEjemploByIdService = async (id) => {
  return await getEjemploByIdRepository(id);
};

export const createEjemploService = async (nombre, edad) => {
  return await createEjemploRepository(nombre, edad);
};

export const updateEjemploService = async (id, nombre, edad) => {
  return await updateEjemploRepository(id, nombre, edad);
};

export const deleteEjemploService = async (id) => {
  return await deleteEjemploRepository(id);
};
