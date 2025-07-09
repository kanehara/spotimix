// GraphQL server implementation for Cloudflare Workers
import { buildSchema, graphql } from 'graphql';

// Client credentials token management
let CLIENT_CRED_TOKEN = null;
let TOKEN_EXPIRY = null;

async function fetchClientCredentialsToken(env) {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(env.SPOTIFY_CLIENT_ID + ':' + env.SPOTIFY_CLIENT_SECRET)}`
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials'
    })
  });

  if (response.ok) {
    const data = await response.json();
    CLIENT_CRED_TOKEN = data.access_token;
    TOKEN_EXPIRY = Date.now() + (data.expires_in - 60) * 1000; // Refresh 1 minute early
    return CLIENT_CRED_TOKEN;
  }
  
  throw new Error('Failed to get client credentials token');
}

async function getClientCredentialsToken(env) {
  if (CLIENT_CRED_TOKEN && TOKEN_EXPIRY && Date.now() < TOKEN_EXPIRY) {
    return CLIENT_CRED_TOKEN;
  }
  
  return await fetchClientCredentialsToken(env);
}

// Spotify API helpers
async function spotifyFetch(path, accessToken) {
  try {
    const response = await fetch(`https://api.spotify.com/v1${path}`, {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    });
    return response.ok ? await response.json() : null;
  } catch (err) {
    console.error(`Error fetching data from path "${path}":`, err);
    return null;
  }
}

// GraphQL Schema
const schema = buildSchema(`
  type Image {
    height: Int
    width: Int
    url: String
  }

  type ExternalUrls {
    spotify: String
  }

  type Artist {
    id: String
    name: String
    href: String
    uri: String
    images: [Image]
    external_urls: ExternalUrls
  }

  type Album {
    id: String
    name: String
    href: String
    uri: String
    external_urls: ExternalUrls
    images: [Image]
  }

  type Track {
    id: String
    uri: String
    name: String
    href: String
    album: Album
    artists: [Artist]
    external_urls: ExternalUrls
    duration_ms: Int
    preview_url: String
  }

  type Recommendations {
    tracks: [Track]
  }

  type SearchTracks {
    tracks: [Track]
  }

  type SearchArtists {
    artists: [Artist]
  }

  type Search {
    tracks: [Track]
    artists: [Artist]
  }

  type Top {
    tracks: [Track]
    artists: [Artist]
  }

  type Me {
    id: String
    country: String
    displayName: String
    email: String
    images: [Image]
    top: Top
  }

  type Query {
    me: Me
    recommendations(
      limit: Int,
      from_token: String,
      seed_artists: String,
      seed_tracks: String,
      seed_genres: String,
      target_acousticness: Float,
      target_danceability: Float,
      target_energy: Float,
      target_instrumentalness: Float,
      target_key: Int,
      target_liveness: Float,
      target_loudness: Float,
      target_mode: Int,
      target_popularity: Int,
      target_speechiness: Float,
      target_tempo: Float,
      target_valence: Float
    ): Recommendations
    search(q: String): Search
    genres: [String]
  }
`);

// GraphQL Resolvers
const rootResolver = {
  me: async (args, context) => {
    const data = await spotifyFetch('/me', context.userAccessToken);
    if (!data) return null;
    
    return {
      id: data.id,
      country: data.country,
      displayName: data.display_name,
      email: data.email,
      images: data.images,
      top: {
        tracks: async () => {
          const topData = await spotifyFetch('/me/top/tracks', context.userAccessToken);
          return topData ? topData.items : [];
        },
        artists: async () => {
          const topData = await spotifyFetch('/me/top/artists', context.userAccessToken);
          return topData ? topData.items : [];
        }
      }
    };
  },

  recommendations: async (args, context) => {
    if (!args.seed_artists && !args.seed_genres && !args.seed_tracks) {
      return { tracks: [] };
    }

    const params = new URLSearchParams();
    Object.entries(args).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params.append(key, value);
      }
    });

    const data = await spotifyFetch(`/recommendations?${params.toString()}`, context.accessToken);
    return data ? { tracks: data.tracks } : { tracks: [] };
  },

  search: async (args, context) => {
    if (!args.q) return { tracks: [], artists: [] };

    const [tracksData, artistsData] = await Promise.all([
      spotifyFetch(`/search?${new URLSearchParams({ q: args.q, type: 'track', limit: '10' })}`, context.accessToken),
      spotifyFetch(`/search?${new URLSearchParams({ q: args.q, type: 'artist', limit: '10' })}`, context.accessToken)
    ]);

    return {
      tracks: tracksData ? tracksData.tracks.items : [],
      artists: artistsData ? artistsData.artists.items : []
    };
  },

  genres: async (args, context) => {
    const data = await spotifyFetch('/recommendations/available-genre-seeds', context.accessToken);
    return data ? data.genres : [];
  }
};

export async function handleGraphQL(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': env.APP_HOST,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const { query, variables } = await request.json();
    const accessToken = await getClientCredentialsToken(env);
    
    // Get user access token from cookies if available
    const cookieHeader = request.headers.get('Cookie');
    let userAccessToken = null;
    if (cookieHeader) {
      const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
      }, {});
      userAccessToken = cookies['spotify_access_token'];
    }

    const context = {
      accessToken,
      userAccessToken,
      env
    };

    const result = await graphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: rootResolver,
      contextValue: context
    });

    return new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });

  } catch (error) {
    console.error('GraphQL Error:', error);
    return new Response(JSON.stringify({
      errors: [{ message: 'Internal server error' }]
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
}
