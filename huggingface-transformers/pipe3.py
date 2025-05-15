from transformers import pipeline

classifier = pipeline("zero-shot-classification")


result = classifier(
    "NBA basketball is a great sport. I love it!",
    candidate_labels=["sports", "politics", "business"],
    multi_label=True
)
print(result)