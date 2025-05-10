import { streamText } from "ai";
import { createOllama } from "ollama-ai-provider";

const model = createOllama()("mistral");

const systemPrompt =
    `You will receive an image. ` +
    `Please create an alt text for the image. ` +
    `Be concise. ` +
    `Use adjectives only when necessary. ` +
    `Do not pass 160 characters. ` +
    `Use simple language. `;

export const describeImage = async (imageUrl: string) => {
    const { textStream } = streamText({
        model,
        system: systemPrompt,
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "image",
                        image: new URL(imageUrl),
                    },
                ],
            },
        ],
    });

    for await (const text of textStream) {
        process.stdout.write(text);
    }
    return textStream;
};

const description = await describeImage(
    "https://github.com/ai-hero-dev/ai-hero/blob/main/examples/vercel-ai-sdk/11-describe-images/man-with-computer.jpg"
);
