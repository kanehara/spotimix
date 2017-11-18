const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt
} = require('graphql')

const MyType = new GraphQLObjectType({
  name: 'MyType',
  description: '...',
  fields: () => ({
    id: {
      type: GraphQLInt
    }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      myType: {
        type: MyType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args, context) => ({})
      }
    })
  })
})
