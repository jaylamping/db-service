import { PrismaClient } from '@prisma/client';
import { extractSelection } from '../utils/extractSelections';
import { GraphQLResolveInfo } from 'graphql';

const prisma = new PrismaClient();

interface GetTeamsArgs {
  info: GraphQLResolveInfo;
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

export const createTeam = async ({ name, location, logo_url, sport, league }: TeamInput) => {
  return await prisma.team.create({
    data: {
      name,
      location,
      logo_url,
      sport,
      league
    }
  });
};

export const updateTeam = async ({ id, data }: { id: string; data: TeamInput }) => {
  return await prisma.team.update({ where: { id }, data });
};

export const deleteTeam = async ({ id }: { id: string }) => {
  return await prisma.team.delete({ where: { id } });
};
