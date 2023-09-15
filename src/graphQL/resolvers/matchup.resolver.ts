import { GraphQLResolveInfo } from 'graphql';
import {
  createMatchup,
  deleteMatchup,
  updateMatchup,
  getMatchup,
  getMatchups,
  getUpcomingMatchups,
  addURLToMatchup
} from '../services/matchup.service';

export const matchupResolver = {
  Query: {
    matchups: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await getMatchups({ info });
    },
    getUpcomingMatchups: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await getUpcomingMatchups({ info });
    },
    matchup: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await getMatchup({ id: args.id, info });
    }
  },
  Mutation: {
    createMatchup: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await createMatchup({
        name: args.input.name,
        logo_url: args.input.logo_url,
        description: args.input.description,
        dateTime: args.input.dateTime,
        homeTeamId: args.input.homeTeamId,
        homeTeam: args.input.homeTeam,
        awayTeamId: args.input.awayTeamId,
        awayTeam: args.input.awayTeam,
        sport: args.input.sport,
        league: args.input.league,
        primaryStream: args.input.primaryStream,
        secondaryStream: args.input.secondaryStream,
        tertiaryStream: args.input.tertiaryStream,
        fallbackStream: args.input.fallbackStream,
        externalId: args.input.externalId
      });
    },
    updateMatchup: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await updateMatchup({
        id: args.input.id,
        data: {
          name: args.input.name,
          logo_url: args.input.logo_url,
          description: args.input.description,
          dateTime: args.input.dateTime,
          homeTeamId: args.input.homeTeamId,
          homeTeam: args.input.homeTeam,
          awayTeamId: args.input.awayTeamId,
          awayTeam: args.input.awayTeam,
          sport: args.input.sport,
          league: args.input.league,
          primaryStream: args.input.primaryStream,
          secondaryStream: args.input.secondaryStream,
          tertiaryStream: args.input.tertiaryStream,
          fallbackStream: args.input.fallbackStream,
          externalId: args.input.externalId
        }
      });
    },
    deleteMatchup: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await deleteMatchup({ id: args.input.id });
    },
    addURLToMatchup: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return await addURLToMatchup({
        id: args.id,
        url: args.url
      });
    }
  }
};
