import { generateObject } from "ai";
import { createOllama } from "ollama-ai-provider";
import { z } from "zod";

const model = createOllama()("mistral");

const schema = z.object({
    players: z
        .array(
            z.object({
                name: z.string().describe("The name of the football player"),
                position: z
                    .string()
                    .describe("The playing position of the footballer"),
                club: z
                    .string()
                    .describe("The current club the player represents"),
            })
        )
        .describe("A list of notable football players"),
});

export const generateFootballPlayers = async (prompt: string) => {
    const { object } = await generateObject({
        model,
        schema,
        prompt,
        schemaName: "FootballPlayers",
        system: `You are listing football players with their current club and playing position.`,
    });

    return object.players;
};

const players = await generateFootballPlayers(
    "List 5 famous football players with their positions and current clubs."
);

console.dir(players, { depth: null });
