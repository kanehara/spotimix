import { handleSpotifyAuth } from './spotify-auth.js';
import { handleSpotifyPlayback } from './spotify-playback.js';
import { handleGraphQL } from './graphql-server.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle API routes
    if (url.pathname.startsWith('/api/')) {
      return handleAPI(request, env, ctx);
    }
    
    // Serve static assets (Vue.js app)
    return env.ASSETS.fetch(request);
  }
};

async function handleAPI(request, env, ctx) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Add CORS headers for API requests
  const corsHeaders = {
    'Access-Control-Allow-Origin': env.APP_HOST,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    let response;
    
    // GraphQL endpoint
    if (path === '/api/graphql') {
      response = await handleGraphQL(request, env);
    }
    // Spotify OAuth endpoints
    else if (path === '/api/login') {
      response = await handleSpotifyAuth.login(request, env);
    } else if (path === '/api/callback') {
      response = await handleSpotifyAuth.callback(request, env);
    } else if (path === '/api/refresh_token') {
      response = await handleSpotifyAuth.refreshToken(request, env);
    }
    // Spotify playback endpoints
    else if (path === '/api/play') {
      response = await handleSpotifyPlayback.play(request, env);
    } else if (path === '/api/transfer') {
      response = await handleSpotifyPlayback.transfer(request, env);
    } else if (path === '/api/currently-playing') {
      response = await handleSpotifyPlayback.currentlyPlaying(request, env);
    }
    // Health check
    else if (path === '/api/healthz') {
      response = new Response('Oooh weee look at me!');
    }
    // Not found
    else {
      response = new Response('API endpoint not found', { status: 404 });
    }

    // Add CORS headers to response
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    console.error('API Error:', error);
    const errorResponse = new Response('Internal Server Error', { status: 500 });
    Object.entries(corsHeaders).forEach(([key, value]) => {
      errorResponse.headers.set(key, value);
    });
    return errorResponse;
  }
}
