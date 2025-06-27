import OpenAI from "openai";
import { NextResponse } from 'next/server';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { codes, category } = await request.json();

    if (!codes || !category) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing codes or category in request body",
        },
        { status: 400 }
      );
    }
    
    const formattedResults = codes.map((result: any, index: number) => ({
      id: index,
      code: result.code,
      description: result.description,
    }));
    
    const prompt = `
    You are an expert in ICD-10 coding. We have two types of subsets of ICD-10 codes:
      1. Problems
      2. Allergies

      Things can only be an allergy or a problem, so use your reasoning skills to understand whether the code fits into one or the other.

      We have a list of ICD-10 codes and descriptions. This website has the complete list of all ICD-10 codes: https://icd.who.int/browse10/2019/en

      We want to classify each code into one of the two subsets before showing it to the user.

      The user will search for a code using natural language in a problem or allergy field and the ICD-10 API will return a list of codes and descriptions.

      You will then only show the user the codes that match the subset they are looking for and the description of the code.

      The category: ${category}.

      Here is the list of codes and descriptions: ${JSON.stringify(formattedResults, null, 2)}

      Your answer should be a JSON object with a single key "results" which contains an array of the classified codes. Make sure to only return what falls within the category included in the context. If none of the items fit into the selected category, the "results" array should be empty.
    `;

    const openAIResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const responseContent = openAIResponse.choices[0].message.content;

    if (!responseContent) {
      return NextResponse.json({ success: true, results: [] });
    }

    const parsedContent = JSON.parse(responseContent);

    // Process the OpenAI response to ensure it's in the correct format
    return NextResponse.json({
      success: true,
      results: parsedContent.results || [] 
    });
  } catch (error) {
    console.error('Error processing OpenAI request:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to process request'
      },
      { status: 500 }
    );
  }
} 