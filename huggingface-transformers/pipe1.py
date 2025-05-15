from transformers import pipeline

# Load sentiment analysis pipeline
# This will download the model and tokenizer if not already cached
from transformers import pipeline

classifier = pipeline("sentiment-analysis")

# Classify the sentiment of a text
# The text can be a string or a list of strings
# The result is a list of dictionaries with the label and score
result = classifier("NBA basketball is a great sport. I love it!")
print(result)
