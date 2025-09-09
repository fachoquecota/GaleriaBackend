import { getExampleRepository } from '../repositories/example.repository.js';

export const getExampleService = async () => {
  return await getExampleRepository();
};
