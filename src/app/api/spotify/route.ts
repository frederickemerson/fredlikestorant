import { NextRequest, NextResponse } from "next/server";
import { env } from "~/env";
import { cookies } from 'next/headers';

const getAccessToken = async (client_id: string, client_secret: string) => {
  const refresh_token = env.SPOTIFY_REFRESH_TOKEN;
  
  const response = await fetch(`https://accounts.spotify.com/api/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'grant_type': 'refresh_token',
      'refresh_token': refresh_token,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.status}`);
  }

  const data = await response.json();
  
  if (!data.access_token) {
    throw new Error('No access token received');
  }

  return data.access_token;
};

export const GET = async (req: NextRequest) => {
  const client_id = env.SPOTIFY_CLIENT_ID;
  const client_secret = env.SPOTIFY_CLIENT_SECRET;

  try {
    // Get new access token
    const access_token = await getAccessToken(client_id, client_secret);

    // Get currently playing
    const result = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      method: "GET",
      headers: { 'Authorization': `Bearer ${access_token}` },
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

export const OPTIONS = async () => {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': env.SPOTIFY_URL,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
};