import { GraphQLResolveInfo } from 'graphql';

export const sportResolver = {
  Query: {
    sports: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return context.prisma.sport.findMany();
    }
  },
  Mutation: {
    createSport: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return context.prisma.sport.create({ data: args.data });
    },
    updateSport: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return context.prisma.sport.update({ where: { id: args.id }, data: args.data });
    },
    deleteSport: async (parent: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) => {
      return context.prisma.sport.delete({ where: { id: args.id } });
    }
  }
};
