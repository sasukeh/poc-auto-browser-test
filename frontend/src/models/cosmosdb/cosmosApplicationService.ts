import { CosmosRepository } from './cosmosRepository';

export const selectCosmosData = async () => {
  try {
    const repo = new CosmosRepository();
    return await repo.selectCosmosData();
  } catch (err) {
    return err;
  }
};

export const createCosmosData = async () => {
  try {
    const repo = new CosmosRepository();
    return await repo.createCosmosData();
  } catch (err) {
    return err;
  }
};
