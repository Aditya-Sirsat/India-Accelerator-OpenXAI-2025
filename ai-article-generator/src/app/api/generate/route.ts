import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json()

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      )
    }

    const prompt = `Write a comprehensive, well-researched, and thoughtful article about "${topic}". The article should be detailed (approximately 800-1200 words) and include:

1. A compelling introduction that hooks the reader
2. In-depth analysis with multiple perspectives
3. Supporting evidence and examples
4. Critical thinking and nuanced viewpoints
5. Practical implications and real-world applications
6. A thoughtful conclusion that ties everything together

Write in simple, clean text without any markdown formatting, special characters, or formatting symbols. Use clear paragraphs, natural language, and straightforward presentation. Make the content engaging, informative, and intellectually stimulating while maintaining excellent readability and visual appeal. Ensure the article provides genuine value and insights that readers can learn from.`

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.2:1b',
        prompt: prompt,
        stream: false,
      }),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Llama server unavailable. Try again later.' },
        { status: 502 }
      )
    }

    const data = await response.json()

    // Try to get the article text from the response
    const articleText = data.article || data.text || data.response
    if (!articleText) {
      return NextResponse.json(
        { error: 'Invalid response from Llama server.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      article: articleText.trim(),
      createdAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Unexpected server error.' },
      { status:500 }
    )
  }
}