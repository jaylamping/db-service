import { GraphQLResolveInfo } from 'graphql';
import { createLeague, deleteLeague, updateLeague, getLeague, getLeagues } from '../services/league.service';

export const leagueResolver = {
  Query: {
    leagues: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await getLeagues({ info });
    },
    league: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await getLeague({ id: args.id, info });
    }
  },
  Mutation: {
    createLeague: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await createLeague({ name: args.input.name, logo_url: args.input.logo_url, sport: args.input.sport });
    },
    updateLeague: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await updateLeague({
        id: args.input.id,
        data: { name: args.input.name, logo_url: args.input.logo_url, sport: args.input.sport }
      });
    },
    deleteLeague: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await deleteLeague({ id: args.input.id });
    }
  }
};
