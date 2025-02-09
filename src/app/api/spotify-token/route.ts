import { NextRequest, NextResponse } from "next/server";
import { env } from "~/env";

export const GET = async (req: NextRequest) => {
  try {
    // Get authorization header from the request
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'No authorization header' },
        { status: 401 }
      );
    }

    // Extract the token
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Get currently playing using the provided token
    const result = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      method: "GET",
      headers: { 'Authorization': `Bearer ${token}` },
    });

    // Handle different response scenarios
    if (result.status === 204) {
      return NextResponse.json({ is_playing: false });
    }

    if (!result.ok) {
      throw new Error(`Spotify API error: ${result.status}`);
    }

    const data = await result.json();

    return NextResponse.json(data, { 
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': env.SPOTIFY_URL,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      }
    });

  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': env.SPOTIFY_URL,
          'Access-Control-Allow-Credentials': 'true',
        }
      }
    );
  }
};