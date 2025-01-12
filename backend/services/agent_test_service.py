from repositories.cosmos_repository import CosmosRepository


class AgentTestService:
    def __init__(self, repository: CosmosRepository) -> None:
        self.repository = repository

    def do_agent_test_in_services(self) -> list:
        # ビジネスロジックを実行し、データを取得
        users = self.repository.do_agent_test()
        # データの加工
        return [{"id": u["id"], "name": u["name"].upper()} for u in users]
