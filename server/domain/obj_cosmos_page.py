# CosmosDBのページアイテム用のオブジェクト
import uuid


class CosmosPageObj:
    def __init__(self,
                 query: str,
                 result: str,
                 isError: bool,
                 dueDate: str,):
        self.id = str(uuid.uuid4())
        self.query = query
        self.result = result
        self.isError = isError
        self.dueDate = dueDate

    def to_dict(self):
        return {
            "id": self.id,
            "query": self.query,
            "result": self.result,
            "isError": self.isError,
            "dueDate": self.dueDate
        }

    @staticmethod
    def from_dict(dict):
        return CosmosPageObj(dict["id"],
                             dict["query"],
                             dict["result"],
                             dict["isError"],
                             dict["dueDate"])

    def __str__(self):
        return f'id: {self.id}, query: {self.query}, result: {self.result}, isError: {self.isError}, dueDate: {self.dueDate}'
