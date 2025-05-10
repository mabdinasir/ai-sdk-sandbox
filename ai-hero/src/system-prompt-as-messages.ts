import { generateText } from "ai";
import { createOllama } from "ollama-ai-provider";

const ollama = createOllama();
const model = ollama("mistral");

export const summarizeText = async (input: string) => {
    const { text } = await generateText({
        model,
        messages: [
            {
                role: "system",
                content:
                    `You are a text summarizer. ` +
                    `Summarize the text you receive. ` +
                    `Be concise. ` +
                    `Return only the summary. ` +
                    `Do not use the phrase "here is a summary". ` +
                    `Highlight relevant phrases in bold. ` +
                    `The summary should be two sentences long. `,
            },
            {
                role: "user",
                content: input,
            },
        ],
    });

    return text;
};
