import { generateText } from "ai";
import { createOllama } from "ollama-ai-provider";
// import { anthropic } from "@ai-sdk/anthropic";

const ollama = createOllama();
const model = ollama("mistral");
// const model = anthropic("claude-3-5-sonnet-latest");

export const generate_text = async (prompt: string) => {
    const { text } = await generateText({
        model,
        prompt,
    });

    return text;
};

const answer = await generate_text(
    "Who was Genghis Khan? What were his main achievements?"
);

console.log(answer);

// Output:
// Genghis Khan, born as Temüjin in 1162, was the founder and first Great Khan of the Mongol Empire, which became the largest contiguous empire in history after his death. He united the Mongolian tribes and led them to conquer vast territories across Asia and Europe. His main achievements include:
// 1. Unification of the Mongolian tribes: Genghis Khan united the fragmented Mongolian tribes under his leadership, creating a powerful and cohesive force.
// 2. Military innovations: He developed new military strategies and tactics, including the use of cavalry and psychological warfare, which allowed his armies to defeat larger and more established foes.
// 3. Expansion of the Mongol Empire: Under his leadership, the Mongol Empire expanded rapidly, conquering large parts of Central Asia, China, and Eastern Europe.
// 4. Establishment of the Silk Road: Genghis Khan's conquests helped to secure and expand the Silk Road trade routes, facilitating cultural and economic exchange between East and West.
// 5. Legal and administrative reforms: He implemented a code of laws known as the Yassa, which helped to govern the diverse peoples within his empire and promote trade and communication.
// 6. Cultural exchange: Genghis Khan's empire fostered cultural exchange and interaction among different civilizations, leading to advancements in science, technology, and the arts.
// 7. Legacy: Genghis Khan's legacy continues to influence modern Mongolia and the world, with his descendants playing significant roles in history.
// His life and conquests have been the subject of numerous books, films, and documentaries, highlighting his impact on world history.
// Genghis Khan died in 1227, but his empire continued to expand under his successors, becoming a major force in world history.
// His legacy is complex, as he is both revered as a national hero in Mongolia and viewed as a brutal conqueror by many others.
// Genghis Khan's life and achievements are a testament to his extraordinary leadership and military prowess, which reshaped the course of history in Asia and beyond.
// Note: The output may vary based on the model and its training data. The above response is a general summary of Genghis Khan's life and achievements.
