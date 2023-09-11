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
  leagueId: string;
  sportId: string;
}

export const getTeams = async ({ info }: GetTeamsArgs) => {
  const extractedSelections = extractSelection(info);
  const leagueInd = extractedSelections.includes('league');
  const sportInd = extractedSelections.includes('sport');

  return await prisma.team.findMany({ include: { league: leagueInd, sport: sportInd } });
};

export const getTeam = async ({ id, info }: GetTeamArgs) => {
  const extractedSelections = extractSelection(info);
  const leagueInd = extractedSelections.includes('league');
  const sportInd = extractedSelections.includes('sport');

  return await prisma.team.findUnique({ where: { id }, include: { league: leagueInd, sport: sportInd } });
};

export const createTeam = async ({ name, location, logo_url, sportId, leagueId }: TeamInput) => {
  return await prisma.team.create({
    data: {
      name,
      location,
      logo_url,
      sportId,
      leagueId
    }
  });
};

export const updateTeam = async ({ id, data }: { id: string; data: TeamInput }) => {
  return await prisma.team.update({ where: { id }, data });
};

export const deleteTeam = async ({ id }: { id: string }) => {
  return await prisma.team.delete({ where: { id } });
};
