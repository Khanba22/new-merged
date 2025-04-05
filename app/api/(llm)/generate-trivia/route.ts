function generateTriviaPrompt(topicId: any, title: any, description: any) {
    return `
You are an AI that creates trivia-style multiple-choice questions (MCQs) for educational purposes.

Generate a structured JSON object with the following schema:
{
    topic: ObjectId, // use the provided topic ID
    title: string,   // provided title
    description: string, // provided description
    questions: [
        {
            question: string,
            options: string[4], // exactly 4 options
            answer: number      // index (0–3) of the correct option
        }
    ]
}

Instructions:
- Use the provided topic ID, title, and description.
- Dynamically generate trivia content related to the topic.
- Generate 5 trivia-style multiple-choice questions based on general knowledge or interesting facts.
- Each question must have 4 distinct options.
- The "answer" field must be the index (0 to 3) of the correct answer in the options array.
- The trivia should be engaging, fact-based, and easy to understand.
- Avoid repetition or overly technical jargon.
- Output only the JSON object — no extra explanation or commentary.

Input:
Topic ID: ${topicId}
Title: ${title}
Description: ${description}
    `.trim();
}
