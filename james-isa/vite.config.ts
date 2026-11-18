import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { getArticlesFromSheetServer } from './server/googleSheetsService';

dotenv.config();

function devApiPlugin(): Plugin {
  return {
    name: 'dev-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const cleanUrl = (req.url || '').split('?')[0];
        if (cleanUrl === '/bio' || cleanUrl === '/bio/' || cleanUrl === '/bio/index.html') {
          const bioPath = path.resolve(__dirname, 'public/bio/index.html');
          if (fs.existsSync(bioPath)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.end(fs.readFileSync(bioPath, 'utf-8'));
          }
        }

        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        // Helper to read JSON body
        const readBody = async (): Promise<any> => {
          return new Promise((resolve, reject) => {
            let data = '';
            req.on('data', (chunk) => (data += chunk));
            req.on('end', () => {
              try {
                resolve(data ? JSON.parse(data) : {});
              } catch (e) {
                reject(e);
              }
            });
            req.on('error', reject);
          });
        };

        const sendJson = (status: number, obj: any) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(obj));
        };

        try {
          if (req.url === '/api/gemini/optimize-code' && req.method === 'POST') {
            const { code, language, optimizationGoal } = await readBody();
            if (!code) {
              return sendJson(400, { error: 'Code content is required' });
            }

            const prompt = `You are a Principal Software Architect and Senior Performance Engineer for Jim Koto's Tech Lab.
Analyze and optimize the following ${language || 'TypeScript/JavaScript'} code.
Target optimization goal: ${optimizationGoal || 'Maximum runtime performance, type safety, memory efficiency, and readability'}.

Code to optimize:
\`\`\`${language || 'typescript'}
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
              model: 'gemini-3.7-flash',
              contents: prompt,
              config: {
                responseMimeType: 'application/json',
              },
            });

            const parsed = JSON.parse(response.text || '{}');
            return sendJson(200, parsed);
          }

          if (req.url === '/api/gemini/chat' && req.method === 'POST') {
            const { message, context } = await readBody();
            if (!message) {
              return sendJson(400, { error: 'Message is required' });
            }

            const systemInstruction = `You are the Lead Tech Advisor for "Jim Koto DevStudio & Tech Intelligence Hub", founded by Jim Koto (James Isa).
Jim Koto's platform focuses on:
1. High-quality programming tutorials (React 19, Next.js, Node.js, TypeScript, Cloud, DevOps, AI integration).
2. Digital Ecosystem Optimization (Core Web Vitals, SEO architecture, Sub-second performance, CDN caching, Micro-SaaS development).
3. Practical Software Architecture & Clean Code principles.

Provide practical, highly accurate, and production-ready advice with actionable code snippets where helpful.
Format your responses with clean Markdown headers, bullet points, and syntax-highlighted code blocks.`;

            const response = await ai.models.generateContent({
              model: 'gemini-3.7-flash',
              contents: `Context: ${context || 'Tech blog & application ecosystem optimization for jimkoto.my.id'}\n\nUser Question:\n${message}`,
              config: {
                systemInstruction,
              },
            });

            return sendJson(200, { text: response.text });
          }

          if (req.url === '/api/gemini/generate-app-spec' && req.method === 'POST') {
            const { appIdea, targetStack, targetAudience } = await readBody();
            if (!appIdea) {
              return sendJson(400, { error: 'App idea description is required' });
            }

            const prompt = `Create a comprehensive, production-ready software architecture and implementation blueprint for an application in Jim Koto's digital ecosystem.
App Idea: ${appIdea}
Preferred Tech Stack: ${targetStack || 'Modern Fullstack (React 19 / Vite / Node.js / TypeScript / Tailwind CSS / Gemini AI)'}
Target Audience: ${targetAudience || 'Developers, tech enthusiasts, and digital business owners'}

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
              model: 'gemini-3.7-flash',
              contents: prompt,
              config: {
                responseMimeType: 'application/json',
              },
            });

            const parsed = JSON.parse(response.text || '{}');
            return sendJson(200, parsed);
          }

          if (req.url?.startsWith('/api/cms/articles') && req.method === 'GET') {
            const result = await getArticlesFromSheetServer();
            return sendJson(200, result);
          }

          return sendJson(404, { error: 'API route not found' });
        } catch (err: any) {
          console.error('API middleware error:', err);
          return sendJson(500, { error: err.message || 'Internal Server Error' });
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), devApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
