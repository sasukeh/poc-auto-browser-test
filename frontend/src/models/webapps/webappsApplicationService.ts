import { WebAppsRepository } from './webappsRepository';

export const startAgentTest = async (message: string) => {
  try {
    const repo = new WebAppsRepository();
    return await repo.startAgentTest(message);
  } catch (err) {
    return err;
  }
};
