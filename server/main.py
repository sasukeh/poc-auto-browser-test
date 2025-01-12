# FastAPIをインポート
from fastapi import FastAPI

# FastAPIのインスタンス作成
app = FastAPI()

# GETメソッドでルートURLにアクセスされたときの処理


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/agent")
async def root():
    return {
        "users": [
            {"id": 1, "name": "Alice"},
            {"id": 2, "name": "Bob"}
        ]
    }
