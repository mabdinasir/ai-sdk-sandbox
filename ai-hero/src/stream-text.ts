import { streamText } from "ai";
import { createOllama } from "ollama-ai-provider";
// import { anthropic } from "@ai-sdk/anthropic";

const ollama = createOllama();
const model = ollama("mistral");
// const model = anthropic("claude-3-5-sonnet-latest");

export const stream_text = async (prompt: string) => {
    const { textStream } = streamText({
        model,
        prompt,
    });

    for await (const text of textStream) {
        process.stdout.write(text);
    }
    return textStream;
};

const answer = await stream_text(
    "Why do the ocean and the atmosphere have different temperatures? "
);
console.log(answer);

// Output:
// The ocean and the atmosphere have different temperatures due to several factors, including their physical properties, heat capacity, and the way they interact with solar radiation. Here are some key reasons:
// 1. **Heat Capacity**: Water has a higher heat capacity than air, meaning it can absorb and store more heat without a significant change in temperature. This allows the ocean to moderate temperature changes more effectively than the atmosphere.
// 2. **Density**: The density of water is much higher than that of air, which affects how heat is distributed. In the ocean, heat is distributed throughout the water column, while in the atmosphere, heat is concentrated near the surface.
// 3. **Solar Radiation Absorption**: The ocean absorbs solar radiation more efficiently than the atmosphere. Water can penetrate deeper than air, allowing it to store heat at greater depths.
// 4. **Evaporation**: The ocean loses heat through evaporation, which cools the surface water. This process is less significant in the atmosphere, where evaporation occurs but is not as effective at cooling the air.
// 5. **Ocean Currents**: Ocean currents redistribute heat across the globe, affecting regional temperatures. These currents can transport warm water from the equator to colder regions, influencing local climates.
