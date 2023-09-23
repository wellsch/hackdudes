from flask import Flask

# Create a Flask app
app = Flask(__name__)

# Define a route and a view function
@app.route('/')
def hello_world():
    return 'Hello, Flask!'

# Run the app if this script is executed
if __name__ == '__main__':
    app.run(debug=True)