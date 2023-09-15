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
  homeTeamId: string;
  homeTeam: string;
  awayTeamId: string;
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

export const getUpcomingMatchups = async ({ info }: GetMatchupsArgs) => {
  const extractedSelections = extractSelection(info);
  const leagueInd = extractedSelections.includes('league');
  const sportInd = extractedSelections.includes('sport');

  const currentDate = new Date();
  // get all in progress matchups too - will definitely need to change this later
  currentDate.setHours(currentDate.getHours() - 3);

  return await prisma.matchup.findMany({
    where: {
      dateTime: {
        gt: currentDate
      }
    },
    include: { League: leagueInd, Sport: sportInd }
  });
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
  homeTeamId,
  homeTeam,
  awayTeamId,
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
      homeTeamId,
      homeTeam,
      awayTeamId,
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

export const deleteMatchup = async ({ id }: { id: string }) => {
  return await prisma.matchup.delete({ where: { id } });
};

export const addURLToMatchup = async ({ id, url }: { id: string; url: string }) => {
  const matchup = await prisma.matchup.findUnique({ where: { id } });

  if (matchup?.primaryStream === null && matchup?.primaryStream !== url) {
    return await prisma.matchup.update({ where: { id }, data: { primaryStream: url } });
  } else if (matchup?.secondaryStream === null && matchup?.secondaryStream !== url) {
    return await prisma.matchup.update({ where: { id }, data: { secondaryStream: url } });
  } else if (matchup?.tertiaryStream === null && matchup?.tertiaryStream !== url) {
    return await prisma.matchup.update({ where: { id }, data: { tertiaryStream: url } });
  } else if (matchup?.fallbackStream === null && matchup?.fallbackStream !== url) {
    return await prisma.matchup.update({ where: { id }, data: { fallbackStream: url } });
  }
};
