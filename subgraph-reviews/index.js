import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';

import { readFileSync } from 'fs';
import axios from 'axios';
import get  from 'axios';
import gql from 'graphql-tag';

import errors from '../utils/errors.js';
const {AuthenticationError}=errors
const typeDefs = gql(readFileSync('./schema.graphql', { encoding: 'utf-8' }));
import resolvers from './resolvers.js';
import BookingsAPI from '../subgraph-listings/datasources/bookings.js';
import ListingsAPI from '../subgraph-bookings/datasources/listings.js';
import ReviewsAPI from '../subgraph-reviews/datasources/reviews.js';
async function startApolloServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs,
      resolvers,      
    }),
  });

  const port = 4005; // TODO: change port number
  const subgraphName = 'reviews'; // TODO: change to subgraph name

  try {
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || '';
        const userId = token.split(' ')[1]; // get the user name after 'Bearer '
        let userInfo = {};
        if (userId) {
          const { data } = await get(`http://localhost:4011/login/${userId}`)
            .catch((error) => {
              throw AuthenticationError();
            });

          userInfo = { userId: data.id, userRole: data.role };
        }

        return {
          ...userInfo,
          dataSources: {
           reviewsAPI:new ReviewsAPI(),
           bookingsAPI:new BookingsAPI(),
           listingsAPI:new ListingsAPI()
          },
        };
      },
      listen: {
        port,
      },
    });

    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  } catch (err) {
    console.error(err);
  }
}

startApolloServer();
