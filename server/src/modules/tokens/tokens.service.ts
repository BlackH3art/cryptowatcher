import { Prisma, Token } from "../../../prisma/generated/prisma";
import { prisma } from "../../../prisma/prisma";
import { TokenUpdateDataInput } from "../../types/TokenUpdateDataInput";
import { TokenUpdatePriceInput } from "../../types/TokenUpdatePriceInput";


export const getTokens = async () => {
  return prisma.token.findMany();
};

export const createManyTokens = async (data: Prisma.TokenCreateInput[]) => {
  return prisma.token.createMany({ data });
};

export const updateTokenPrice = async ({ id, price, priceUpdatedAt }: TokenUpdatePriceInput) => {
  return prisma.token.update({
    where: { id },
    data: { price, priceUpdatedAt },
  });
};

export const updateTokenFavourite = async (id: string) => {
  return prisma.$queryRaw<Token[]>`
    UPDATE "Token"
    SET "favourite" = NOT "favourite"
    WHERE id = ${id}
    RETURNING *
  `;
};

export const updateTokenData = async ({ id, data }: TokenUpdateDataInput) => {
  return prisma.token.update({
    where: { id }, 
    data: { ...data },
  });
};
