import { generateObject } from "ai";
import { createOllama } from "ollama-ai-provider";

const model = createOllama()("mistral");

export const classifyPlayer = async (text: string) => {
    const { object } = await generateObject({
        model,
        output: "enum",
        enum: ["good baller", "bad baller", "mid"],
        prompt: text,
        system:
            `You are a football analyst. Based on the text, ` +
            `classify the player as either "good baller", "bad baller", or "mid". ` +
            `Be concise and fair in your judgment.`,
    });

    return object;
};

const result = await classifyPlayer(
    `He is a talented player with great vision and passing ability. ` +
        `but he lacks pace and is often caught out of position. ` +
        `He has a good work ethic and is a team player, but his decision-making in the final third is questionable. ` +
        `Overall, he has the potential to be a good player, but he needs to improve his consistency and tactical awareness. `
);

console.log(result); // mid
