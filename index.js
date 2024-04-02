import path from "path";
import cors from "cors";
import express from "express";
import OpenAI from "openai";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

// Get the current file and directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize OpenAI instance with your API key
const openai = new OpenAI({
  apiKey: "api key here",
});

// Middleware to enable CORS
app.use(cors());

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse JSON bodies
app.use(express.json());

// POST route to handle queries to OpenAI
app.post("/query", async (req, res) => {
  // Extract the 'message' property from the request body
  const { message } = req.body;

  try {
    // Call OpenAI API to get response
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo",
    });

    // Send response from OpenAI API to client
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    // Send error response if there's an error
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
});

// Route to serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Route to serve other HTML pages
app.get("/:page", (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, "views", `${page}`));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
