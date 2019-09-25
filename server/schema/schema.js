const graphql = require('graphql');
const _ = require('lodash')
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

//hardcoded data for testing
let books = [
    {name: 'name of the wind', genre: 'fantasy', id: '1'},
    {name: 'the final empire', genre: 'fantasy', id: '2'},
    {name: 'the long earth', genre: 'Sci-fi', id: '3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType ({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                //parent is the relationship between data
                //code to get data from db or sources
                return _.find(books, {id: args.id});
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})