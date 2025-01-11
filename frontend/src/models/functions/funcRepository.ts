import axios from 'axios';

export class FuncRepository {
  async startAgentTest() {
    return new Promise(async (resolve, reject) => {
      try {
        const url = process.env.AZURE_FUNCTIONS_ENDPOINT!;

        const res = await axios.get(url);
        resolve(res.data);
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
