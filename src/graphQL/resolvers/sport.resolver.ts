import { GraphQLResolveInfo } from 'graphql';
import { createSport, deleteSport, updateSport, getSport, getSports } from '../services/sport.service';

export const sportResolver = {
  Query: {
    sports: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await getSports({ info });
    },
    sport: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await getSport({ id: args.id, info });
    }
  },
  Mutation: {
    createSport: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await createSport({ name: args.name, logo_url: args.logo_url });
    },
    updateSport: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await updateSport({ id: args.id, data: { name: args.name, logo_url: args.logo_url } });
    },
    deleteSport: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await deleteSport({ id: args.id });
    }
  }
};
