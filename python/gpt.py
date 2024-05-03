import sys
from gpt4all import GPT4All

question = sys.argv[1]

# model = GPT4All("orca-mini-3b-gguf2-q4_0.gguf")
model = GPT4All("gpt4all-falcon-newbpe-q4_0.gguf") #fastest model
output = model.generate(f"{question}", max_tokens=200)
print(output, end="", flush=True)