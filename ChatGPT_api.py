import os
import openai
# Make your own config file with the OpenAI API Key
import config

# Load your API key from an environment variable or secret management service
openai.api_key = config.ChatGPT_API_KEY

chat_completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", 
                                               messages=[{"role": "user", "content": "I am a 20 year old male living in Brookline MA."},
                                                         {"role": "user", "content": "I pay 1000$ a month in rent."}, 
                                                         {"role": "user", "content": "I make 20$ a hour at McDonalds and work 40 hours a week"}, 
                                                         {"role": "user", "content": "Give me ONLY a JSON object of my zip code, monthly income, age, and rent."} 
                                                         ])
print(chat_completion)