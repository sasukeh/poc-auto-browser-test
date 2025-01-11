import { ItemType } from '@/types/types';
import { Container, CosmosClient, Database } from '@azure/cosmos';

export class CosmosRepository {
  private container: Container;
  private database: Database;
  private client: CosmosClient;

  constructor() {
    const endpoint = process.env.DATABASE_ENDPOINT!;
    const key = process.env.DATABASE_API_KEY!;
    const databaseId = process.env.DATABASE_NAME!;
    const containerId = process.env.CONTAINER_NAME!;

    this.client = new CosmosClient({ endpoint, key });
    this.database = this.client.database(databaseId);
    this.container = this.database.container(containerId);
  }

  async selectCosmosData() {
    return new Promise(async (resolve, reject) => {
      try {
        const querySpec = {
          query: `SELECT * FROM c`,
        };

        const { resources } = await this.container.items
          .query(querySpec)
          .fetchAll();
        resolve(resources);
      } catch (error: any) {
        console.log(
          '🚀 ~ file: openaiRepository.ts:29 ~ AzOpenaiRepository ~ returnnewPromise ~ error:',
          error
        );
        reject(error);
      }
    });
  }

  async createCosmosData() {
    return new Promise(async (resolve, reject) => {
      console.log(
        '🚀 ~ CosmosRepository ~ returnnewPromise ~ resolve: CosmosDB スタート'
      );
      try {
        const chars =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let createId = '';

        for (let i = 0; i < 15; i++) {
          const randomIndex = Math.floor(Math.random() * chars.length);
          createId += chars.charAt(randomIndex);
        }

        const date = new Date().toLocaleString('sv').replace(/\D/g, '');

        const newItem: ItemType = {
          id: createId,
          title: 'browser test' + date,
          url: 'https://www.xxxxxxxxxxxxx.com',
          result: 'No Problem',
          isError: false,
          dueDate: date,
        };

        const { resource: createdItem } = await this.container.items.create(
          newItem
        );
        console.log(`Created item: ${JSON.stringify(createdItem)}`);

        resolve(createdItem);
      } catch (error: any) {
        console.log(
          '🚀 ~ file: openaiRepository.ts:29 ~ AzOpenaiRepository ~ returnnewPromise ~ error:',
          error
        );
        reject(error);
      }
    });
  }
}
