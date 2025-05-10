import { streamObject } from "ai";
import { z } from "zod";
import { createOllama } from "ollama-ai-provider";

const model = createOllama()("mistral");

const schema = z.object({
    match: z.object({
        teams: z
            .tuple([z.string(), z.string()])
            .describe("Names of the two teams"),
        score: z
            .tuple([z.number(), z.number()])
            .describe("Final score of the match"),
        date: z.string().describe("Date of the match in DD-MM-YYYY format"),
        location: z
            .string()
            .describe("Stadium or city where the match was held"),
        summary: z.string().describe("A summary of the match"),
        keyPlayers: z
            .array(
                z.object({
                    name: z.string(),
                    team: z.string(),
                    performance: z.string(),
                })
            )
            .describe("Key players and their performance"),
    }),
});

export const createMatchSummary = async (prompt: string) => {
    const result = streamObject({
        model,
        schema,
        prompt,
        schemaName: "FootballMatch",
        system: `You are a sports journalist summarising football matches.`,
    });

    for await (const obj of result.partialObjectStream) {
        console.clear();
        console.dir(obj, { depth: null });
    }

    const finalObject = await result.object;

    return finalObject.match;
};

const new_summary = await createMatchSummary(
    "Write a match summary for Barcelona vs Real Madrid on April 10, 2025."
);
