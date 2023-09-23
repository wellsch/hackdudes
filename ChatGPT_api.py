import os
import openai
# Make your own config file with the OpenAI API Key
import config

def process_request(chat_history):
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
    # Extracting the last request, type is a dictionary
    latest_request = chat_history[len(chat_history) - 1]
    
    if (latest_request['role'] != 'user'):
        raise Exception("Last chat log must be from the user")

    latest_request['content'] = latest_request['content'] + "Give me ONLY a JSON object of my zip code, monthly income, age, monthly savings, and rent."

    chat_completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=chat_history)
    return chat_completion

# Load your API key from an environment variable or secret management service
openai.api_key = config.ChatGPT_API_KEY

sample_chat_history = [{"role": "user", "content": "I am a 20 year old male living in Brookline MA."},
                        {"role": "user", "content": "I pay 1000$ a month in rent."}, 
                        {"role": "user", "content": "I make 20$ a hour at McDonalds and work 40 hours a week"}, 
                        {"role": "user", "content": "I am planning on having a kid in the next 2 years."} ]

print(process_request(sample_chat_history))