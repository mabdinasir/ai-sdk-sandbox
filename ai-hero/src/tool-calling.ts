import { tool } from "ai";
import { z } from "zod";
import { generateText } from "ai";
import { createOllama } from "ollama-ai-provider";

const model = createOllama()("mistral");

// Tool to fetch posts from JSONPlaceholder API
const getPostsTool = tool({
    description: "Fetch sample blog posts from JSONPlaceholder API",
    parameters: z.object({
        limit: z
            .number()
            .min(1)
            .max(10)
            .describe("Number of posts to fetch (max 10)"),
    }),
    execute: async ({ limit }) => {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
        );
        if (!res.ok)
            throw new Error(`Failed to fetch posts: ${res.statusText}`);
        const posts = await res.json();
        return posts;
    },
});

const fetchSamplePosts = async (prompt: string) => {
    const { steps } = await generateText({
        model,
        prompt,
        system:
            `You are an assistant who helps users retrieve sample blog posts. ` +
            `Use the provided tool to fetch the requested number of posts.`,
        tools: {
            getPosts: getPostsTool,
        },
    });

    console.dir(steps[0]?.response.body, { depth: null });
};

// Example usage
await fetchSamplePosts("Get 3 sample blog posts.");
