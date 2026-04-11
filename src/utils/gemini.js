console.log('API KEY:', import.meta.env.VITE_GEMINI_API_KEY)
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

export const generateItinerary = async (formData) => {
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

  const prompt = `
    You are an expert travel planner. Generate a detailed day-by-day travel itinerary based on the following details:

    - Destination: ${formData.destination}
    - Number of Days: ${formData.days}
    - Number of People: ${formData.people}
    - Budget: ${formData.budget}
    - Travel Style: ${formData.travelStyle}

    Please respond in the following JSON format only, no extra text:
    {
      "destination": "city, country",
      "days": number,
      "budget": "budget level",
      "travelStyle": "style",
      "people": number,
      "itinerary": [
        {
          "day": 1,
          "title": "Day title",
          "morning": "Morning activity description",
          "afternoon": "Afternoon activity description",
          "evening": "Evening activity description",
          "food": "Food recommendations for the day",
          "tips": "Useful tips for the day"
        }
      ],
      "generalTips": "Overall travel tips for this trip",
      "estimatedBudget": "Estimated budget breakdown"
    }
  `

  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()

  // Clean the response and parse JSON
  const cleaned = text.replace(/```json|```/g, '').trim()
  const parsed = JSON.parse(cleaned)
  return parsed
}
