import { getExampleService } from '../services/example.service.js';

export const getExample = async (req, res) => {
  try {
    const data = await getExampleService();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
