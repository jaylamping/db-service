import { PrismaClient } from '@prisma/client';
import { extractSelection } from '../utils/extractSelections';
import { GraphQLResolveInfo } from 'graphql';

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

const prisma = new PrismaClient();

export const getSports = async ({ info }: GetSportsArgs) => {
  const extractedSelections = extractSelection(info);
  const leagueInd = extractedSelections.includes('leagues');

  //   if (leagueInd) {
  //     return await prisma.sport.findMany({ include: { League: true } });
  //   }

  return await prisma.sport.findMany({ include: { league: leagueInd } });
};

export const getSport = async ({ id, info }: GetSportArgs) => {
  const extractedSelections = extractSelection(info);
  const leagueInd = extractedSelections.includes('leagues');

  //   if (leagueInd) {
  //     return await prisma.sport.findUnique({ where: { id }, include: { League: true } });
  //   }

  return await prisma.sport.findUnique({ where: { id }, include: { league: leagueInd } });
};

export const createSport = async ({ name, logo_url }: SportInput) => {
  const createdSport = await prisma.sport.create({
    data: {
      name,
      logo_url
    }
  });

  return createdSport;
};

export const updateSport = async ({ id, data }: { id: string; data: SportInput }) => {
  const updatedSport = await prisma.sport.update({ where: { id }, data });

  return updatedSport;
};

export const deleteSport = async ({ id }: { id: string }) => {
  const deletedSport = await prisma.sport.delete({ where: { id } });

  return deletedSport;
};
