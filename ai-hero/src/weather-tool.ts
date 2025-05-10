import { streamText, tool } from "ai";
import { createOllama } from "ollama-ai-provider";
import { z } from "zod";

const model = createOllama()("mistral");

const getWeatherTool = tool({
    description: "Get the current weather in the specified city",
    parameters: z.object({
        city: z.string().describe("The city to get the weather for"),
    }),
    execute: async ({ city }) => {
        return `The weather in ${city} is 25°C and sunny.`;
    },
});

const askAQuestion = async (prompt: string) => {
    const { textStream, steps } = await streamText({
        model,
        prompt,
        tools: {
            getWeather: getWeatherTool,
        },
        maxSteps: 2,
    });

    for await (const text of textStream) {
        process.stdout.write(text);
    }
    // console.dir(await steps, { depth: null });
};

await askAQuestion(`What's the weather in Melbourne?`);
