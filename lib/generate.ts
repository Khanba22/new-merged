import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
  import mime from "mime-types";
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI("AIzaSyBv8FYDVTHzaVUcI4J1lvq8UzyUXXXIlpc");
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "application/json",
  };
  
export async function askAgent(queryType) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(promptMap[queryType]);
    console.log(result.response.text());
    return JSON.parse(result.response.text())
  }
  

const promptMap: { [key: string]: string } = {
    generate_quiz:`Generate a 
    
    Only one option should be correct per question.
    
    The questions should cover a variety of topics such as:
    - Income tax
    - Sales tax
    - VAT
    - Payroll tax
    - Excise tax
    - Property tax
    - Capital gains
    - Tax authorities (e.g. IRS, state governments)
    - Municipal taxes
    
    Format your response as pure JSON with no extra text.`,

    generate_topics:`Generate a 3 long Array of json object that contains the following fields as the given example
    
    {
    id: 1,
    title: "Tax Fundamentals",
    sections: [
      { id: 1, title: "What are Taxes?", completed: true },
      { id: 2, title: "Types of Taxes", completed: true },
      { id: 3, title: "Tax Authorities", completed: false },
    ],
    progress: 66,
    icon: BookOpen,
    content: {
      paragraphs: [
        "Tax authorities are government bodies responsible for administering and enforcing tax laws. In the United States, the primary federal tax authority is the Internal Revenue Service (IRS), which collects income taxes, payroll taxes, and other federal taxes.",
        "State tax authorities, such as the Franchise Tax Board in California or the Department of Revenue in many states, handle state-level taxes. Local governments may also have their own tax authorities for property taxes and other local levies.",
      ],
      insight: {
        title: "Key Insight",
        message:
          "Understanding which tax authority governs different types of taxes is crucial for proper compliance and knowing where to direct questions or concerns about your tax obligations.",
      },
    },
  },

    Only one option should be correct per question.
    
    The questions should cover a variety of topics such as:
    - Income tax
    - Sales tax
    - VAT
    - Payroll tax
    - Excise tax
    - Property tax
    - Capital gains
    - Tax authorities (e.g. IRS, state governments)
    - Municipal taxes
    
    Format your response as pure JSON with no extra text.`
        
}


