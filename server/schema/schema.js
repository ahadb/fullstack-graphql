const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const Movie = require("../models/movie");
const Director = require("../models/director");

// const movies = [
//   { name: "Joker", genre: "Drama", id: "1", directorId: "1" },
//   { name: "La La Land", genre: "Musical", id: "2", directorId: "2" },
//   { name: "Ma Ma Land", genre: "Musical", id: "2", directorId: "2" },
//   { name: "Interstellar", genre: "Sci-Fi", id: "3", directorId: "3" },
// ];
//
// const directors = [
//   { name: "Todd Philips", age: 50, id: "1" },
//   { name: "Wes Anderson", age: 60, id: "2" },
//   { name: "Damien Chazelle", age: 55, id: "3" },
// ];

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parentValue, args) {
        console.log(parentValue);
        return Director.findById(parentValue.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    id: { type: GraphQLID },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parentValue, args) {
        return Movie.find({ directorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve: (parentValue, args) => {
        return Movie.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve: (parentValue, args) => {
        return Director.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: (parentValue, args) => {
        return Movie.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve: (parentValue, args) => {
        return Director.find({});
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, args) {
        let director = new Director({
          name: args.name,
          age: args.age,
        });

        return director.save();
      },
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, args) {
        let movie = new Movie({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
        });

        return movie.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
