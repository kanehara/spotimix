import cookie from 'cookie';

const ACCESS_TOKEN_COOKIE_KEY = 'spotify_access_token';
const REFRESH_TOKEN_COOKIE_KEY = 'spotify_refresh_token';

function getCookie(request, name) {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return null;
  
  const cookies = cookie.parse(cookieHeader);
  return cookies[name] || null;
}

function setCookie(response, name, value, options = {}) {
  const cookieOptions = {
    httpOnly: false,
    secure: true,
    sameSite: 'Lax',
    path: '/',
    ...options
  };
  
  const cookieString = cookie.serialize(name, value, cookieOptions);
  response.headers.append('Set-Cookie', cookieString);
}

function clearCookie(response, name) {
  setCookie(response, name, '', { maxAge: 0 });
}

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

async function spotifyMiddleware(request, env) {
  const accessToken = getCookie(request, ACCESS_TOKEN_COOKIE_KEY);
  const refreshToken = getCookie(request, REFRESH_TOKEN_COOKIE_KEY);
  
  if (!accessToken || !refreshToken) {
    return { error: 'Unauthorized', status: 401 };
  }

  try {
    const authRes = await generateSpotifyToken({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }, env);

    if (authRes.ok) {
      const body = await authRes.json();
      const refreshedAccessToken = body.access_token;
      
      return {
        accessToken: refreshedAccessToken,
        refreshToken: body.refresh_token || refreshToken
      };
    } else {
      return { error: 'Session expired', status: 440 };
    }
  } catch (e) {
    console.error('Error requesting Spotify refresh token:', e);
    return { error: 'Session expired', status: 440 };
  }
}

export const handleSpotifyPlayback = {
  async play(request, env) {
    const authResult = await spotifyMiddleware(request, env);
    if (authResult.error) {
      const response = new Response(authResult.error, { status: authResult.status });
      if (authResult.status === 440) {
        clearCookie(response, ACCESS_TOKEN_COOKIE_KEY);
        clearCookie(response, REFRESH_TOKEN_COOKIE_KEY);
      }
      return response;
    }

    const body = await request.json();
    const uris = body?.uris;
    const deviceId = body?.deviceId;

    if (!uris || !uris.length) {
      return new Response('missing uris to play', { status: 400 });
    }
    if (!deviceId) {
      return new Response('missing device id', { status: 400 });
    }

    // Disable shuffle ignoring errors
    try {
      await fetch(`https://api.spotify.com/v1/me/player/shuffle?state=false`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authResult.accessToken}`
        }
      });
    } catch (e) {
      console.warn('Error trying to disable shuffle in Spotify:', e);
    }

    try {
      const playRes = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authResult.accessToken}`
        },
        body: JSON.stringify({ uris })
      });

      const response = new Response(null, { status: playRes.ok ? 200 : playRes.status });
      
      // Update cookies with refreshed tokens
      setCookie(response, ACCESS_TOKEN_COOKIE_KEY, authResult.accessToken);
      if (authResult.refreshToken) {
        setCookie(response, REFRESH_TOKEN_COOKIE_KEY, authResult.refreshToken);
      }
      
      return response;
    } catch (e) {
      console.error('Error trying to play tracks in Spotify:', e);
      return new Response('Playback error', { status: 500 });
    }
  },

  async transfer(request, env) {
    const authResult = await spotifyMiddleware(request, env);
    if (authResult.error) {
      const response = new Response(authResult.error, { status: authResult.status });
      if (authResult.status === 440) {
        clearCookie(response, ACCESS_TOKEN_COOKIE_KEY);
        clearCookie(response, REFRESH_TOKEN_COOKIE_KEY);
      }
      return response;
    }

    const body = await request.json();
    const deviceId = body?.deviceId;

    if (!deviceId) {
      return new Response('missing deviceId', { status: 400 });
    }

    try {
      const transferRes = await fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authResult.accessToken}`
        },
        body: JSON.stringify({
          device_ids: [deviceId]
        })
      });

      const response = new Response(null, { status: transferRes.ok ? 200 : transferRes.status });
      
      // Update cookies with refreshed tokens
      setCookie(response, ACCESS_TOKEN_COOKIE_KEY, authResult.accessToken);
      if (authResult.refreshToken) {
        setCookie(response, REFRESH_TOKEN_COOKIE_KEY, authResult.refreshToken);
      }
      
      return response;
    } catch (e) {
      console.error('Error trying to transfer playback:', e);
      return new Response('Transfer error', { status: 500 });
    }
  },

  async currentlyPlaying(request, env) {
    const authResult = await spotifyMiddleware(request, env);
    if (authResult.error) {
      const response = new Response(authResult.error, { status: authResult.status });
      if (authResult.status === 440) {
        clearCookie(response, ACCESS_TOKEN_COOKIE_KEY);
        clearCookie(response, REFRESH_TOKEN_COOKIE_KEY);
      }
      return response;
    }

    try {
      const currentRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authResult.accessToken}`
        }
      });

      const data = currentRes.ok ? await currentRes.json() : null;
      const response = new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
      
      // Update cookies with refreshed tokens
      setCookie(response, ACCESS_TOKEN_COOKIE_KEY, authResult.accessToken);
      if (authResult.refreshToken) {
        setCookie(response, REFRESH_TOKEN_COOKIE_KEY, authResult.refreshToken);
      }
      
      return response;
    } catch (e) {
      console.error('Error retrieving currently playing state:', e);
      return new Response('Currently playing error', { status: 500 });
    }
  }
};
