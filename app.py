from flask import Flask, request, render_template, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
import user
import ChatGPT_api
import json

# Create a Flask app
app = Flask(__name__)
socketio = SocketIO(app)
users = []

# Enables all origins, which basically disallows CORS
CORS(app, resources={r"/socket.io/*": {"origins": "http://127.0.0.1:5000"}})


# Define a route and a view function
@app.route('/')
def show_base():
    return render_template('base.html')


# Sending push data notifications to front 
# end indicating that server data has changed
# and the front-end displays need to be 
# updated with this new information.
@socketio.on('connect')
def handle_connect():
    print("fe connected")
    socketio.emit('response', {'data': 'connected'})

# If for some reason the front end is trying 
# to send us a message through socket instead of 
# through the flask app, we can receive it here.
@socketio.on('message')
def handle_message(data):
    message = data['message']
    print('Received message:', message)
    socketio.emit('message', {'message': 'You said: ' + message})

@app.route('/api/inituser', methods=['POST'])
def init_user():
    """
    Creates a User object to store requisite fields and data.
    So far, only requires monthly income and zipcode.
    """
    userzip = request.get_json()["zip"]
    userinc = request.get_json()["income"]
    userobj = user.User(float(userinc), userzip)

    pair = userobj.median_rent_utilities()

    overall = {"rent": pair[0],
               "savings": 0,
               "utilities": pair[1],
               "necessities": 500,
               "discretionary": float(userinc) - pair[0] - pair[1] - 500}
    utilities = {"electricity": float(pair[1]) / 3,
                 "water": float(pair[1]) / 3,
                 "gas": float(pair[1]) / 3}
    necessities = {"food": 250,
                   "transportation": 250,
                   "misc": 0}
    discretionary = {"misc": overall["discretionary"]}

    userobj.piecharts = {"overall": overall,
                         "utilities": utilities,
                         "necessities": necessities,
                         "discretionary": discretionary}
    
    users.append(userobj)

    return jsonify(userobj.piecharts)


@app.route('/api/userrequest', methods=['POST'])
def fwd_req():
    """
    We receive the request as a JSON dictionary.
    It maps "request" to the full list of user requests. 
    In this case, the full list of user requests should
    just be 1 chat history.
    """
    chat_hist = request.get_json()["request"]
    
    ChatGPT_api.process_request(chat_hist, users[0])

    retval = {"jsonresp": users[0].piecharts, "changelog": "dummy"}
    
    return jsonify(retval)

# Run the app if this script is executed
if __name__ == '__main__':
    socketio.run(app, debug=True)