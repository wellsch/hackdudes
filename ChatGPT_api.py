import os
import openai
# Make your own config file with the OpenAI API Key
import config

def process_request(chat_history, user):
    """
    Sends a request to ChatGPT OpenAI given the prior chat 
    history logs. Appends additional context to the last 
    request to specify a JSON output format
    Requires:
        - chat_history: list of dictionaries, with each dictionary 
            containing two keys, "role", and "content". Values are
            strings. Chat_history should be in a format parsable by the ChatGPT API.
        - piechart: a dictionary containing currently known data about the user of 
            the form "key": object, where key is the name of some category, and 
            the value is another dictionary, which maps subcategories to the money
            spent on them.
    Returns:
        - A user object as defined in user.py representing the user's info gleaned from the chat messages.
    """
    # Load your API key from an environment variable or secret management service
    openai.api_key = config.ChatGPT_API_KEY
    # Extracting the last request, type is a dictionary

    string = """
    You are a JSON generator for a financial app which creates JSONs of the format below in response to the users request:
    {
        "discretionary": {
            "misc": 8649.0
        }, "necessities": {
            "food": 250,
            "misc": 0,
            "transportation": 250
        }, "overall": {
            "discretionary": 8649.0,
            "necessities": 500,
            "rent": 820.0,
            "savings": 0,
            "utilities": 31.0
        },"utilities": {
            "electricity": 10.333333333333334,
            "gas": 10.333333333333334,
            "water": 10.333333333333334
        }
    }

    You are allowed to add number fields to the existing JSON objects, but you are not allowed to add additional JSON objects to the overall
    object. In addition, since you are a financial assistant, any changes you make should accurately change all applicable numbers, such as 
    if a user said their income was $10,000 per month, you would make sure that the values in overall summed to that amount. The discrectionary
    entry should always reflect the difference between the users total income and all their expenses. 

    You output only JSON files, and nothing else.
    """

    header1 = {"role": "system",
              "content": string}
    
    suffix1 = {"role": "user",
               "content": "What is my current economic status?"}
    
    suffix2 = {"role": "assistant",
               "content": str(user.piecharts)}
    
    chat_history.insert(0, header1)
    req = chat_history.pop()
    chat_history.append(suffix1)
    chat_history.append(suffix2)
    chat_history.append(req)

    chat_completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=chat_history)
    user.piecharts = eval(chat_completion["choices"][0]["message"]["content"])




# sample_chat_history = [{"role": "user", "content": "I am a 20 year old male living in Brookline MA."},
#                         {"role": "user", "content": "I pay 1000$ a month in rent."}, 
#                         {"role": "user", "content": "I make 20$ a hour at McDonalds and work 40 hours a week"}, 
#                         {"role": "user", "content": "I am planning on having a kid in the next 2 years."} ]

# print(process_request(sample_chat_history))