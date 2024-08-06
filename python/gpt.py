import sys
from gpt4all import GPT4All

question = sys.argv[1]

# question = "What is the capital of France?"

model = GPT4All("orca-mini-3b-gguf2-q4_0.gguf")
# output = model.generate(f"{question}", max_tokens=200)
# print(output, end="", flush=True)
with model.chat_session():
    print(model.generate(f"{question}", max_tokens=1024), flush=True)