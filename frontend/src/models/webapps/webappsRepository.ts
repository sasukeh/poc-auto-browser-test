import axios from 'axios';

export class WebAppsRepository {
  async startAgentTest(query: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseUrl = process.env.AZURE_WEBAPPS_ENDPOINT!;

        // クエリをURLに付与
        const requestUrl = `${baseUrl}?query=${encodeURIComponent(query)}`;

        // POSTリクエストを送信（必要に応じて data を入れる）
        const res = await axios.post(requestUrl, {});
        console.log('🚀 ~ WebAppsRepository ~ returnnewPromise ~ res:', res);
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
