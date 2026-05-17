import express from "express"
import cors from "cors"
import "dotenv/config"

const app = express()
const port = Number(process.env.PORT || 5000)
const geminiModel = process.env.GEMINI_MODEL || "gemini-2.5-flash"
const geminiApiKey = process.env.GEMINI_API_KEY

app.use(cors())
app.use(express.json({ limit: "1mb" }))

function buildAdvisorPrompt(message, context = {}) {
  return `
You are the Finalytics Strategic Advisor, a practical financial AI for a startup dashboard.

Business context:
- Revenue: INR ${Math.round(context.totalRevenue || 0)}
- Expenses: INR ${Math.round(context.totalExpenses || 0)}
- Profit: INR ${Math.round(context.profit || 0)}
- Profit margin: ${Number(context.profitMargin || 0).toFixed(1)}%
- Revenue growth: ${Number(context.revenueGrowth || 0).toFixed(1)}%
- Expense growth: ${Number(context.expenseGrowth || 0).toFixed(1)}%
- Runway: ${Number(context.runwayMonths || 0).toFixed(1)} months

User question: ${message}

Instructions:
- Answer in 2-3 concise sentences.
- Be direct, data-driven, and useful.
- Mention one concrete next action when relevant.
`
}

function readGeminiText(data) {
  const candidate = data?.candidates?.[0]
  const text = candidate?.content?.parts
    ?.map((part) => part.text)
    .filter(Boolean)
    .join("")
    .trim()

  if (text) {
    return text
  }

  const finishReason = candidate?.finishReason
  if (finishReason) {
    throw new Error(`Gemini returned no text. Finish reason: ${finishReason}.`)
  }

  throw new Error("Gemini returned no text.")
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    geminiConfigured: Boolean(geminiApiKey),
    model: geminiModel,
  })
})

app.post("/api/chat", async (req, res) => {
  const { message, context } = req.body

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required." })
  }

  if (!geminiApiKey) {
    return res.status(500).json({
      error: "GEMINI_API_KEY is missing. Add it to .env and restart the server.",
    })
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": geminiApiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: buildAdvisorPrompt(message, context) }],
            },
          ],
          generationConfig: {
            temperature: 0.45,
            maxOutputTokens: 220,
          },
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      const messageFromApi = data?.error?.message || "Gemini request failed."
      return res.status(response.status).json({ error: messageFromApi })
    }

    res.json({ reply: readGeminiText(data), model: geminiModel })
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Gemini request failed.",
    })
  }
})

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`)
  console.log(
    geminiApiKey
      ? `Gemini configured with ${geminiModel}`
      : "Gemini is not configured. Add GEMINI_API_KEY to .env."
  )
})
