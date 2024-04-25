import { NextRequest, NextResponse } from "next/server";
import { env } from "~/env";
import { cookies } from 'next/headers';

const getAccessToken = async (client_id, client_secret, cookieStore) => {
  let refresh_token = cookieStore.get('refresh_token');
  
  if (!refresh_token) {
    refresh_token = env.SPOTIFY_REFRESH_TOKEN;
    cookieStore.set('refresh_token', refresh_token, { secure: true, httpOnly: true });
  }

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

  return response.json();
};

export const GET = async (req: NextRequest) => {
  const client_id = env.SPOTIFY_CLIENT_ID;
  const client_secret = env.SPOTIFY_CLIENT_SECRET;
  const cookieStore = cookies(req.headers); 

  try {
    const { access_token, refresh_token } = await getAccessToken(client_id, client_secret, cookieStore);

    if (refresh_token) {
      cookieStore.set('refresh_token', refresh_token, { secure: true, httpOnly: true });
    }

    const result = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      method: "GET",
      headers: { 'Authorization': `Bearer ${access_token}` },
    });

    return new NextResponse(JSON.stringify(await result.json()), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
