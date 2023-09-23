import os
import openai

ChatGPT_API_KEY = "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"

# Load your API key from an environment variable or secret management service
openai.api_key = os.getenv(ChatGPT_API_KEY)

chat_completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": "Hello world"}])