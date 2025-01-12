import azure.functions as func  # type: ignore
from blueprints.agent_test import agent_test_bp

app = func.FunctionApp()

# Blueprintsの登録
app.register_blueprint(agent_test_bp)
