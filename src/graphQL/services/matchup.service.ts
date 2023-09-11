import { PrismaClient } from '@prisma/client';
import { extractSelection } from '../utils/extractSelections';
import { GraphQLResolveInfo } from 'graphql';

const prisma = new PrismaClient();

interface GetMatchupsArgs {
  info: GraphQLResolveInfo;
}

interface GetMatchupArgs extends GetMatchupsArgs {
  id: string;
}

interface MatchupInput {
  name: string;
  description?: string;
  dateTime: string | Date;
  homeTeam: string;
  awayTeam: string;
  logo_url?: string;
  league: string;
  sport: string;
  primaryStream?: string;
  secondaryStream?: string;
  tertiaryStream?: string;
  fallbackStream?: string;
  externalId: string;
}

export const getMatchups = async ({ info }: GetMatchupsArgs) => {
  const extractedSelections = extractSelection(info);
  const leagueInd = extractedSelections.includes('league');
  const sportInd = extractedSelections.includes('sport');

  return await prisma.matchup.findMany({ include: { League: leagueInd, Sport: sportInd } });
};

export const getMatchup = async ({ id, info }: GetMatchupArgs) => {
  const extractedSelections = extractSelection(info);
  const leagueInd = extractedSelections.includes('league');
  const sportInd = extractedSelections.includes('sport');

  return await prisma.matchup.findUnique({ where: { id }, include: { League: leagueInd, Sport: sportInd } });
};

export const createMatchup = async ({
  name,
  description,
  dateTime,
  homeTeam,
  awayTeam,
  logo_url,
  sport,
  league,
  primaryStream,
  secondaryStream,
  tertiaryStream,
  fallbackStream,
  externalId
}: MatchupInput) => {
  return await prisma.matchup.create({
    data: {
      name,
      description,
      dateTime,
      homeTeam,
      awayTeam,
      logo_url,
      sport,
      league,
      primaryStream,
      secondaryStream,
      tertiaryStream,
      fallbackStream,
      externalId
    }
  });
};

export const updateMatchup = async ({ id, data }: { id: string; data: MatchupInput }) => {
  return await prisma.matchup.update({ where: { id }, data });
};

export const deleteTeam = async ({ id }: { id: string }) => {
  return await prisma.matchup.delete({ where: { id } });
};
