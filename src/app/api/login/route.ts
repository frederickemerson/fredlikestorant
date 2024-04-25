import { type NextRequest, NextResponse } from "next/server";
import { env } from '~/env';

const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

export const GET = async () => {
    
   const client_id = env.SPOTIFY_CLIENT_ID;
   const redirect_uri = env.SPOTIFY_REDIRECT_URI;

  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email user-top-read user-read-currently-playing';


  const params = new URLSearchParams({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
});

const url = `https://accounts.spotify.com/authorize?${params.toString()}`

return NextResponse.redirect(url,302);
}
