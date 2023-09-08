import { PrismaClient } from '@prisma/client';
import { extractSelection } from '../utils/extractSelections';
import { GraphQLResolveInfo } from 'graphql';

const prisma = new PrismaClient();

interface GetSportsArgs {
  info: GraphQLResolveInfo;
}

interface GetSportArgs extends GetSportsArgs {
  id: string;
}

interface SportInput {
  name: string;
  logo_url: string;
}

export const getSports = async ({ info }: GetSportsArgs) => {
  const extractedSelections = extractSelection(info);
  const leagueInd = extractedSelections.includes('league');
  const matchupInd = extractedSelections.includes('matchup');

  return await prisma.sport.findMany({ include: { league: leagueInd, matchup: matchupInd } });
};

export const getSport = async ({ id, info }: GetSportArgs) => {
  const extractedSelections = extractSelection(info);
  const leagueInd = extractedSelections.includes('league');
  const matchupInd = extractedSelections.includes('matchup');

  return await prisma.sport.findUnique({ where: { id }, include: { league: leagueInd, matchup: matchupInd } });
};

export const createSport = async ({ name, logo_url }: SportInput) => {
  return await prisma.sport.create({
    data: {
      name,
      logo_url
    }
  });
};

export const updateSport = async ({ id, data }: { id: string; data: SportInput }) => {
  return await prisma.sport.update({ where: { id }, data });
};

export const deleteSport = async ({ id }: { id: string }) => {
  return await prisma.sport.delete({ where: { id } });
};
