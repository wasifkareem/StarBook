import { NextRequest, NextResponse } from 'next/server';

const SYNDICATION_URL = 'https://cdn.syndication.twimg.com';

function getToken(xId: string) {
  return ((Number(xId) / 1e15) * Math.PI)
    .toString(6 ** 2)
    .replace(/(0+|\.)/g, '');
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const xId = searchParams.get('xId');

    if (typeof xId !== 'string') {
      return NextResponse.json(
        { error: 'xId is required and must be a string' },
        { status: 400 }
      );
    }

    const url = new URL(`${SYNDICATION_URL}/tweet-result`);
    url.searchParams.set('id', xId);
    url.searchParams.set('lang', 'en');
    url.searchParams.set('token', getToken(xId));

    const result = await fetch(url.toString());
    const isJson = result.headers
      .get('content-type')
      ?.includes('application/json');
    const data = isJson ? await result.json() : undefined;

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching tweet:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
