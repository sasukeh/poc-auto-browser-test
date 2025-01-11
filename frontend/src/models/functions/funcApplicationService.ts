import { FuncRepository } from './funcRepository';

export const startAgentTest = async () => {
  try {
    const repo = new FuncRepository();
    return await repo.startAgentTest();
  } catch (err) {
    return err;
  }
};
