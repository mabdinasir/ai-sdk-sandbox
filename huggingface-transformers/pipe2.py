from transformers import pipeline

generator = pipeline("text-generation", model="gpt2", framework="pt")

result = generator(
    "River dolphins are a group of dolphins that live in freshwater rivers and lakes.",
    max_length=100,
    num_return_sequences=2
)

print(result[0]["generated_text"])
