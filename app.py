from flask import Flask, request
import user

# Create a Flask app
app = Flask(__name__)

# Define a route and a view function
@app.route('/')
def hello_world():
    return 'Hello, Flask!'

# Run the app if this script is executed
if __name__ == '__main__':
    app.run(debug=True)

@app.route('/api/initialconfig', methods=['POST'])
def get_init_config():
    
    return 

@app.route('/api/userrequest', methods=['POST'])
def fwd_req():
    req = request.form['request']
    
    return 