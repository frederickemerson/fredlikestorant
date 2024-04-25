import {  NextRequest, NextResponse } from "next/server";
import { env } from "~/env";
import { NextApiRequest, NextApiResponse } from "next";
import { SpotifyAPIResponse } from "~/lib/types";

export const GET = async (req: NextApiRequest,res: NextApiResponse) => {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    if(state==null){
      return NextResponse.redirect(new URL('http://localhost:3000'));
    } else {

      const client_id = env.SPOTIFY_CLIENT_ID;
      const client_secret = env.SPOTIFY_CLIENT_SECRET;
      const redirect_uri = env.SPOTIFY_REDIRECT_URI;

      const url = 'https://accounts.spotify.com/api/token';
      const headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
      };
      const body = new URLSearchParams({
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
      });
  
      try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });

        const data:SpotifyAPIResponse = await response.json();

        return new NextResponse(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
      } catch (error) {
        console.error('Error fetching data from Spotify:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to retrieve access token' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    }
  };