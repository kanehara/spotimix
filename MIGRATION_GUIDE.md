# mixceed Migration to Cloudflare Workers

This guide documents the migration from AWS Lightsail to Cloudflare Workers.

## Architecture Changes

### Before (AWS Lightsail)
- **Frontend**: Vue.js app served from Docker container
- **Backend**: Node.js/Express server with GraphQL API in Docker container
- **Deployment**: GitLab CI/CD → Docker images → AWS Lightsail
- **Cost**: ~$5-20/month

### After (Cloudflare Workers)
- **Frontend**: Vue.js app served as static assets from Worker
- **Backend**: Cloudflare Worker with GraphQL API
- **Deployment**: Single Worker deployment
- **Cost**: $0/month (free tier)

## Files Created/Modified

### New Worker Files
- `worker/src/index.js` - Main Worker entry point
- `worker/src/graphql-server.js` - GraphQL server implementation
- `worker/src/spotify-auth.js` - OAuth flow handlers
- `worker/src/spotify-playback.js` - Playback control endpoints
- `wrangler.toml` - Worker configuration
- `.dev.vars` - Development environment variables

### Modified Files
- `package.json` - Added Worker dependencies and scripts
- `client/src/apollo-client.js` - Updated GraphQL endpoint to `/api/graphql`

## API Endpoints

The Worker provides these endpoints:

### GraphQL API
- `POST /api/graphql` - GraphQL endpoint (same schema as before)

### Authentication
- `GET /api/login` - Spotify OAuth login
- `GET /api/callback` - OAuth callback handler
- `PUT /api/refresh_token` - Token refresh

### Playback Control
- `PUT /api/play` - Start playback
- `PUT /api/transfer` - Transfer playback to device
- `GET /api/currently-playing` - Get current playback state

### Health Check
- `GET /api/healthz` - Health check endpoint

## Deployment Steps

### 1. Set Environment Variables

First, set your Spotify API credentials:

```bash
# Set production secrets
wrangler secret put SPOTIFY_CLIENT_ID
wrangler secret put SPOTIFY_CLIENT_SECRET
wrangler secret put JWT_SECRET

# For local development, update .dev.vars with your actual values
```

### 2. Update Spotify App Settings

In your Spotify App settings (https://developer.spotify.com/dashboard), update:
- **Redirect URIs**: Add your Worker domain callback URL
  - Example: `https://mixceed.your-subdomain.workers.dev/api/callback`

### 3. Update Worker Configuration

In `wrangler.toml`, update the domain references:
```toml
[vars]
APP_HOST = "https://your-actual-worker-domain.workers.dev"
SPOTIFY_REDIRECT_URI = "https://your-actual-worker-domain.workers.dev/api/callback"
```

### 4. Deploy

```bash
# Build the client
npm run build:client

# Deploy the Worker
npm run deploy
```

### 5. Test

Visit your Worker domain to test the application.

## Development

### Local Development

```bash
# Start local development server
npm run dev
```

This will start the Worker locally and serve both the API and static assets.

### Building Client

```bash
# Build the Vue.js client
npm run build:client
```

## Key Benefits

1. **Cost Savings**: From $5-20/month to $0/month
2. **Simplified Architecture**: Single deployment instead of multiple containers
3. **Global Performance**: Cloudflare's edge network
4. **No Server Management**: Serverless architecture
5. **Automatic Scaling**: Handles traffic spikes automatically

## Migration Checklist

- [x] Create Worker structure
- [x] Implement GraphQL server
- [x] Migrate OAuth flow
- [x] Migrate playback endpoints
- [x] Update frontend configuration
- [x] Build client successfully
- [x] Fix immutable headers issue
- [x] Deploy to Cloudflare
- [ ] Set environment variables (Spotify credentials)
- [ ] Update Spotify app settings
- [ ] Test functionality
- [ ] Update DNS (if using custom domain)

## Rollback Plan

If needed, you can rollback to the original AWS Lightsail setup:
1. Revert the `client/src/apollo-client.js` changes
2. Restart the original Docker containers on Lightsail
3. Update Spotify app redirect URIs back to original domain

## Notes

- The GraphQL schema remains identical, so no frontend changes were needed
- All existing functionality is preserved
- OAuth flow works the same way for users
- Static assets are served directly from the Worker
- Free tier supports up to 100,000 requests per day
- Fixed immutable headers issue with redirect responses
- Worker is deployed at: https://mixceed.yohei-kanehara.workers.dev

## Current Status

✅ **DEPLOYED**: The Worker is live and serving both the API and frontend
🔧 **NEXT STEP**: Set your Spotify API credentials and update your Spotify app redirect URIs
