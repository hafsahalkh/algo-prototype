import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Lab Summary
  app.post("/api/summarize-lab", async (req, res) => {
    try {
      const { labData } = req.body;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are a medical analyst specialized in bio-optimization and sports performance. 
        Analyze the following lab results for a user of AlgoRx (a bio-optimization platform).
        Provide a concise summary of the findings, highlighting anything outside of optimal ranges, 
        and suggest potential bio-optimization focus areas (e.g., diet, sleep, specific supplements).
        
        LAB DATA:
        ${JSON.stringify(labData)}
        
        FORMAT: Return a structured JSON response with:
        - "summary": string
        - "alerts": array of objects { marker, value, range, status }
        - "recommendations": array of strings
        `,
        config: {
          responseMimeType: "application/json"
        }
      });

      const resultText = response.text || "{}";
      res.json(JSON.parse(resultText));
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to generate summary" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
