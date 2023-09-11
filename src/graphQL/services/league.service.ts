import { PrismaClient } from '@prisma/client';
import { extractSelection } from '../utils/extractSelections';
import { GraphQLResolveInfo } from 'graphql';

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

interface GetLeaguesArgs {
  info: GraphQLResolveInfo;
}

interface GetLeagueArgs extends GetLeaguesArgs {
  id: string;
}

interface LeagueInput {
  name: string;
  logo_url?: string;
  sport: string;
}

export const getLeagues = async ({ info }: GetLeaguesArgs) => {
  const extractedSelections = extractSelection(info);
  const teamInd = extractedSelections.includes('team');
  const matchupInd = extractedSelections.includes('matchup');

  return await prisma.league.findMany({ include: { Team: teamInd, Matchup: matchupInd } });
};

export const getLeague = async ({ id, info }: GetLeagueArgs) => {
  const extractedSelections = extractSelection(info);
  const teamInd = extractedSelections.includes('team');
  const matchupInd = extractedSelections.includes('matchup');

  return await prisma.league.findUnique({ where: { id }, include: { Team: teamInd, Matchup: matchupInd } });
};

export const createLeague = async ({ name, logo_url, sport }: LeagueInput) => {
  return await prisma.league.create({
    data: {
      name,
      logo_url,
      sport
    }
  });
};

export const updateLeague = async ({ id, data }: { id: string; data: LeagueInput }) => {
  return await prisma.league.update({ where: { id }, data });
};

export const deleteLeague = async ({ id }: { id: string }) => {
  return await prisma.league.delete({ where: { id } });
};
