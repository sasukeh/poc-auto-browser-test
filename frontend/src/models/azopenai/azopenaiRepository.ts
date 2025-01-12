import { AzureKeyCredential, OpenAIClient } from '@azure/openai';

export class AzOpenaiRepository {
  async getAzOpenAIData(message: string) {
    console.log('start', process.env.AZURE_OPENAI_ENDPOINT!);
    return new Promise(async (resolve, reject) => {
      const endpoint = process.env.AZURE_OPENAI_ENDPOINT!;
      const azureApiKey = process.env.AZURE_OPENAI_API_KEY!;
      const deploymentId = process.env.AZURE_OPENAI_DEPLOYMENT_ID!;

      const content = `
        - userの依頼
        ${message}
        
        - 返答して欲しい文言
        Test Agentを実行しますので、少々お待ちください。会話終了後、Test Resultの箇所に結果が表示されます。

        - 指示
        他の文言は出力しなくて良いです。
      `;
      try {
        const messages = [
          { role: 'system', content: 'You are a helpful assistant.' },
          {
            role: 'user',
            content,
          },
        ];
        const client = new OpenAIClient(
          endpoint,
          new AzureKeyCredential(azureApiKey)
        );

        const result = await client.getChatCompletions(deploymentId, messages);
        resolve(result.choices[0].message?.content);
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
