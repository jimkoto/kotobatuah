import { GoogleGenAI } from "@google/genai";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import { getArticlesFromSheetServer } from "./server/googleSheetsService";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" }));

// Server-side Gemini initialization with required User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API: Code Optimizer & Architecture Refactorer
app.post("/api/gemini/optimize-code", async (req, res) => {
  try {
    const { code, language, optimizationGoal } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Code content is required" });
    }

    const prompt = `You are a Principal Software Architect and Senior Performance Engineer for Jim Koto's Tech Lab.
Analyze and optimize the following ${language || "TypeScript/JavaScript"} code.
Target optimization goal: ${optimizationGoal || "Maximum runtime performance, type safety, memory efficiency, and readability"}.

Code to optimize:
\`\`\`${language || "typescript"}
${code}
\`\`\`

Return a structured JSON object with the following schema:
{
  "optimizedCode": "string (the complete refactored, high-performance code with explanatory comments)",
  "summary": "string (concise 2-3 sentence overview of improvements)",
  "improvements": [
    {
      "type": "Performance | Memory | Clean Code | Type Safety | Security",
      "title": "short title",
      "description": "clear explanation of what was improved and why"
    }
  ],
  "complexityBefore": "string (e.g., O(n^2))",
  "complexityAfter": "string (e.g., O(n))",
  "estimatedSpeedup": "string (e.g., ~45% reduction in execution time / zero unnecessary re-renders)",
  "keyTakeaway": "string (senior engineering architectural tip)"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const resultText = response.text || "{}";
    const parsed = JSON.parse(resultText);
    return res.json(parsed);
  } catch (error: any) {
    console.error("Code optimization error:", error);
    return res.status(500).json({
      error: error.message || "Failed to optimize code with Gemini API",
    });
  }
});

// API: Tech Advisor & System Architecture Chat
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, context } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemInstruction = `You are the Lead Tech Advisor for "Jim Koto DevStudio & Tech Intelligence Hub", founded by Jim Koto (James Isa).
Jim Koto's platform focuses on:
1. High-quality programming tutorials (React 19, Next.js, Node.js, TypeScript, Cloud, DevOps, AI integration).
2. Digital Ecosystem Optimization (Core Web Vitals, SEO architecture, Sub-second performance, CDN caching, Micro-SaaS development).
3. Practical Software Architecture & Clean Code principles.

Provide practical, highly accurate, and production-ready advice with actionable code snippets where helpful.
Format your responses with clean Markdown headers, bullet points, and syntax-highlighted code blocks.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Context: ${context || "Tech blog & application ecosystem optimization for jimkoto.my.id"}\n\nUser Question:\n${message}`,
      config: {
        systemInstruction,
      },
    });

    return res.json({ text: response.text });
  } catch (error: any) {
    console.error("Chat advisor error:", error);
    return res.status(500).json({
      error: error.message || "Failed to generate response from Gemini API",
    });
  }
});

// API: Generate Custom App Blueprint & Architecture Spec
app.post("/api/gemini/generate-app-spec", async (req, res) => {
  try {
    const { appIdea, targetStack, targetAudience } = req.body;
    if (!appIdea) {
      return res.status(400).json({ error: "App idea description is required" });
    }

    const prompt = `Create a comprehensive, production-ready software architecture and implementation blueprint for an application in Jim Koto's digital ecosystem.
App Idea: ${appIdea}
Preferred Tech Stack: ${targetStack || "Modern Fullstack (React 19 / Vite / Node.js / TypeScript / Tailwind CSS / Gemini AI)"}
Target Audience: ${targetAudience || "Developers, tech enthusiasts, and digital business owners"}

Return a structured JSON with this schema:
{
  "appName": "string",
  "tagline": "string",
  "executiveSummary": "string",
  "targetArchitecture": {
    "frontend": "string",
    "backend": "string",
    "database": "string",
    "cachingAndCdn": "string",
    "aiIntegration": "string"
  },
  "coreFeatures": [
    { "name": "string", "description": "string", "priority": "High | Medium | Nice-to-have" }
  ],
  "optimizationStrategies": [
    { "category": "SEO | Performance | Security | Scalability", "tactic": "string", "impact": "string" }
  ],
  "databaseSchemaSample": "string (TypeScript interface or SQL DDL)",
  "starterComponentCode": "string (Production-ready React/TypeScript snippet)",
  "monetizationOrGrowthStrategy": "string"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("App spec generation error:", error);
    return res.status(500).json({
      error: error.message || "Failed to generate app blueprint",
    });
  }
});

// API: Fetch articles via isolated Server-side Google Sheets Service (Zero Client ID Exposure)
app.get("/api/cms/articles", async (_req, res) => {
  try {
    const result = await getArticlesFromSheetServer();
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || "Failed to fetch articles from server CMS service",
    });
  }
});

// Serve frontend static assets in production
const distPath = path.resolve(process.cwd(), "dist");

// Explicit route for Bio standalone landing page
app.get(["/bio", "/bio/", "/bio/index.html"], (_req, res) => {
  const bioPath = path.join(distPath, "bio", "index.html");
  res.sendFile(bioPath);
});

app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Jim Koto DevStudio server running on http://0.0.0.0:${PORT}`);
});
