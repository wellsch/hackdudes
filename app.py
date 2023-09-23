from flask import Flask, request
import user
from gradio_chatbot import run_gradio
from multiprocessing import Process

# Create a Flask app
app = Flask(__name__)


# Define a route and a view function
@app.route('/')
def hello_world():
    return 'Hello, Flask!'


@app.route('/api/initialconfig', methods=['POST'])
def get_init_config():
    return "some initial config"


@app.route('/api/userrequest', methods=['POST'])
def fwd_req():
    # We recieve the request as a JSON dictionary.
    # It maps "request" to the full list of user requests.
    # Which are each
    # chat_hist = request.get_json()["request"]
    # recent_req = chat_hist[-1]["content"]
    # print(recent_req)
    return {"result": "bye"}


# Run the app if this script is executed
if __name__ == '__main__':
    Process(target=run_gradio).start()
    app.run(debug=True)