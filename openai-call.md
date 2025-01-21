# Instruction to Call Azure Open AI

```python
import requests

headers = {
    'Content-Type': 'application/json',
    'api-key': 'YOUR_API_KEY',
}

params = {
    'api-version': '2024-08-01-preview',
}

json_data = {
    'messages': [
        {
            'role': 'system',
            'content': 'You are an ai wizard that helps people create product descriptions.',
        },
        {
            'role': 'user',
            'content': 'nike',
        }
    ],
    'max_tokens': 800,
    'temperature': 0.7,
    'frequency_penalty': 0,
    'presence_penalty': 0,
    'top_p': 0.95,
    'stop': None,
}

response = requests.post(
    'https://clever-dev-openai.openai.azure.com/openai/deployments/chat4o/chat/completions',
    params=params,
    headers=headers,
    json=json_data,
)
```
