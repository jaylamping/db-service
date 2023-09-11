import { GraphQLResolveInfo } from 'graphql';
import { createTeam, deleteTeam, updateTeam, getTeam, getTeams } from '../services/team.service';

export const teamResolver = {
  Query: {
    teams: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await getTeams({ info });
    },
    team: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await getTeam({ id: args.id, info });
    }
  },
  Mutation: {
    createTeam: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await createTeam({
        name: args.input.name,
        logo_url: args.input.logo_url,
        location: args.input.location,
        leagueId: args.input.leagueId,
        sportId: args.input.sportId
      });
    },
    updateTeam: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await updateTeam({
        id: args.input.id,
        data: {
          name: args.input.name,
          logo_url: args.input.logo_url,
          location: args.input.location,
          leagueId: args.input.leagueId,
          sportId: args.input.sportId
        }
      });
    },
    deleteTeam: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await deleteTeam({ id: args.input.id });
    }
  }
};
