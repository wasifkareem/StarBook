import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import {prisma} from "@/lib/db"; 
import { validateQuery } from '@/lib/validate';
import { spaceQuery, spaceQuerySchema } from '@/lib/schemas/space.schema';


export async function POST(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        
        const validation = validateQuery(spaceQuerySchema,searchParams);
        if (!validation.success) {
            return NextResponse.json(
                { error: "Invalid query parameters" },
                { status: 400 }
            );
        }

        if (!process.env.GOOGLE_API_KEY) {
            console.error("Gemini API key is missing. Unable to generate insights.");
            return NextResponse.json(
                { error: "Gemini API key is missing" },
                { status: 500 }
            );
        }

        const {spaceId} = validation.data as spaceQuery

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

        const testimonials = await prisma.testimonial.findMany({
            where: {
                spaceId: spaceId
            },
            select: {
                testimonial: true
            }
        });

        if (testimonials.length === 0) {
            return NextResponse.json(
                { error: "No testimonials found for this space" },
                { status: 404 }
            );
        }

        const prompt = `Analyse the testimonial in this array : ${JSON.stringify(
      testimonials
    )}.these testimonials are from sass product users/customers, return a parsed JSON object, containg  key-value pair, first key will be"positive" with value being an three line paragraph of things users love about this product, second key will be "negative" with value being a three line paragraph of problem users are facing during using the product, third key will be "suggestions"with value being an object with three keys(named "one","two","three") having value as three bullet points of suggestions with initial bold text on what can be improved based on all the testimonials, dont add any markdown or language identifier, just raw JSON, content should not exceed 1380 characters, `;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = result.response;
        let text = response.text();
        
        // Clean up response
        text = text
            .replace(/```json\n?/g, "")
            .replace(/\n?```\s*/g, "")
            .trim();

        const parsedText = JSON.parse(text);

        return NextResponse.json(parsedText, { status: 200 });

    } catch (error: any) {
        console.error("Error generating insights:", error);
        
        if (error?.status === 429 || error?.message?.includes('quota') || error?.message?.includes('Too Many Requests')) {
            return NextResponse.json(
                { error: "API quota exceeded. Please try again later or upgrade your plan." },
                { status: 429 }
            );
        }
        
        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { error: "Failed to parse AI response" },
                { status: 500 }
            );
        }
        
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}