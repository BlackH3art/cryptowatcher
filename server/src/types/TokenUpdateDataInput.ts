import { Prisma } from '../../prisma/generated/prisma';

export interface TokenUpdateDataInput {
  id: string;
  data: Prisma.TokenUpdateInput;
};
