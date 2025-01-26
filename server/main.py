import os
import json
from dotenv import load_dotenv

from fastapi import FastAPI
from azure.monitor.opentelemetry import configure_azure_monitor
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from asyncio.log import logger

from service.cosmos_service import CosmosService
from domain.obj_cosmos_page import CosmosPageObj

from langchain_openai import AzureChatOpenAI
from browser_use import Agent
from browser_use.browser.browser import Browser, BrowserConfig

from service.openai_service import AzureOpenAIService
from openai import AzureOpenAI
from domain.document_structure import DocumentStructure

from datetime import datetime

# .env ファイルの読み込み
load_dotenv()
AZURE_OPENAI_ENDPOINT = os.getenv('AZURE_OPENAI_ENDPOINT')
AZURE_OPENAI_API_KEY = os.getenv('AZURE_OPENAI_API_KEY')
AZURE_OPENAI_DEPLOYMENT_ID = os.getenv('AZURE_OPENAI_DEPLOYMENT_ID')

# FastAPIのインスタンス作成
app = FastAPI()

# system message
STR_AI_SYSTEMMESSAGE = """
##制約条件
- 画像内の情報を、Markdown形式に整理しなさい。
- 回答形式 以外の内容は記載しないでください。
- 回答の最初に「```json」を含めないこと。
- 検索の過程でどのような処理をしたか含めること

##回答形式##
処理の内容を３行に要約
"""


@app.get("/")
async def root():
    return {"message": "Hello World7"}


@app.post("/agent")
async def root(query: str):
    logger.info(f"query: {query}")
    # 現在の日時を取得
    now = datetime.now()
    # 文字列に変換
    current_time_str = now.strftime("%Y-%m-%d-%H-%M-%S")
    try:
        # Agentの処理を実行
        result = await do_agent_func(query)

        converted_agent_data = json.loads(
            json.dumps(result, default=str))

        # AOAIにerrorが存在するかどうか判定させる処理
        aoai_client = AzureOpenAI(
            azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
            api_key=os.getenv("AZURE_OPENAI_API_KEY"),
            api_version="2024-08-01-preview"
        )
        azure_openai_service = AzureOpenAIService(client=aoai_client)

        messages = []
        messages.append(
            {"role": "system", "content": STR_AI_SYSTEMMESSAGE})
        messages.append(
            {"role": "user", "content": converted_agent_data})

        response = azure_openai_service.getChatCompletionJsonStructuredMode(
            messages, 0, 0, DocumentStructure)

        doc_structured = response.choices[0].message.parsed

        converted_data = json.loads(json.dumps(doc_structured, default=str))

        # CosmosDBに登録するアイテムのオブジェクト
        cosmos_service = CosmosService()
        cosmos_page_obj = CosmosPageObj(
            query=query,
            result=converted_data,
            isError=False,
            dueDate=current_time_str,
        )

        cosmos_service.insert_data(cosmos_page_obj.to_dict())
        return {
            "result": [
                {"data": converted_data},
            ]
        }

    except Exception as e:
        # ログ出力 (exc_info=True でスタックトレースも出力)
        logger.error(f"An error occurred: {e}", exc_info=True)
        # CosmosDBに登録するアイテムのオブジェクト
        cosmos_service = CosmosService()
        cosmos_page_obj = CosmosPageObj(
            query=query,
            result=str(e),
            isError=True,
            dueDate=current_time_str,
        )

        cosmos_service.insert_data(cosmos_page_obj.to_dict())
        return {
            "result": [
                {"data": e},
            ]
        }


async def do_agent_func(query: str):
    browser = Browser(
        config=BrowserConfig(
            headless=True,
        )
    )

    agent = Agent(
        task=query,
        llm=AzureChatOpenAI(
            openai_api_version="2024-10-21",
            azure_endpoint=AZURE_OPENAI_ENDPOINT,
            azure_deployment=AZURE_OPENAI_DEPLOYMENT_ID,
            model=AZURE_OPENAI_DEPLOYMENT_ID,
            validate_base_url=False,
            api_key=AZURE_OPENAI_API_KEY,
        ),
        browser=browser,
    )

    try:
        result = await agent.run(max_steps=5)
        # result = await agent.run()
        return result
    except Exception as e:
        print(f"Error: {e}")
        result = str(e)
        return result
