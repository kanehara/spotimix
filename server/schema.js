const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')

const Image = new GraphQLObjectType({
  name: 'Image',
  description: 'Holds image info',
  fields: () => ({
    height: {
      type: GraphQLInt,
      resolve: data => data.height
    },
    width: {
      type: GraphQLInt,
      resolve: data => data.width
    },
    url: {
      type: GraphQLString,
      resolve: data => data.url
    }
  })
})

const Me = new GraphQLObjectType({
  name: 'Me',
  description: 'Spotify authenticated user information',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: data => data.id
    },
    country: {
      type: GraphQLString,
      resolve: data => data.country
    },
    displayName: {
      type: GraphQLString,
      resolve: data => data.display_name
    },
    email: {
      type: GraphQLString,
      resolve: data => data.email
    },
    images: {
      type: new GraphQLList(Image),
      resolve: data => data.images
    },
    top: {
      type: Top,
      resolve: data => data
    }
  })
})

const Top = new GraphQLObjectType({
  name: 'Top',
  description: 'User\'s top tracks or artists',
  fields: () => ({
    tracks: {
      type: new GraphQLList(Track),
      resolve: (data, args, context) => context.service.getMyTopTracks(context.accessToken)
    },
    artists: {
      type: new GraphQLList(Artist),
      resolve: (data, args, context) => context.service.getMyTopArtists(context.accessToken)
    }
  })
})

const Track = new GraphQLObjectType({
  name: 'Track',
  description: 'A spotify track',
  fields: () => ({
    href: {
      type: GraphQLString,
      resolve: data => data.href
    }
  })
})

const Artist = new GraphQLObjectType({
  name: 'Artist',
  description: 'A spotify artist',
  fields: () => ({
    href: {
      type: GraphQLString,
      resolve: data => data.href
    }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
      me: {
        type: Me,
        resolve: (root, args, context) => context.service.getMe(context.accessToken)
      }
    })
  })
})
