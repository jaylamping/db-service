import { readFileSync } from 'fs';
import path from 'path';
import { sportResolver } from './resolvers/sport.resolver';
import { leagueResolver } from './resolvers/league.resolver';

const sportTypes = readFileSync(path.join(__dirname, './typeDefs/sport.graphql'), {
  encoding: 'utf-8'
});

const leagueTypes = readFileSync(path.join(__dirname, './typeDefs/league.graphql'), {
  encoding: 'utf-8'
});

const teamTypes = readFileSync(path.join(__dirname, './typeDefs/team.graphql'), {
  encoding: 'utf-8'
});

const matchupTypes = readFileSync(path.join(__dirname, './typeDefs/matchup.graphql'), {
  encoding: 'utf-8'
});

export const typeDefs = `
    ${sportTypes}
    ${leagueTypes}
    ${teamTypes}
    ${matchupTypes}
`;

export const resolvers = {
  Query: {
    ...sportResolver.Query,
    ...leagueResolver.Query
  },
  Mutation: {
    ...sportResolver.Mutation,
    ...leagueResolver.Mutation
  }
};
