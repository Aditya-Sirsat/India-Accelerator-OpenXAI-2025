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

    const prompt = `Write a short, unique article (~150 words) about "${topic}". Keep it clear and concise.`

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