### hackdudes
Our submission for the Capitol One challenge.

# Contributors:
Jason Han
Ryan Ramos
Charlie Wells
David Zhu
Rice University 2023

# Name

Perfin - a *Per*sonal *Fin*ance Planner.

# Description

This web-based application can run in your local browser. Based on some input characteristics and information (such as zipcode and monthly income) that the user can add themselves, the application will generate a 'best-guess' as to how you should ideally budget your money.

Afterwards, you can explicitly adjust the target amounts in the budget either through manual tools that we have provided, or give a more general description of your financial goals and spending habits, and have the Assistant adjust your plan for you. The assistant also outputs your budget in a text-friendly format, so you can store your monthly budget in whatever file format that best suits your purposes.

# Installation

1. Clone the entire repo into a directory of your choice. 
2. In the root directory of the project, create a file called "config.py"
3. Go to https://openai.com/blog/openai-api and get an API key -- new users get $5 of credit, good for hundreds of millions of queries.
4. In "config.py", write the following, entering your API key for the variable my_api_key, and save:
    `ChatGPT_API_KEY = "my_api_key"`
5. Go to requirements.txt. There, we have the packages required to run this program, and you should `pip install` them as needed. Many of these packages should come with pip. We suggest that you should install these packages within a virtual environment. For additional information on how to create a virtual environment, visit this site: https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/
6. You should be ready to go!

# Usage

1. Open a terminal, and navigate to the root directory of the program. In the terminal, type the command `python3 app.py`.
2. There should be several lines of dense and confusing output, including a red warning. Ignore those, and search for the line that says " * Running on http://127.0.0.1:5000". 
3. Copy and paste that link into your browser. 
4. Enter the requisite information into the loading page and hit log in. 
5. If, after several seconds, all you see is a box, try hitting the key `l`. If that fails, hit the key `r`.
6. Go ahead and explore the page! Talk to the chatbot, click the diagrams, and change some numbers. Happy budgeting!

Sample AI entries are as below: (You'd be surprised by the capabilities of our program, we highly recommend that you try these!)
1. I'm getting married soon, how should I budget these items?
2. Inflation has been making everything so expensive lately.
3. I recently got a new car on a mortgage, but it's much more fuel-efficient. 

We highly encourage you to play around and experiment with what kinds of prompts generate what kinds of responses! 

# Support
Please contact us at one of the following emails if you have any questions.
dsz1@rice.edu
crw16@rice.edu
rmr9@rice.edu
jh146@rice.edu

# Roadmap / Future Plans

This project is extremely modular and lends itself well to multiple aspects of development. Beyond the obvious improvements in visuals and front-end development, we're excited to improve integration with our Chatbot Assistant. In addition, performance and speed are relatively slow, which is another area of focus.

Currently, to build our initial predictive model, we are only querying from the US Census Bureau. While this provides accurate estimations for items like rent, our initial predictive model becomes much less accurate on items such as household expenditures and discretionary income breakdowns. Querying from multiple trustworthy databases, such as the US Bureau of Labor Statistics, would allow us to build a much more ideal and realistic budgeting model.

Our current program only supports one user at a time (per local host, so this isn't a huge issue). However, addressing this issue of concurrency would be a huge priority before this code could be pushed towards production.