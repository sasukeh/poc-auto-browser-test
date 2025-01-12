from asyncio.log import logger
from azure.functions import Blueprint, HttpRequest, HttpResponse  # type: ignore

from langchain_openai import AzureChatOpenAI  # type: ignore
from browser_use import Agent  # type: ignore
from browser_use.browser.browser import Browser, BrowserConfig  # type: ignore
import asyncio

import logging

agent_test_bp = Blueprint()


@agent_test_bp.route(route="agent", methods=["GET"])
def do_agent_sample(req: HttpRequest) -> HttpResponse:
    # ユーザー一覧を返すダミーデータ
    users = [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]
    return HttpResponse(body=str(users), status_code=200, mimetype="application/json")


@agent_test_bp.route(route="agent/test", methods=["GET"])
async def do_agent_test(req: HttpRequest) -> HttpResponse:
    # ユーザー一覧を返すダミーデータ
    users = [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]
    return HttpResponse(body=str(users), status_code=200, mimetype="application/json")
