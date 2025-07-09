import { serialize, parse } from 'cookie';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const STATE_KEY = 'mixceed_auth_state';
const TRACK_INDEX_KEY = 'mixceed_track_index';
const ACCESS_TOKEN_COOKIE_KEY = 'spotify_access_token';
const REFRESH_TOKEN_COOKIE_KEY = 'spotify_refresh_token';

async function generateSpotifyToken(data, env) {
  const URL = 'https://accounts.spotify.com/api/token';
  const body = new URLSearchParams(data).toString();
  
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(env.SPOTIFY_CLIENT_ID + ':' + env.SPOTIFY_CLIENT_SECRET)}`
    },
    body
  });
}

function getCookie(request, name) {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return null;
  
  const cookies = parse(cookieHeader);
  return cookies[name] || null;
}

export const handleSpotifyAuth = {
  async login(request, env) {
    const url = new URL(request.url);
    const state = generateRandomString(16);
    const trackIndex = url.searchParams.get('trackIndex') || null;
    
    const redirectUrl = 'https://accounts.spotify.com/authorize?' + 
      new URLSearchParams({
        response_type: 'code',
        client_id: env.SPOTIFY_CLIENT_ID,
        scope: 'user-modify-playback-state streaming',
        redirect_uri: env.SPOTIFY_REDIRECT_URI,
        state: state
      }).toString();
    
    const res = new Response(null, {
      status: 302
    });
    res.headers.set('Location', redirectUrl);
    res.headers.append('Set-Cookie', serialize(STATE_KEY, state, { maxAge: 600, path: '/', secure: true, httpOnly: true, sameSite: 'lax' }));
    
    if (trackIndex) {
      res.headers.append('Set-Cookie', serialize(TRACK_INDEX_KEY, trackIndex, { maxAge: 600, path: '/', secure: true, httpOnly: true, sameSite: 'lax' }));
    }

    return res;
  },

  async callback(request, env) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const storedState = getCookie(request, STATE_KEY);

    if (state === null || state !== storedState) {
      const redirectUrl = env.APP_HOST + '/#/results?' +
        new URLSearchParams({
          error: 'state_mismatch'
        }).toString();
      
      return new Response(null, {
        status: 302,
        headers: { 'Location': redirectUrl }
      });
    }

    try {
      const authRes = await generateSpotifyToken({
        code: code,
        redirect_uri: env.SPOTIFY_REDIRECT_URI,
        grant_type: 'authorization_code'
      }, env);

      if (authRes.ok) {
        const body = await authRes.json();
        const redirectUrl = env.APP_HOST + '/#/results';
        

        const res = new Response(null, { status: 302 });
        res.headers.set('Location', redirectUrl);
        res.headers.append('Set-Cookie', serialize(STATE_KEY, '', { maxAge: 0, path: '/', secure: true, httpOnly: true, sameSite: 'lax' }))
        res.headers.append('Set-Cookie', serialize(REFRESH_TOKEN_COOKIE_KEY, body.refresh_token, { path: '/', secure: true, httpOnly: false, sameSite: 'lax' }))
        res.headers.append('Set-Cookie', serialize(ACCESS_TOKEN_COOKIE_KEY, body.access_token, { path: '/', secure: true, httpOnly: false, sameSite: 'lax' }))

        return res
      } else {
        const redirectUrl = env.APP_HOST + '/#/results?' +
          new URLSearchParams({
            error: 'invalid_token'
          }).toString();
        
        return new Response(null, {
          status: 302,
          headers: { 'Location': redirectUrl }
        });
      }
    } catch (err) {
      console.error('Error requesting api token from Spotify:', err);
      const redirectUrl = env.APP_HOST + '/#/results?' +
        new URLSearchParams({
          error: 'auth_error'
        }).toString();
      
      return new Response(null, {
        status: 302,
        headers: { 'Location': redirectUrl }
      });
    }
  },

  async refreshToken(request, env) {
    const accessToken = getCookie(request, ACCESS_TOKEN_COOKIE_KEY);
    const refreshToken = getCookie(request, REFRESH_TOKEN_COOKIE_KEY);
    
    if (!accessToken || !refreshToken) {
      return new Response('Unauthorized', { status: 401 });
    }

    try {
      const authRes = await generateSpotifyToken({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      }, env);

      if (authRes.ok) {
        const body = await authRes.json();
        const refreshedAccessToken = body.access_token;
        
        const cookies = [
          serialize(ACCESS_TOKEN_COOKIE_KEY, refreshedAccessToken, { path: '/', secure: true, httpOnly: false, sameSite: 'lax' })
        ];
        
        if (body.refresh_token) {
          cookies.push(
            serialize(REFRESH_TOKEN_COOKIE_KEY, body.refresh_token, { path: '/', secure: true, httpOnly: false, sameSite: 'lax' })
          );
        }
        
        const headers = new Headers({
          'Content-Type': 'application/json'
        });
        
        // Add each cookie as a separate Set-Cookie header
        cookies.forEach(cookie => {
          headers.append('Set-Cookie', cookie);
        });
        
        return new Response(JSON.stringify({
          access_token: refreshedAccessToken
        }), {
          headers: headers
        });
      } else {
        const cookies = [
          serialize(ACCESS_TOKEN_COOKIE_KEY, '', { maxAge: 0, path: '/', secure: true, httpOnly: false, sameSite: 'lax' }),
          serialize(REFRESH_TOKEN_COOKIE_KEY, '', { maxAge: 0, path: '/', secure: true, httpOnly: false, sameSite: 'lax' })
        ];
        
        const headers = new Headers();
        
        // Add each cookie as a separate Set-Cookie header
        cookies.forEach(cookie => {
          headers.append('Set-Cookie', cookie);
        });
        
        return new Response('Session expired', { 
          status: 440,
          headers: headers
        });
      }
    } catch (e) {
      console.error('Error requesting Spotify refresh token:', e);
      const cookies = [
        serialize(ACCESS_TOKEN_COOKIE_KEY, '', { maxAge: 0, path: '/', secure: true, httpOnly: false, sameSite: 'lax' }),
        serialize(REFRESH_TOKEN_COOKIE_KEY, '', { maxAge: 0, path: '/', secure: true, httpOnly: false, sameSite: 'lax' })
      ];
      
      const headers = new Headers();
      
      // Add each cookie as a separate Set-Cookie header
      cookies.forEach(cookie => {
        headers.append('Set-Cookie', cookie);
      });
      
      return new Response('Session expired', { 
        status: 440,
        headers: headers
      });
    }
  }
};
