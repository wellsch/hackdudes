from flask import Flask, request, render_template, jsonify
from flask_socketio import SocketIO
import user

# Create a Flask app
app = Flask(__name__)
socketio = SocketIO(app)


# Define a route and a view function
@app.route('/')
def hello_world():
    return 'Hello, Flask!'

# Sending push data notifications to front end indicating that server data has changed
# and the front-end displays need to be updated with this new information.
@socketio.on('connect')
def handle_connect():
    print("fe connected")
    socketio.emit('response', {'data': 'connected'})


# Run the app if this script is executed
if __name__ == '__main__':
    socketio.run(app, debug=True)

@app.route('/api/inituser', methods=['POST'])
def init_user():
    '''
    Creates a User object to store requisite fields and data.
    So far, only requires monthly income and something else. 
    '''
    userzip = request.get_json()["zip"]
    userinc = request.get_json()["income"]
    userobj = user.User(userzip, float(userinc))

    pair = userobj.median_rent_utilities()

    overall = {"rent": pair[0],
                "savings": 0,
                "utilities": pair[1], 
                "necessities" : 500,
                "discretionary": float(userinc) - pair[0] - pair[1] - 500}
    utilities = {"electricity": float(pair[1])/3,
                 "water": float(pair[1])/3,
                 "gas": float(pair[1])/3}
    necessities = {"food": 500, 
                   "transportation": 500, 
                   "misc": 0 }
    discretionary = {"misc": overall["discretionary"]}

    userobj.piecharts = {"overall":overall,
                         "utilities":utilities,
                         "necessities":necessities,
                         "discretionary":discretionary}

    return jsonify(userobj.piecharts)

@app.route('/api/userrequest', methods=['POST'])
def fwd_req():
    # We recieve the request as a JSON dictionary.
    # It maps "request" to the full list of user requests.
    # Which are each
    chat_hist = request.get_json()["request"]

    recent_req = chat_hist[-1]["content"]
    print(recent_req)
    return "sup"


