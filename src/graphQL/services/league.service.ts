import { PrismaClient } from '@prisma/client';
import { extractSelection } from '../utils/extractSelections';
import { GraphQLResolveInfo } from 'graphql';

const prisma = new PrismaClient();

interface GetLeaguesArgs {
  info: GraphQLResolveInfo;
}

interface GetLeagueArgs extends GetLeaguesArgs {
  id: string;
}

interface LeagueInput {
  name: string;
  logo_url?: string;
  sportId: string;
}

export const getLeagues = async ({ info }: GetLeaguesArgs) => {
  const extractedSelections = extractSelection(info);
  const teamInd = extractedSelections.includes('team');
  const matchupInd = extractedSelections.includes('matchup');

  return await prisma.league.findMany({ include: { team: teamInd, matchup: matchupInd } });
};

export const getLeague = async ({ id, info }: GetLeagueArgs) => {
  const extractedSelections = extractSelection(info);
  const teamInd = extractedSelections.includes('team');
  const matchupInd = extractedSelections.includes('matchup');

  return await prisma.league.findUnique({ where: { id }, include: { team: teamInd, matchup: matchupInd } });
};

export const createLeague = async ({ name, logo_url, sportId }: LeagueInput) => {
  console.log('hi');
  const newLeague = await prisma.league.create({
    data: {
      name,
      logo_url,
      sportId
    }
  });
  console.log(newLeague);
};

export const updateLeague = async ({ id, data }: { id: string; data: LeagueInput }) => {
  return await prisma.league.update({ where: { id }, data });
};

export const deleteLeague = async ({ id }: { id: string }) => {
  return await prisma.league.delete({ where: { id } });
};
