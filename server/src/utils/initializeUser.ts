import { prisma } from "../../prisma/prisma";
import { createUser } from "../modules/user/user.service";

export const initializeUser = async () => {
  try {
    const existingUser = await prisma.user.findFirst();

    if (!existingUser) {
      await createUser({ username: 'admin', password: 'admin' });

    }
  } catch (error) {
    console.log('Error while initializing user: ', error);
    throw new Error('Failed to initialize user');
  }
}