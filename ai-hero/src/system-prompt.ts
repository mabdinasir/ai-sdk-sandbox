import { streamText } from "ai";
import { createOllama } from "ollama-ai-provider";
// import { anthropic } from "@ai-sdk/anthropic";

const ollama = createOllama();
const model = ollama("mistral");
// const model = anthropic("claude-3-5-sonnet-latest");

const summarizeText = async (input: string) => {
    const { textStream } = streamText({
        model,
        prompt: input,
        system:
            `You are a text summarizer. ` +
            `Summarize the text you receive. ` +
            `Be concise. ` +
            `Return only the summary. ` +
            `Do not use the phrase "here is a summary". ` +
            `Highlight relevant phrases in bold. ` +
            `The summary should be two sentences long. `,
    });
    for await (const t of textStream) {
        process.stdout.write(t);
    }

    return textStream;
};

const answer = await summarizeText(
    "The first ever image of a black hole was captured by the Event Horizon Telescope (EHT) in 2019. This groundbreaking achievement provided direct visual evidence of the existence of black holes, which had previously been inferred through indirect observations. The image showed a bright ring of light surrounding a dark center, representing the event horizon of the black hole at the center of the galaxy M87. This discovery has opened up new avenues for research in astrophysics and our understanding of the universe."
);
console.log(answer);

// Output:
// The first ever image of a black hole was captured by the Event Horizon Telescope (EHT) in 2019. This groundbreaking achievement provided direct visual evidence of the existence of black holes, which had previously been inferred through indirect observations. The image showed a bright ring of light surrounding a dark center, representing the event horizon of the black hole at the center of the galaxy M87. This discovery has opened up new avenues for research in astrophysics and our understanding of the universe.
