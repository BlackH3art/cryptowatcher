import { Prisma } from "../../../prisma/generated/prisma";
import { prisma } from "../../../prisma/prisma";

export const createUser = async (data: Prisma.UserCreateInput) => {
  return prisma.user.create({ data });
};

export const getUserByUsername = async (data: Pick<Prisma.UserCreateInput, 'username'>) => {
  return prisma.user.findFirst({
    where: {
      username: data.username,
    }
  })
};