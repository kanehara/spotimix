const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
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
      resolve: (data, args, context) => context.services.getMyTopTracks(context.accessToken)
    },
    artists: {
      type: new GraphQLList(Artist),
      resolve: (data, args, context) => context.services.getMyTopArtists(context.accessToken)
    }
  })
})

const Track = new GraphQLObjectType({
  name: 'Track',
  description: 'A spotify track',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: data => data.id
    },
    name: {
      type: GraphQLString,
      resolve: data => data.name
    },
    href: {
      type: GraphQLString,
      resolve: data => data.href
    },
    artists: {
      type: new GraphQLList(Artist),
      resolve: data => data.artists
    }
  })
})

const Artist = new GraphQLObjectType({
  name: 'Artist',
  description: 'A spotify artist',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: data => data.id
    },
    name: {
      type: GraphQLString,
      resolve: data => data.name
    },
    href: {
      type: GraphQLString,
      resolve: data => data.href
    }
  })
})

const Recommendations = new GraphQLObjectType({
  name: 'Recommendations',
  description: 'Spotify seed recommendations',
  fields: () => ({
    tracks: {
      type: new GraphQLList(Track),
      resolve: data => data.tracks
    }
  })
})

const Search = new GraphQLObjectType({
  name: 'Search',
  description: 'Search',
  fields: () => ({
    tracks: {
      type: new GraphQLList(Track),
      resolve: (q, args, context) =>
        context.services.search(context.accessToken, {
          type: 'track',
          q,
          limit: 5
        }).then(data => data.tracks.items)
    },
    artists: {
      type: new GraphQLList(Artist),
      resolve: (q, args, context) =>
        context.services.search(context.accessToken, {
          type: 'artist',
          q,
          limit: 5
        }).then(data => data.artists.items)
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
        resolve: (root, args, context) => context.services.getMe(context.accessToken)
      },
      recommendations: {
        type: Recommendations,
        resolve: (root, args, context) => context.services.getRecommendations(context.accessToken, args),
        args: {
          limit: {
            type: GraphQLInt,
            description: 'Result size limit'
          },
          seed_artists: {
            type: GraphQLString,
            description: 'Seed artist IDs for generating track recommendations'
          },
          seed_tracks: {
            type: GraphQLString,
            description: 'Seed track IDs for generating track recommendations'
          },
          seed_genres: {
            type: GraphQLString,
            description: 'Seed genres for generating track recommendations'
          },
          target_acousticness: {
            type: GraphQLFloat,
            description: `A confidence measure from 0.0 to 1.0 of whether 
            the track is acoustic. 1.0 represents high confidence the track is acoustic.`
          },
          target_danceability: {
            type: GraphQLFloat,
            description: `Danceability describes how suitable a track is for dancing based 
            on a combination of musical elements including tempo, rhythm stability, beat strength, 
            and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.`
          },
          target_energy: {
            type: GraphQLFloat,
            description: `Energy is a measure from 0.0 to 1.0 and represents a perceptual 
            measure of intensity and activity. Typically, energetic tracks feel fast, loud, 
            and noisy. For example, death metal has high energy, while a Bach prelude scores 
            low on the scale. Perceptual features contributing to this attribute include dynamic 
            range, perceived loudness, timbre, onset rate, and general entropy.`
          },
          target_instrumentalness: {
            type: GraphQLFloat,
            description: `Predicts whether a track contains no vocals. "Ooh" and "aah" sounds 
            are treated as instrumental in this context. Rap or spoken word tracks are clearly 
            "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood 
            the track contains no vocal content. Values above 0.5 are intended to represent 
            instrumental tracks, but confidence is higher as the value approaches 1.0.`
          },
          target_key: {
            type: GraphQLInt,
            description: `The key the track is in. Integers map to pitches using standard 
            Pitch Class notation. E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on.`
          },
          target_liveness: {
            type: GraphQLFloat,
            description: `Detects the presence of an audience in the recording. Higher liveness 
            values represent an increased probability that the track was performed live. 
            A value above 0.8 provides strong likelihood that the track is live.`
          },
          target_loudness: {
            type: GraphQLFloat,
            description: `The overall loudness of a track in decibels (dB). Loudness values are 
            averaged across the entire track and are useful for comparing relative loudness of 
            tracks. Loudness is the quality of a sound that is the primary psychological correlate 
            of physical strength (amplitude). Values typical range between -60 and 0 db.`
          },
          target_mode: {
            type: GraphQLInt,
            description: `Mode indicates the modality (major or minor) of a track, the type of scale 
            from which its melodic content is derived. Major is represented by 1 and minor is 0.`
          },
          target_popularity: {
            type: GraphQLInt,
            description: `The popularity of the track. The value will be between 0 and 100, 
            with 100 being the most popular. The popularity is calculated by algorithm and is 
            based, in the most part, on the total number of plays the track has had and how recent 
            those plays are.`
          },
          target_speechiness: {
            type: GraphQLFloat,
            description: `Speechiness detects the presence of spoken words in a track. The more 
            exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer 
            to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made 
            entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain 
            both music and speech, either in sections or layered, including such cases as rap music. 
            Values below 0.33 most likely represent music and other non-speech-like tracks.`
          },
          target_tempo: {
            type: GraphQLFloat,
            description: `The overall estimated tempo of a track in beats per minute (BPM). 
            In musical terminology, tempo is the speed or pace of a given piece and derives directly 
            from the average beat duration.`
          },
          target_valence: {
            type: GraphQLFloat,
            description: `A measure from 0.0 to 1.0 describing the musical positiveness conveyed 
            by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), 
            while tracks with low valence sound more negative (e.g. sad, depressed, angry).`
          }
        }
      },
      search: {
        type: Search,
        args: {
          q: {
            type: GraphQLString,
            description: 'The search query'
          }
        },
        resolve: (root, args, context) => args.q
      },
      genres: {
        type: new GraphQLList(GraphQLString),
        resolve: async (root, args, context) => context.services.getGenres(context.accessToken)
      }
    })
  })
})
