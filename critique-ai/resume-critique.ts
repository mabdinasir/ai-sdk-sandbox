import { z } from "zod";
import fs from "fs";
import { generateObject } from "ai";
import { createOllama } from "ollama-ai-provider";
import path from "path";

const model = createOllama()("qwen3");

const analysisSchema = z.object({
    candidateInfo: z.object({
        name: z.string(),
        email: z.string().optional(),
        phone: z.string().optional(),
        location: z.string().optional(),
        links: z.array(z.string()).optional(),
    }),
    skills: z.array(z.string()),
    experience: z.array(
        z.object({
            company: z.string(),
            role: z.string(),
            duration: z.string(),
            highlights: z.array(z.string()).optional(),
        })
    ),
    education: z.array(
        z.object({
            institution: z.string(),
            degree: z.string(),
            year: z.string().optional(),
        })
    ),
    candidateAnalysis: z.object({
        strengthsForRole: z.array(z.string()),
        gapsInRole: z.array(z.string()),
        overallFit: z.enum(["Strong", "Moderate", "Weak", "Good", "Unclear"]),
        recommendations: z.array(z.string()),
    }),
    recruiterDecisionAid: z.object({
        shouldShortlist: z
            .boolean()
            .describe("Whether the recruiter should pursue this candidate"),
        rationale: z
            .string()
            .describe(
                "A clear, honest evaluation of the candidate’s alignment with the role"
            ),
        spicyTake: z
            .string()
            .describe(
                "A slightly humorous, opinionated comment to help the recruiter remember or contextualize this candidate"
            ),
    }),
});

const resumeCritiquePrompt = `
You are an expert hiring analyst reviewing a candidate's resume against a job description.

You will generate a **dual-perspective** analysis:
1. A structured evaluation from the candidate's point of view.
2. A helpful and possibly humorous decision guide for the recruiter.

Use only the information from the resume and job description — do not make assumptions. Be specific, insightful, and practical. Humor is allowed for the recruiter section, as long as it's not disrespectful.

--- STRUCTURE ---

Return your analysis using the schema:
- candidateInfo
- skills
- experience
- education
- candidateAnalysis
    - strengthsForRole
    - gapsInRole
    - overallFit (Strong, Moderate, Weak, Good, Unclear)
    - recommendations
- recruiterDecisionAid
    - shouldShortlist (true/false)
    - rationale
    - spicyTake (funny or blunt summary of the situation)

--- GOAL ---
Help both the candidate and the recruiter make better decisions — no fluff, just real insight.
`;

const critiqueResume = async () => {
    try {
        const dataPath = path.join(__dirname, "pdf_texts.json");

        const { resume, job_description } = JSON.parse(
            fs.readFileSync(dataPath, "utf-8")
        );

        const { object } = await generateObject({
            model,
            system: resumeCritiquePrompt,
            schema: analysisSchema,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Job Description:\n${job_description}`,
                        },
                        { type: "text", text: `Resume:\n${resume}` },
                    ],
                },
            ],
        });

        return object;
    } catch (error) {
        console.error("Error in critiqueResume:", error);
        throw error;
    }
};

(async () => {
    const result = await critiqueResume();
    // Full JSON
    console.dir(result, { depth: null });

    // console.log("\n=== RESUME ANALYSIS RESULTS ===\n");
    // console.log("Candidate:", result.candidateInfo.name);
    // console.log("\nOverall Fit:", result.candidateAnalysis.overallFit);
    // console.log("\nStrengths:");
    // result.candidateAnalysis.strengthsForRole.forEach((s) =>
    //     console.log(`- ${s}`)
    // );
    // console.log("\nGaps:");
    // result.candidateAnalysis.gapsInRole.forEach((g) => console.log(`- ${g}`));
    // console.log("\nRecommendations:");
    // result.candidateAnalysis.recommendations.forEach((r) =>
    //     console.log(`- ${r}`)
    // );
})();
