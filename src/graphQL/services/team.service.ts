import { PrismaClient } from '@prisma/client';
import { extractSelection } from '../utils/extractSelections';
import { GraphQLResolveInfo } from 'graphql';

const prisma = new PrismaClient();

interface GetTeamsArgs {
  info: GraphQLResolveInfo;
  league?: string;
}

interface GetTeamArgs extends GetTeamsArgs {
  id: string;
}

interface TeamInput {
  name: string;
  location: string;
  logo_url: string;
  league: string;
  sport: string;
  externalId: string;
}

export const getTeams = async ({ info }: GetTeamsArgs) => {
  const extractedSelections = extractSelection(info);
  const leagueInd = extractedSelections.includes('league');
  const sportInd = extractedSelections.includes('sport');

  return await prisma.team.findMany({ include: { League: leagueInd, Sport: sportInd } });
};

export const getTeam = async ({ id, info }: GetTeamArgs) => {
  const extractedSelections = extractSelection(info);
  const leagueInd = extractedSelections.includes('league');
  const sportInd = extractedSelections.includes('sport');

  return await prisma.team.findUnique({ where: { id }, include: { League: leagueInd, Sport: sportInd } });
};

export const getTeamsByLeague = async ({ league, info }: GetTeamsArgs) => {
  const extractedSelections = extractSelection(info);
  const leagueInd = extractedSelections.includes('league');
  const sportInd = extractedSelections.includes('sport');

  return await prisma.team.findMany({ where: { league }, include: { League: leagueInd, Sport: sportInd } });
};

export const createTeam = async ({ name, location, logo_url, sport, league, externalId }: TeamInput) => {
  return await prisma.team.create({
    data: {
      name,
      location,
      logo_url,
      sport,
      league,
      externalId
    }
  });
};

export const updateTeam = async ({ id, data }: { id: string; data: TeamInput }) => {
  return await prisma.team.update({ where: { id }, data });
};

export const deleteTeam = async ({ id }: { id: string }) => {
  return await prisma.team.delete({ where: { id } });
};
